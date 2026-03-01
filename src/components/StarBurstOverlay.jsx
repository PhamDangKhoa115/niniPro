import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function StarBurstOverlay({ onDone }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const starsRef = useRef([]);
  const startRef = useRef(0);
  const doneCalledRef = useRef(false);

  useEffect(() => {
    doneCalledRef.current = false;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // vẽ theo pixel CSS
    };

    resize();
    window.addEventListener("resize", resize);

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    // nhiều sao hơn để "phủ"
    const density = 1800; // nhỏ -> nhiều sao
    const N = Math.floor((W() * H()) / density);

    starsRef.current = Array.from({ length: N }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      r: 0.8 + Math.random() * 2.2,
      tw: Math.random() * Math.PI * 2,
      a: 0.35 + Math.random() * 0.75,
    }));

    startRef.current = performance.now();

    const easeOut = (x) => 1 - Math.pow(1 - x, 3);
    const DURATION = 1400; // nhanh để user thấy rõ (1.4s)

    const draw = (t) => {
      const k = Math.max(0, Math.min(1, (t - startRef.current) / DURATION));

      // fade in nhanh + fade out
      let alpha;
      if (k < 0.25) alpha = easeOut(k / 0.25);
      else if (k < 0.75) alpha = 1;
      else alpha = 1 - easeOut((k - 0.75) / 0.25);

      ctx.clearRect(0, 0, W(), H());

      // nền tối phủ mạnh để chắc chắn thấy overlay
      ctx.globalAlpha = 0.85 * alpha;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W(), H());

      // sao glow
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "lighter";

      for (const s of starsRef.current) {
        const tw = 0.55 + 0.45 * Math.sin((t / 1000) * 10 + s.tw);
        const a = s.a * tw * alpha;

        // vẽ glow bằng radial gradient
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
        g.addColorStop(0, `rgba(255,255,255,${0.9 * a})`);
        g.addColorStop(0.35, `rgba(180,220,255,${0.35 * a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      if (k < 1) {
        rafRef.current = requestAnimationFrame(draw);
      } else if (!doneCalledRef.current) {
        doneCalledRef.current = true;
        onDone?.();
      }
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </motion.div>
  );
}
