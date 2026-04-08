import { useRef } from "react";

export default function CardCarousel({ items = [], renderCard }) {
  const trackRef = useRef(null);
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;

    dragRef.current.isDown = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.scrollLeft = el.scrollLeft;

    el.setPointerCapture?.(e.pointerId);
    el.classList.add("cursor-grabbing");
  };

  const onPointerMove = (e) => {
    const el = trackRef.current;
    if (!el || !dragRef.current.isDown) return;

    const dx = e.clientX - dragRef.current.startX;
    el.scrollLeft = dragRef.current.scrollLeft - dx;
  };

  const onPointerUp = (e) => {
    const el = trackRef.current;
    if (!el) return;

    dragRef.current.isDown = false;
    el.releasePointerCapture?.(e.pointerId);
    el.classList.remove("cursor-grabbing");
  };

  const scrollByAmount = (dir) => {
    const el = trackRef.current;
    if (!el) return;

    const amount = Math.min(420, el.clientWidth * 0.85);
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* arrows desktop */}
      <button
        type="button"
        onClick={() => scrollByAmount("left")}
        className="hidden md:flex absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1/2 h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-lg border border-slate-200 text-brandText hover:bg-white"
        aria-label="Cuộn trái"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={() => scrollByAmount("right")}
        className="hidden md:flex absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-lg border border-slate-200 text-brandText hover:bg-white"
        aria-label="Cuộn phải"
      >
        ›
      </button>

      <div
        ref={trackRef}
        className="
          flex gap-4 overflow-x-auto pb-3
          snap-x snap-mandatory scroll-smooth
          cursor-grab select-none
          [scrollbar-width:none] [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="snap-start shrink-0 w-[85%] sm:w-[380px] lg:w-[420px]"
          >
            {renderCard(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
