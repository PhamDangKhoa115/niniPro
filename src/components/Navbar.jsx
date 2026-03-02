import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // đóng menu khi chuyển sang desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setOpen(false); // sm breakpoint
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const items = [
    { to: "/mainPage", label: "TRANG CHỦ" },
    { to: "/Activities", label: "CÁC HOẠT ĐỘNG" },
    { to: "/donate", label: "DONATE" },
  ];

  const linkColor = scrolled ? "text-white" : "text-black";

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-brand/95 shadow-lg backdrop-blur-md" : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        <div className="h-14 sm:h-16 flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            onClick={() => {
              setOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={[
              "no-underline font-['Times_New_Roman'] uppercase tracking-[0.12em] transition-colors",
              "text-[16px] sm:text-[20px] font-extrabold",
              linkColor,
            ].join(" ")}
          >
            SiTi Group
          </Link>

          {/* Desktop menu */}
          <nav className="hidden sm:flex items-center gap-5 sm:gap-7">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={({ isActive }) =>
                  [
                    "no-underline font-['Times_New_Roman'] uppercase transition-all",
                    "text-[16px] sm:text-[18px] font-extrabold",
                    scrolled
                      ? "text-white/90 hover:text-white"
                      : "text-black/90 hover:text-black",
                    isActive ? "underline underline-offset-8 decoration-2" : "",
                  ].join(" ")
                }
              >
                {it.label}
              </NavLink>
            ))}

            <button
              type="button"
              className={[
                "ml-1 inline-flex items-center justify-center rounded-full w-9 h-9 transition-all",
                scrolled
                  ? "text-white/90 hover:text-white hover:bg-white/10"
                  : "text-black/90 hover:text-black hover:bg-black/10",
              ].join(" ")}
              aria-label="Search"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="opacity-90"
              >
                <path
                  d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </nav>

          {/* Mobile buttons */}
          <div className="sm:hidden flex items-center gap-2">
            {/* Search */}
            <button
              type="button"
              className={[
                "inline-flex items-center justify-center rounded-full w-9 h-9 transition-all",
                scrolled
                  ? "text-white/90 hover:text-white hover:bg-white/10"
                  : "text-black/90 hover:text-black hover:bg-black/10",
              ].join(" ")}
              aria-label="Search"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="opacity-90"
              >
                <path
                  d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={[
                "inline-flex items-center justify-center rounded-xl w-10 h-10 transition-all",
                scrolled
                  ? "text-white/90 hover:text-white hover:bg-white/10"
                  : "text-black/90 hover:text-black hover:bg-black/10",
              ].join(" ")}
              aria-label="Menu"
              aria-expanded={open}
            >
              {/* icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={[
            "sm:hidden overflow-hidden transition-all duration-300",
            open ? "max-h-80 pb-3" : "max-h-0",
          ].join(" ")}
        >
          <div
            className={[
              "rounded-2xl border border-white/15 backdrop-blur-xl",
              scrolled ? "bg-brand/95" : "bg-white/70",
            ].join(" ")}
          >
            <div className="flex flex-col p-3">
              {items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  onClick={() => {
                    setOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={({ isActive }) =>
                    [
                      "px-3 py-3 rounded-xl no-underline font-['Times_New_Roman'] uppercase",
                      "text-[16px] font-extrabold transition",
                      scrolled
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-black/90 hover:text-black hover:bg-black/10",
                      isActive
                        ? scrolled
                          ? "bg-white/10"
                          : "bg-black/10"
                        : "",
                    ].join(" ")
                  }
                >
                  {it.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
