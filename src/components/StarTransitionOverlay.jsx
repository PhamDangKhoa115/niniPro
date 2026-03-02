import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function makeStar(id, { minSize, maxSize }) {
  const left = Math.random() * 100;
  const size = minSize + Math.random() * (maxSize - minSize);
  const duration = 2.0 + Math.random() * 2.2; // sao bay lâu hơn
  const delay = 0; // spawn dần nên không cần delay lớn
  const drift = -120 + Math.random() * 240;
  const rot = -160 + Math.random() * 320;
  const op = 0.55 + Math.random() * 0.45;

  return {
    id,
    left,
    size,
    duration,
    delay,
    drift,
    rot,
    op,
    bornAt: performance.now(),
  };
}

export default function StarTransitionOverlay({
  show,

  // “cảm giác lâu hơn”
  dim = 0.82,

  // sao to
  minSize = 34,
  maxSize = 110,

  // spawn dần
  spawnEveryMs = 70, // càng nhỏ càng nhiều sao nhanh
  maxStars = 140, // giới hạn để khỏi nặng

  // mỗi sao sống bao lâu (ms) để tự dọn list
  starLifeMs = 5200,
}) {
  const [stars, setStars] = useState([]);
  const idRef = useRef(0);

  // Khi bật overlay: spawn dần
  useEffect(() => {
    if (!show) return;

    // reset list mỗi lần show
    setStars([]);
    idRef.current = 0;

    const tick = () => {
      const now = performance.now();

      setStars((prev) => {
        // dọn sao quá hạn
        const alive = prev.filter((s) => now - s.bornAt < starLifeMs);

        // spawn thêm 1 sao (hoặc 2 nếu muốn dày nhanh)
        if (alive.length < maxStars) {
          const next = makeStar(`s-${idRef.current++}`, { minSize, maxSize });
          alive.push(next);
        }

        return alive;
      });
    };

    const timer = window.setInterval(tick, spawnEveryMs);
    return () => window.clearInterval(timer);
  }, [show, spawnEveryMs, maxStars, starLifeMs, minSize, maxSize]);

  // tắt scroll lúc overlay
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} // ✅ tan dần sau khi chuyển trang
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            className="absolute inset-0"
            style={{ background: `rgba(0,0,0,${dim})` }}
          />

          {stars.map((s) => (
            <img
              key={s.id}
              src="/star.png"
              alt=""
              className="star-rise absolute bottom-[-120px]"
              style={{
                left: `${s.left}%`,
                width: `${s.size}px`,
                opacity: s.op,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
                ["--drift"]: `${s.drift}px`,
                ["--rot"]: `${s.rot}deg`,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
