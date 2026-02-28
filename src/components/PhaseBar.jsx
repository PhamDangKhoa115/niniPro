// export default function PhaseBar({ phase, setPhase }) {
//   const items = [
//     { id: 1, label: "Phase 1" },
//     { id: 2, label: "Phase 2" },
//     { id: 3, label: "Phase 3" },
//   ];

//   return (
//     <div className="fixed left-1/2 top-4 z-40 -translate-x-1/2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-xl">
//       <div className="flex gap-2">
//         {items.map((it) => (
//           <button
//             key={it.id}
//             onClick={() => setPhase(it.id)}
//             className={[
//               "rounded-xl px-3 py-2 text-xs font-bold transition",
//               phase === it.id
//                 ? "border border-cyan-200/40 bg-cyan-200/15 text-white"
//                 : "border border-white/10 bg-white/5 text-white/75 hover:bg-white/10",
//             ].join(" ")}
//           >
//             {it.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
