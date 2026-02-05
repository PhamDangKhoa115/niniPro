import { useEffect, useRef, useCallback } from "react";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export function useSpaceCamera(canvasRef) {
  const camRef = useRef({
    W: 0,
    H: 0,
    DPR: 1,

    zoom: 1,
    targetZoom: 1,

    // offset (world units)
    offsetX: 0,
    offsetY: 0,
    targetOffsetX: 0,
    targetOffsetY: 0,

    dragging: false,
    lastX: 0,
    lastY: 0,
  });

  // fly animation state
  const flyRef = useRef({
    active: false,
    from: { offsetX: 0, offsetY: 0, zoom: 1 },
    to: { offsetX: 0, offsetY: 0, zoom: 1 },
    start: 0,
    dur: 900,
  });

  /**
   * ✅ flyTo(worldX, worldY)
   * Giả định transform phổ biến của bạn là:
   *   screen = (world + offset) * zoom + center
   * => để "bay tới" (center vào world point) thì set targetOffset = -world
   */
  // fly tới world point => center
  const flyTo = useCallback((to, opts = {}) => {
    const cam = camRef.current;

    const worldX = to.x ?? 0;
    const worldY = to.y ?? 0;

    flyRef.current.active = true;
    flyRef.current.from = {
      offsetX: cam.targetOffsetX, // dùng target để bay mượt khi đang lerp
      offsetY: cam.targetOffsetY,
      zoom: cam.targetZoom,
    };
    flyRef.current.to = {
      offsetX: -worldX,
      offsetY: -worldY,
      zoom: to.zoom ?? cam.targetZoom,
    };
    flyRef.current.dur = opts.dur ?? 900;
    flyRef.current.start = performance.now();
  }, []);

  const applyFly = useCallback((now) => {
    const cam = camRef.current;
    const fly = flyRef.current;
    if (!fly.active) return;

    const t0 = (now - fly.start) / fly.dur;
    const t = clamp(t0, 0, 1);
    const e = easeOutCubic(t);

    cam.targetOffsetX = lerp(fly.from.offsetX, fly.to.offsetX, e);
    cam.targetOffsetY = lerp(fly.from.offsetY, fly.to.offsetY, e);
    cam.targetZoom = lerp(fly.from.zoom, fly.to.zoom, e);

    if (t >= 1) fly.active = false;
  }, []);

  /**
   * ✅ step(now)
   * Gọi trong render loop (requestAnimationFrame) trước khi bạn vẽ.
   * - lerp zoom/offset bình thường
   * - nếu fly active thì override target theo easing cinematic
   */
  const step = useCallback((now = performance.now()) => {
    const cam = camRef.current;

    // apply fly (updates target*)
    const fly = flyRef.current;
    if (fly.active) {
      const t0 = (now - fly.start) / fly.dur;
      const t = clamp(t0, 0, 1);
      const e = easeOutCubic(t);

      cam.targetOffsetX = lerp(fly.from.offsetX, fly.to.offsetX, e);
      cam.targetOffsetY = lerp(fly.from.offsetY, fly.to.offsetY, e);
      cam.targetZoom = lerp(fly.from.zoom, fly.to.zoom, e);

      if (t >= 1) fly.active = false;
    }

    // smooth follow targets (cinematic feel)
    const k = 0.12; // smoothing strength (tăng lên = nhanh hơn)
    cam.zoom = lerp(cam.zoom, cam.targetZoom, k);
    cam.offsetX = lerp(cam.offsetX, cam.targetOffsetX, k);
    cam.offsetY = lerp(cam.offsetY, cam.targetOffsetY, k);
  }, []);

  // resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const cam = camRef.current;
      cam.DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      cam.W = window.innerWidth;
      cam.H = window.innerHeight;

      canvas.style.width = cam.W + "px";
      canvas.style.height = cam.H + "px";
      canvas.width = Math.floor(cam.W * cam.DPR);
      canvas.height = Math.floor(cam.H * cam.DPR);

      ctx.setTransform(cam.DPR, 0, 0, cam.DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [canvasRef]);

  // interactions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onPointerDown = (e) => {
      const cam = camRef.current;

      // nếu đang fly thì cho phép "grab" hủy cinematic feel
      flyRef.current.active = false;

      cam.dragging = true;
      cam.lastX = e.clientX;
      cam.lastY = e.clientY;
      canvas.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      const cam = camRef.current;
      if (!cam.dragging) return;
      const dx = e.clientX - cam.lastX;
      const dy = e.clientY - cam.lastY;
      cam.lastX = e.clientX;
      cam.lastY = e.clientY;

      cam.targetOffsetX += dx / cam.zoom;
      cam.targetOffsetY += dy / cam.zoom;
    };

    const onPointerUp = () => {
      camRef.current.dragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      const cam = camRef.current;

      flyRef.current.active = false;

      const delta = -Math.sign(e.deltaY) * 0.12;
      cam.targetZoom = Math.max(
        0.42,
        Math.min(2.6, cam.targetZoom * (1 + delta)),
      );
    };

    const onDblClick = () => {
      const cam = camRef.current;
      flyRef.current.active = false;

      cam.targetZoom = 1;
      cam.targetOffsetX = 0;
      cam.targetOffsetY = 0;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("dblclick", onDblClick);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("dblclick", onDblClick);
    };
  }, [canvasRef]);

  // ✅ CHỈ THAY đổi return: thêm step + flyTo
  return { camRef, flyTo, applyFly };
}
