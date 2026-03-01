import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll(); // init
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-brand/95 shadow-lg backdrop-blur-md" : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        <div className="h-14 sm:h-16 flex items-center justify-between">
          {/* Left: Brand */}
          <Link
            to="/"
            className={[
              "no-underline text-[20px]  font-extraBold font-['Times_New_Roman'] uppercase tracking-[0.12em] transition-colors",
              scrolled ? "text-white" : "text-black",
            ].join(" ")}
          >
            SiTi Group
          </Link>

          {/* Right: Menu */}
          <nav className="flex items-center gap-5 sm:gap-7">
            {[
              { to: "/mainPage", label: "TRANG CHỦ" },
              { to: "/Activities", label: "CÁC HOẠT ĐỘNG" },
              { to: "/donate", label: "DONATE" },
            ].map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  [
                    "no-underline text-[20px]  font-extraBold font-['Times_New_Roman'] uppercase  transition-all",
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

            {/* Search icon (tạm) */}
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
        </div>
      </div>
    </header>
  );
}
