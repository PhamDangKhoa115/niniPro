import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LocationCarousel({ items, autoPlayMs = 3000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (paused || dragging || items.length <= 1) return;

    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, autoPlayMs);

    return () => clearTimeout(timeoutRef.current);
  }, [index, paused, dragging, autoPlayMs, items.length]);

  const current = items[index];
  const prev = items[(index - 1 + items.length) % items.length];
  const next = items[(index + 1) % items.length];

  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-[28px] sm:text-[38px] font-['Times_New_Roman'] font-extrabold text-brandText">
            NHỮNG CHÒM SAO CẦN ĐƯỢC THẮP SÁNG
          </h2>
          <p className="mt-3 text-[15px] sm:text-[18px] font-semibold text-brandText-light font-['Times_New_Roman']">
            Mỗi địa điểm là một chòm sao mang theo những hoàn cảnh cần được yêu
            thương và đồng hành.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex items-center justify-center">
            {/* preview trái */}
            <button
              type="button"
              onClick={prevSlide}
              className="hidden lg:block relative w-[220px] h-[460px] rounded-[30px] overflow-hidden opacity-45 scale-90 -mr-12 transition hover:opacity-70"
            >
              <img
                src={prev.image}
                alt={prev.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/10" />
            </button>

            {/* card chính */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragStart={() => {
                setDragging(true);
                setPaused(true);
              }}
              onDragEnd={(e, info) => {
                const offset = info.offset.x;

                if (offset < -80) nextSlide();
                else if (offset > 80) prevSlide();

                setDragging(false);
                setPaused(false);
              }}
              className="relative z-10 w-full max-w-[1140px] cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence mode="wait">
                <motion.article
                  key={current.id}
                  initial={{ opacity: 0, x: 80, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -80, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="overflow-hidden rounded-[42px] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
                >
                  <div className="grid md:grid-cols-[1.05fr_0.95fr]">
                    {/* ảnh */}
                    <div className="h-[320px] md:h-[690px] bg-black/5">
                      <img
                        src={current.image}
                        alt={current.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>

                    {/* nội dung */}
                    <div className="flex flex-col justify-center p-8 sm:p-10 md:p-14 bg-white">
                      <div className="text-[15px] sm:text-[18px] font-bold tracking-[0.18em] uppercase text-brandbrown font-['Times_New_Roman']">
                        {current.star}
                      </div>

                      <h3 className="mt-6 text-[34px] sm:text-[48px] md:text-[56px] leading-[1.15] font-extrabold text-brandText font-['Times_New_Roman']">
                        {current.title}
                      </h3>

                      <p className="mt-16 text-[18px] sm:text-[22px] md:text-[24px] leading-[2] font-semibold text-brandText-light text-left font-['Times_New_Roman']">
                        {current.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </motion.div>

            {/* preview phải */}
            <button
              type="button"
              onClick={nextSlide}
              className="hidden lg:block relative w-[220px] h-[460px] rounded-[30px] overflow-hidden opacity-45 scale-90 -ml-12 transition hover:opacity-70"
            >
              <img
                src={next.image}
                alt={next.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/10" />
            </button>
          </div>

          {/* nút prev/next */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-16 w-16 rounded-full bg-white shadow-md text-brandText text-3xl hover:scale-105 transition"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-16 w-16 rounded-full bg-white shadow-md text-brandText text-3xl hover:scale-105 transition"
          >
            ›
          </button>

          {/* dots */}
          <div className="mt-8 flex justify-center gap-3">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-3 rounded-full transition-all ${
                  i === index ? "w-10 bg-brand" : "w-3 bg-brand/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
