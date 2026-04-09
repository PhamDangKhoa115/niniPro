import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/ELEMENT 7.png";
import SearchBox from "./SearchBox";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const items = [
    { to: "/mainPage", label: "TRANG CHỦ" },
    { to: "/explore", label: "KHÁM PHÁ" },
    { to: "/Activities", label: "CÁC HOẠT ĐỘNG" },
    { to: "/donate", label: "DONATE" },
  ];

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-brand/95 border-white/10 shadow-lg backdrop-blur-md"
          : "bg-white/95 border-brand/10 backdrop-blur-md",
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1280px] px-3 sm:px-6">
        {/* MOBILE */}
        <div className="lg:hidden h-16 flex items-center justify-between gap-2">
          <Link
            to="/"
            onClick={() => {
              setOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="shrink-0 inline-flex items-center"
          >
            <img
              src={Logo}
              alt="SiTiGroup"
              className="h-9 w-auto object-contain"
              draggable={false}
            />
          </Link>

          <div className="min-w-0 flex-1 flex justify-center">
            <SearchBox />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={[
              "shrink-0 inline-flex items-center justify-center rounded-xl w-10 h-10 transition-all",
              scrolled
                ? "text-white/90 hover:text-white hover:bg-white/10"
                : "text-brandText/90 hover:text-brandText hover:bg-brand/10",
            ].join(" ")}
            aria-label="Menu"
            aria-expanded={open}
          >
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

        {/* DESKTOP */}
        <div className="hidden lg:grid h-[84px] grid-cols-[auto_auto_1fr] items-center gap-4">
          <div className="flex items-center justify-start">
            <Link
              to="/"
              onClick={() => {
                setOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center"
            >
              <img
                src={Logo}
                alt="SiTiGroup"
                className="h-12 w-auto object-contain"
                draggable={false}
              />
            </Link>
          </div>

          <div className="flex items-center">
            <SearchBox />
          </div>

          <nav className="flex items-center justify-end gap-6 lg:gap-8">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={({ isActive }) =>
                  [
                    "no-underline font-['Times_New_Roman'] uppercase transition-all",
                    "text-[16px] lg:text-[18px] font-extrabold tracking-[0.06em]",
                    scrolled
                      ? "text-white/90 hover:text-white"
                      : "text-brandText/90 hover:text-brandText",
                    isActive ? "underline underline-offset-8 decoration-2" : "",
                  ].join(" ")
                }
              >
                {it.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* MOBILE DROPDOWN */}
        <div
          className={[
            "lg:hidden overflow-hidden transition-all duration-300",
            open ? "max-h-80 pb-3" : "max-h-0",
          ].join(" ")}
        >
          <div
            className={[
              "rounded-2xl border backdrop-blur-xl",
              scrolled
                ? "bg-brand/95 border-white/15"
                : "bg-white/95 border-brand/15",
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
                      "text-[16px] font-extrabold transition tracking-[0.05em]",
                      scrolled
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-brandText/90 hover:text-brandText hover:bg-brand/10",
                      isActive
                        ? scrolled
                          ? "bg-white/10"
                          : "bg-brand/10"
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
