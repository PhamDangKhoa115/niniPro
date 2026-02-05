import { AnimatePresence, motion } from "framer-motion";

export default function LocationPanel({ open, data, phaseTitle, onClose }) {
  return (
    <AnimatePresence>
      {open && data && (
        <>
          {/* overlay click để đóng */}
          <motion.button
            type="button"
            className="fixed inset-0 z-[70] bg-black/35"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Close"
          />

          {/* panel */}
          <motion.aside
            className="fixed right-4 top-4 z-[80] w-[min(420px,calc(100vw-32px))] rounded-2xl border border-white/15 bg-white/10 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-white/60">{phaseTitle}</div>
                <h3 className="mt-1 text-lg font-extrabold">{data.name}</h3>
                <div className="mt-1 text-sm text-white/70">{data.city}</div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-white/90 hover:bg-white/15 active:scale-[0.98]"
              >
                Đóng
              </button>
            </div>

            {data.image && (
              <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                <img
                  src={data.image}
                  alt={data.name}
                  className="h-[180px] w-full object-cover"
                  draggable={false}
                />
              </div>
            )}

            {data.summary && (
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {data.summary}
              </p>
            )}

            <div className="mt-4 grid gap-2">
              {data.links?.donate && (
                <a
                  href={data.links.donate}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-cyan-200/35 bg-cyan-200/15 px-3 py-3 text-sm font-bold text-white/90 hover:bg-cyan-200/20"
                >
                  💛 Ủng hộ / Gây quỹ
                </a>
              )}

              {data.links?.facebook && (
                <a
                  href={data.links.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm font-bold text-white/90 hover:bg-white/15"
                >
                  🔗 Xem bài viết / Fanpage
                </a>
              )}
            </div>

            <div className="mt-4 text-xs text-white/55">
              * “Sao” là các em nhỏ khuyết tật. “Chòm sao” là nơi tụ họp và nuôi
              dưỡng các em.
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
