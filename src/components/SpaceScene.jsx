import { useEffect, useMemo, useRef, useState } from "react";
import { useSpaceCamera } from "../hooks/useSpaceCamera";
import { buildStarsFromPeople } from "../utils/stars";
function drawStar(ctx, cx, cy, spikes, outerR, innerR) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerR);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerR;
    y = cy + Math.sin(rot) * outerR;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerR;
    y = cy + Math.sin(rot) * innerR;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.closePath();
}
export default function SpaceScene({
  started,
  onFocusMeRef,
  onZoomChange,
  onPanChange,
  people,
  myName,
}) {
  const canvasRef = useRef(null);

  // appear animation after started
  const startedAtRef = useRef(0);
  const [appearE, setAppearE] = useState(0);
  const appearERef = useRef(0);

  useEffect(() => {
    if (started) {
      startedAtRef.current = performance.now();
      appearERef.current = 0;
      setAppearE(0);
    } else {
      appearERef.current = 0;
      setAppearE(0);
    }
  }, [started]);

  // camera
  const { camRef, flyTo, applyFly } = useSpaceCamera(canvasRef);

  // stars: only people
  const stars = useMemo(() => {
    return buildStarsFromPeople(people || [], myName || "");
  }, [people, myName]);

  // Focus Me
  useEffect(() => {
    if (!onFocusMeRef) return;

    onFocusMeRef.current = () => {
      const n = (myName || "").toLowerCase().trim();
      const me =
        stars.find((s) => s.kind === "person" && s.isMe) ||
        stars.find(
          (s) =>
            s.kind === "person" && (s.name || "").toLowerCase().trim() === n,
        );

      if (!me) return;
      const cam = camRef.current;

      const offsetPx = 40;
      const offsetWorld =
        offsetPx / Math.max(0.0001, cam.targetZoom || cam.zoom || 1);

      flyTo({ x: me.x, y: me.y + offsetWorld, zoom: 2.1 }, { dur: 950 });
    };

    return () => {
      onFocusMeRef.current = null;
    };
  }, [onFocusMeRef, stars, flyTo, myName]);

  // draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let raf = 0;

    const worldToScreen = (cam, x, y) => ({
      x: (x + cam.offsetX) * cam.zoom + cam.W / 2,
      y: (y + cam.offsetY) * cam.zoom + cam.H / 2,
    });

    const easeOut = (x) => 1 - Math.pow(1 - x, 3);

    const draw = (t) => {
      applyFly?.(t);

      // appear
      const appearT = started ? (t - startedAtRef.current) / 900 : 0;
      const appearK = Math.max(0, Math.min(1, appearT));
      const appear = easeOut(appearK);

      // throttle sync for labels
      appearERef.current = appear;
      if (t - (draw._lastAppearUpdate || 0) > 50) {
        draw._lastAppearUpdate = t;
        setAppearE(appearERef.current);
      }

      const cam = camRef.current;

      // smooth camera
      cam.zoom += (cam.targetZoom - cam.zoom) * 0.08;
      cam.offsetX += (cam.targetOffsetX - cam.offsetX) * 0.12;
      cam.offsetY += (cam.targetOffsetY - cam.offsetY) * 0.12;

      onZoomChange?.(cam.zoom);
      onPanChange?.({ x: cam.offsetX, y: cam.offsetY });

      ctx.clearRect(0, 0, cam.W, cam.H);

      // draw people stars
      for (const s of stars) {
        const p = worldToScreen(cam, s.x, s.y);
        if (p.x < -80 || p.x > cam.W + 80 || p.y < -80 || p.y > cam.H + 80)
          continue;

        const tw = 0.5 + 0.5 * Math.sin((t / 1000) * 1.6 + s.tw);
        let a2 = s.a * (0.75 + tw * 0.25);

        // fade-in per name (slight stagger)
        const seed = (s.name || "").length * 97;
        const delay = (seed % 450) / 1000;
        const appearT2 = started
          ? (t - startedAtRef.current) / 1000 - delay
          : 0;
        const k2 = Math.max(0, Math.min(1, appearT2 / 0.9));
        a2 *= easeOut(k2);

        ctx.globalAlpha = a2;

        const r = s.radius * cam.zoom * 1.15 * (0.75 + 0.25 * appear);

        ctx.shadowBlur = 10 * cam.zoom;
        ctx.shadowColor = s.isMe
          ? "rgba(255, 230, 140, 0.85)"
          : "rgba(255, 215, 90, 0.55)";
        if (s.kind === "person") {
          // ⭐ ngôi sao 5 cánh
          const outer = r; // bán kính ngoài
          const inner = r * 0.48; // bán kính trong
          drawStar(ctx, p.x, p.y, 5, outer, inner);
          ctx.fill();
        } else {
          // dust / loại khác vẫn là chấm
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = s.isMe
            ? "rgba(255, 230, 140, 0.98)"
            : "rgba(255, 215, 90, 0.82)";
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(raf);
  }, [stars, applyFly, onZoomChange, onPanChange, camRef, started]);

  const toPx = (x, y) => {
    const cam = camRef.current;
    return {
      left: (x + cam.offsetX) * cam.zoom + cam.W / 2,
      top: (y + cam.offsetY) * cam.zoom + cam.H / 2,
    };
  };

  const peopleLabels = useMemo(
    () => stars.filter((s) => s.kind === "person"),
    [stars],
  );
  const labelStyle = (s) => {
    const cam = camRef.current;
    const pos = toPx(s.x, s.y);

    // đẩy label lên trên theo zoom cho tự nhiên
    const lift = 18 * cam.zoom;

    return {
      ...pos,
      opacity: started ? appearE : 0,
      transform: `translate(-50%, calc(-50% - ${lift}px)) scale(${0.92 + 0.08 * appearE})`,
    };
  };
  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 h-full w-full touch-none select-none"
      />

      <div className="fixed inset-0 pointer-events-none">
        {peopleLabels.map((s) => (
          <div
            key={"p-" + s.name}
            className={[
              "absolute -translate-x-1/2 -translate-y-1/2 text-xs font-semibold whitespace-nowrap",
              s.isMe ? "text-cyan-100" : "text-white/70",
            ].join(" ")}
            style={labelStyle(s)}
          >
            {s.name}
          </div>
        ))}
      </div>
    </>
  );
}
