// export default function ProjectPanel({ show }) {
//   return (
//     <section
//       className={[
//         "fixed left-1/2 bottom-4 w-[min(980px,calc(100%-28px))] -translate-x-1/2 rounded-2xl border border-white/15 bg-white/10 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-700",
//         show
//           ? "opacity-100 translate-y-0"
//           : "opacity-0 translate-y-4 pointer-events-none",
//       ].join(" ")}
//       aria-label="Project"
//     >
//       <h2 className="text-lg font-extrabold">🚀 Hành Trình Hy Vọng 2026</h2>

//       <p className="mt-2 text-sm text-white/70">
//         Thấu hiểu những vì sao, cùng dệt lên bầu trời hy vọng.
//       </p>

//       <div className="mt-4 grid gap-3 md:grid-cols-[1.3fr_1fr]">
//         <div className="rounded-xl border border-white/10 bg-black/20 p-4">
//           <h3 className="text-sm font-bold">🎯 Mục tiêu</h3>
//           <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
//             <li>Giới thiệu các địa điểm hỗ trợ trẻ em khuyết tật</li>
//             <li>Kết nối cộng đồng và nguồn lực</li>
//             <li>Lan tỏa sự quan tâm và đồng hành</li>
//           </ul>

//           <div className="mt-3 flex flex-wrap gap-2">
//             <button className="rounded-xl border border-cyan-200/35 bg-cyan-200/15 px-3 py-2 text-xs font-bold text-white/90 hover:bg-cyan-200/20 active:scale-[0.98]">
//               Xem Meo
//             </button>
//             <button className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-white/90 hover:bg-white/15 active:scale-[0.98]">
//               Tài liệu về Meo
//             </button>
//           </div>
//         </div>

//         <div className="rounded-xl border border-white/10 bg-black/20 p-4">
//           <h3 className="text-sm font-bold">🧩 Hành trình</h3>
//           <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
//             <li>Phase 1 — Định vị những vì sao</li>
//             <li>Phase 2 — Kết nối và dệt sáng</li>
//             <li>Phase 3 — Thắp sáng ngân hà</li>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }
