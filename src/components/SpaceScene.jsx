import { useEffect, useMemo, useRef, useState } from "react";
import { useSpaceCamera } from "../hooks/useSpaceCamera";
import { buildSpace } from "../utils/spaceModel";
import { buildStarsFromPeople } from "../utils/stars";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function computeFitZoom(cam, points, pad = 260) {
  if (!cam?.W || !cam?.H) return 1;
  if (!points || points.length === 0) return 1;
  if (points.length === 1) return 2.05;

  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;

  for (const p of points) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }

  const w = Math.max(1, maxX - minX + pad);
  const h = Math.max(1, maxY - minY + pad);
  const z = Math.min(cam.W / w, cam.H / h) * 0.92;

  return clamp(z, 0.42, 2.6);
}

export default function SpaceScene({
  constellations,
  activePhase = 1,
  started,
  onFocusMeRef,
  onZoomChange,
  onPanChange,
  onSelectConstellation,
  people,
  myName,
  phaseTransitioning,
  selectedId,
}) {
  const canvasRef = useRef(null);
  const prevPhaseRef = useRef(activePhase);
  const phaseStartRef = useRef(performance.now());

  useEffect(() => {
    phaseStartRef.current = performance.now();
  }, [activePhase]);

  const rippleRef = useRef({
    active: false,
    id: null,
    x: 0,
    y: 0,
    start: 0,
    dur: 1100,
  });

  const [hoveredId, setHoveredId] = useState(null);
  const hoveredRef = useRef(null);

  // ✅ appear animation after started (for people stars + labels)
  const startedAtRef = useRef(0);
  const [appearE, setAppearE] = useState(0);
  const appearERef = useRef(0);

  useEffect(() => {
    hoveredRef.current = hoveredId;
  }, [hoveredId]);
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

  // ✅ camera
  const { camRef, flyTo, applyFly } = useSpaceCamera(canvasRef);

  // ✅ constellation lookup for tooltip
  const constById = useMemo(() => {
    const m = new Map();
    (constellations || []).forEach((c) => m.set(c.id, c));
    return m;
  }, [constellations]);

  // ⭐ Build stars + links
  const { stars, links } = useMemo(() => {
    const space = buildSpace(constellations || [], activePhase);
    const peopleStars = buildStarsFromPeople(people || [], myName || "");
    return { stars: [...peopleStars, ...space.stars], links: space.links };
  }, [constellations, activePhase, people, myName]);

  // ✅ Focus Me button
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
      flyTo({ x: me.x, y: me.y, zoom: 2.1 }, { dur: 950 });
    };

    return () => {
      onFocusMeRef.current = null;
    };
  }, [onFocusMeRef, stars, flyTo, myName]);

  // ripple when phase advances
  useEffect(() => {
    const prev = prevPhaseRef.current;
    if (activePhase === prev) return;

    if (activePhase > prev) {
      const newly =
        (constellations || []).find((c) => c.phase === activePhase) || null;

      if (newly?.coords) {
        rippleRef.current = {
          active: true,
          id: newly.id,
          x: newly.coords.x,
          y: newly.coords.y,
          start: performance.now(),
          dur: 1100,
        };
      }
    }

    prevPhaseRef.current = activePhase;
  }, [activePhase, constellations]);

  // ✅ Phase cinematic: center = constellation mới unlock, zoom = fit toàn bộ đã unlock
  useEffect(() => {
    if (!started) return;

    const cam = camRef.current;
    if (!cam?.W || !cam?.H) return;

    const visible = (constellations || []).filter(
      (c) => c.phase <= activePhase,
    );
    if (visible.length === 0) return;

    const focus =
      visible.find((c) => c.phase === activePhase) ||
      visible[visible.length - 1];

    const pts = visible.map((c) => c.coords).filter(Boolean);
    const z = computeFitZoom(cam, pts, 320);

    flyTo({ x: focus.coords.x, y: focus.coords.y, zoom: z }, { dur: 1250 });
  }, [activePhase, started, constellations, flyTo, camRef]);

  // ⭐ DRAW LOOP + POINTER
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let raf = 0;
    let down = null;

    const worldToScreen = (cam, x, y) => ({
      x: (x + cam.offsetX) * cam.zoom + cam.W / 2,
      y: (y + cam.offsetY) * cam.zoom + cam.H / 2,
    });

    const screenToWorld = (cam, sx, sy) => ({
      x: (sx - cam.W / 2) / cam.zoom - cam.offsetX,
      y: (sy - cam.H / 2) / cam.zoom - cam.offsetY,
    });

    const easeOut = (x) => 1 - Math.pow(1 - x, 3);

    const draw = (t) => {
      applyFly?.(t);

      // ✅ appear for people after started
      const appearT = started ? (t - startedAtRef.current) / 900 : 0; // 900ms
      const appearK = Math.max(0, Math.min(1, appearT));
      const appear = easeOut(appearK);

      // pop nhẹ (0.75 -> 1.0)
      const popScale = 0.75 + 0.25 * appear;

      // sync for JSX label layer (throttle)
      appearERef.current = appear;
      if (t - (draw._lastAppearUpdate || 0) > 50) {
        draw._lastAppearUpdate = t;
        setAppearE(appearERef.current);
      }

      const cam = camRef.current;
      const ripple = rippleRef.current;
      let rippleK = 0; // 0..1
      let rippleId = null;

      if (ripple.active) {
        rippleK = (t - ripple.start) / ripple.dur;
        if (rippleK >= 1) {
          ripple.active = false;
          rippleK = 0;
        } else {
          rippleId = ripple.id;
          rippleK = Math.max(0, Math.min(1, rippleK));
        }
      }

      const focusId = selectedId || hoveredRef.current;

      // mood by phase
      const mood =
        activePhase === 1
          ? { lineAlpha: 0.1, lineWidth: 0.9, starBoost: 1.0, glow: 0 }
          : activePhase === 2
            ? { lineAlpha: 0.22, lineWidth: 1.1, starBoost: 1.05, glow: 6 }
            : { lineAlpha: 0.3, lineWidth: 1.25, starBoost: 1.1, glow: 14 };

      // reveal factor for unlock moment
      const reveal = (obj) => {
        const p = obj.appearPhase || 1;
        if (activePhase < p) return 0;
        if (activePhase > p) return 1;

        const tt = Math.min(1, (t - phaseStartRef.current) / 900);
        return 0.25 + 0.75 * easeOut(tt);
      };

      // smooth camera
      cam.zoom += (cam.targetZoom - cam.zoom) * 0.08;
      cam.offsetX += (cam.targetOffsetX - cam.offsetX) * 0.12;
      cam.offsetY += (cam.targetOffsetY - cam.offsetY) * 0.12;

      onZoomChange?.(cam.zoom);
      onPanChange?.({ x: cam.offsetX, y: cam.offsetY });

      ctx.clearRect(0, 0, cam.W, cam.H);

      // ---------- LINES ----------
      const idMap = new Map();
      stars.forEach((s) => s.id && idMap.set(s.id, s));

      ctx.strokeStyle = "rgba(180,220,255,0.9)";
      ctx.lineWidth = mood.lineWidth * cam.zoom;

      for (const L of links) {
        const a = idMap.get(L.a);
        const b = idMap.get(L.b);
        if (!a || !b) continue;

        const isFocusLine = !focusId || L.constellationId === focusId;
        ctx.globalAlpha =
          (isFocusLine ? mood.lineAlpha : mood.lineAlpha * 0.25) * reveal(L);

        const pa = worldToScreen(cam, a.x, a.y);
        const pb = worldToScreen(cam, b.x, b.y);

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      // ---------- STARS ----------
      for (const s of stars) {
        const p = worldToScreen(cam, s.x, s.y);
        if (p.x < -80 || p.x > cam.W + 80 || p.y < -80 || p.y > cam.H + 80)
          continue;

        const tw = 0.5 + 0.5 * Math.sin((t / 1000) * 1.6 + s.tw);
        const baseAlpha = s.a * (0.75 + tw * 0.25);

        const isFocusStar =
          s.kind === "star" && focusId && s.constellationId === focusId;
        const dimOthers =
          focusId && s.kind === "star" && s.constellationId !== focusId;

        let a2 = baseAlpha * reveal(s);
        if (dimOthers) a2 *= 0.35;
        if (isFocusStar) a2 = Math.min(1, a2 * 1.35);

        // ✅ fade-in people after start
        if (s.kind === "person") {
          // delay 0..450ms theo hash tên
          const seed = (s.name || "").length * 97;
          const delay = (seed % 450) / 1000; // giây
          const appearT2 = started
            ? (t - startedAtRef.current) / 1000 - delay
            : 0;
          const k2 = Math.max(0, Math.min(1, appearT2 / 0.9));
          const appear2 = easeOut(k2);

          a2 *= appear2;
        }
        ctx.globalAlpha = a2;

        const r =
          s.radius *
          cam.zoom *
          (s.kind === "dust" ? 0.6 : s.kind === "person" ? 1.15 : 0.9) *
          mood.starBoost *
          (s.kind === "person" ? popScale : 1);

        const isRippleStar =
          s.kind === "star" && rippleId && s.constellationId === rippleId;

        if (s.kind === "star" && mood.glow > 0) {
          const base = isFocusStar ? mood.glow * 1.8 : mood.glow;
          const extra = isRippleStar ? 18 * (1 - rippleK) : 0;

          ctx.shadowBlur = (base + extra) * cam.zoom;
          ctx.shadowColor = "rgba(180,220,255,0.85)";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);

        ctx.fillStyle =
          s.kind === "dust"
            ? "rgba(255,255,255,0.45)"
            : s.kind === "person"
              ? s.isMe
                ? "rgba(180,240,255,0.98)"
                : "rgba(255,255,255,0.82)"
              : "rgba(255,255,255,0.95)";

        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // ---------- RIPPLE RING ----------
      if (rippleId && rippleK > 0) {
        const k = easeOut(rippleK);
        const center = worldToScreen(cam, ripple.x, ripple.y);
        const radius = (90 + 520 * k) * cam.zoom * 0.55;

        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        ctx.globalAlpha = (1 - k) * 0.55;
        ctx.strokeStyle = "rgba(180,240,255,0.95)";
        ctx.lineWidth = (2.4 + 1.6 * (1 - k)) * cam.zoom * 0.35;

        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.globalAlpha = (1 - k) * 0.28;
        ctx.lineWidth = 1.2 * cam.zoom * 0.35;

        ctx.beginPath();
        ctx.arc(center.x, center.y, radius * 0.72, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    // ---------- POINTER ----------
    const onDown = (e) => {
      down = { x: e.clientX, y: e.clientY, t: performance.now() };
    };

    const onMove = (e) => {
      const cam = camRef.current;
      const w = screenToWorld(cam, e.clientX, e.clientY);

      let best = null;
      let bestD = Infinity;

      for (const s of stars) {
        if (s.kind !== "star") continue;
        if (s.labelKind !== "anchor") continue;

        const d = Math.hypot(s.x - w.x, s.y - w.y);
        if (d < bestD) {
          bestD = d;
          best = s;
        }
      }

      const threshold = 55 / cam.zoom;
      const next = best && bestD < threshold ? best.constellationId : null;
      setHoveredId((prev) => (prev === next ? prev : next));
    };

    const onUp = (e) => {
      if (!down) return;

      const dx = e.clientX - down.x;
      const dy = e.clientY - down.y;
      const dist = Math.hypot(dx, dy);
      const dt = performance.now() - down.t;
      down = null;

      if (dist > 6 || dt > 400) return;

      const cam = camRef.current;
      const w = screenToWorld(cam, e.clientX, e.clientY);

      let best = null;
      let bestD = Infinity;

      for (const s of stars) {
        if (s.kind !== "star") continue;
        if (s.labelKind !== "anchor") continue;

        const d = Math.hypot(s.x - w.x, s.y - w.y);
        if (d < bestD) {
          bestD = d;
          best = s;
        }
      }

      const threshold = 45 / cam.zoom;

      if (best && bestD < threshold) {
        flyTo?.({ x: best.x, y: best.y, zoom: 1.75 }, { dur: 950 });
        onSelectConstellation?.(best.constellationId);
      } else {
        onSelectConstellation?.(null);
      }
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
    };
  }, [
    stars,
    links,
    applyFly,
    flyTo,
    onZoomChange,
    onPanChange,
    onSelectConstellation,
    camRef,
    activePhase,
    selectedId,
    started,
  ]);

  // ⭐ LABEL LAYER
  const anchors = useMemo(
    () => stars.filter((s) => s.kind === "star" && s.labelKind === "anchor"),
    [stars],
  );

  const peopleLabels = useMemo(
    () => stars.filter((s) => s.kind === "person"),
    [stars],
  );

  const focusId = selectedId || hoveredId;

  const focusAnchor = useMemo(() => {
    if (!focusId) return null;
    return stars.find(
      (s) =>
        s.kind === "star" &&
        s.labelKind === "anchor" &&
        s.constellationId === focusId,
    );
  }, [stars, focusId]);

  const focusConstellation = focusId ? constById.get(focusId) : null;

  const tagStyle = (s) => {
    const cam = camRef.current;
    const x = (s.x + cam.offsetX) * cam.zoom + cam.W / 2;
    const y = (s.y + cam.offsetY) * cam.zoom + cam.H / 2;

    return {
      left: x + 12,
      top: y - 12,
      fontSize: 12 * cam.zoom,
      opacity: started ? (phaseTransitioning ? 0 : 1) : 0,
    };
  };

  const toPx = (x, y) => {
    const cam = camRef.current;
    return {
      left: (x + cam.offsetX) * cam.zoom + cam.W / 2,
      top: (y + cam.offsetY) * cam.zoom + cam.H / 2,
    };
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 h-full w-full touch-none select-none"
      />

      {/* LABELS + TOOLTIP */}
      <div className="fixed inset-0 pointer-events-none">
        {anchors.map((s) => (
          <div
            key={s.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-white/80 font-semibold"
            style={tagStyle(s)}
          >
            {s.label}
          </div>
        ))}

        {/* ✅ TOOLTIP (hover/selected) */}
        {focusAnchor && focusConstellation && !phaseTransitioning && (
          <div
            className="absolute rounded-2xl border border-white/12 bg-black/40 px-4 py-3 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
            style={{
              ...toPx(focusAnchor.x, focusAnchor.y),
              transform: "translate(18px, 18px)",
              maxWidth: 260,
              opacity: started ? 1 : 0,
            }}
          >
            <div className="text-xs tracking-[0.18em] text-white/60">
              {focusConstellation.city || "Địa điểm"}
            </div>
            <div className="mt-1 text-sm font-extrabold text-white/90">
              {focusConstellation.name}
            </div>
            <div className="mt-1 text-xs text-white/65 line-clamp-2">
              {focusConstellation.summary}
            </div>
          </div>
        )}

        {/* ✅ PERSON LABELS */}
        {peopleLabels.map((s) => (
          <div
            key={"p-" + s.name}
            className={[
              "absolute -translate-x-1/2 -translate-y-1/2 text-xs font-semibold",
              s.isMe ? "text-cyan-100" : "text-white/60",
            ].join(" ")}
            style={{
              ...toPx(s.x, s.y),
              opacity: started ? (phaseTransitioning ? 0 : appearE) : 0,
              transform: `translate(-50%, -50%) scale(${0.92 + 0.08 * appearE})`,
            }}
          >
            {s.name}
          </div>
        ))}
      </div>
    </>
  );
}
