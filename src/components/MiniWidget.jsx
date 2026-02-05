import { motion } from "framer-motion";

export default function IntroModal({
  value,
  onChange,
  onStart,
  layoutId = "userCard",
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[radial-gradient(800px_500px_at_50%_45%,rgba(110,231,255,0.10),rgba(3,7,18,0.88))] backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.25 }}
    >
      {/* Đây là “card” sẽ morph thành mini */}
      <motion.div
        layoutId={layoutId}
        className="w-full max-w-[520px] rounded-2xl border border-white/15 bg-white/10 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
      >
        <p className="text-lg font-extrabold">Chào bạn 👋</p>
        <p className="mt-1 text-sm leading-relaxed text-white/70">
          Nhập tên để “đặt dấu” của bạn trên bầu trời. Sau đó web sẽ zoom-out và
          hiển thị toàn bộ những người đã ghé qua, rồi bắt đầu giới thiệu dự án.
        </p>

        <div className="mt-4 flex gap-2">
          <input
            className="flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-sm text-white/90 outline-none placeholder:text-white/45 focus:border-cyan-200/40"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Nhập tên của bạn"
            maxLength={30}
            onKeyDown={(e) => e.key === "Enter" && onStart(value)}
          />
          <button
            className="rounded-xl border border-cyan-200/35 bg-cyan-200/15 px-4 py-3 text-sm font-bold text-white/90 hover:bg-cyan-200/20 active:scale-[0.98]"
            onClick={() => onStart(value)}
          >
            Bắt đầu
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
