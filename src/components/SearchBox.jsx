export default function SearchBox({ placeholder = "Tìm kiếm..." }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 w-[150px] sm:w-[220px] lg:w-[280px] shadow-sm">
      <input
        type="text"
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent outline-none text-[12px] sm:text-sm text-slate-700 placeholder:text-slate-400"
      />

      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="text-brandText shrink-0"
      >
        <path
          d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
