export default function ProjectPanel({ show }) {
  return (
    <section
      className={[
        "fixed left-1/2 bottom-4 w-[min(980px,calc(100%-28px))] -translate-x-1/2 rounded-2xl border border-white/15 bg-white/10 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-700",
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
      aria-label="Project"
    >
      <h2 className="text-lg font-extrabold">🚀 Tên dự án </h2>
      <p className="mt-2 text-sm leading-relaxed text-white/70">
        khu vực giới thiệu dự án
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-[1.3fr_1fr]">
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-bold">🎯 Mục tiêu</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
            <li>Vào web → nhập tên → vũ trụ meo.</li>
            <li>Hiển thị Meo</li>
            <li>Chuyển mượt sang nội dung dự án về meo.</li>
          </ul>

          <div className="mt-3 flex flex-wrap gap-2">
            <button className="rounded-xl border border-cyan-200/35 bg-cyan-200/15 px-3 py-2 text-xs font-bold text-white/90 hover:bg-cyan-200/20 active:scale-[0.98]">
              Xem Meo
            </button>
            <button className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-white/90 hover:bg-white/15 active:scale-[0.98]">
              Tài liệu về Meo
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-bold">🧩 Tính năng</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
            <li>Bé mèo hư hỏng</li>
            <li>Bé mèo dễ thương</li>
            <li>Bé mèo cute</li>
            <li>Meo Moe Ome</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
