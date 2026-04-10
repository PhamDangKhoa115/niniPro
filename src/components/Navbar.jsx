import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/ELEMENT 7.png";
import SearchBox from "./SearchBox";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutMobileOpen, setAboutMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) {
        setOpen(false);
        setAboutMobileOpen(false);
      }
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

  const navBaseClass = ({ isActive }) =>
    [
      "no-underline font-['Times_New_Roman'] uppercase transition-all",
      "text-[16px] lg:text-[18px] font-extrabold tracking-[0.06em]",
      scrolled
        ? "text-white/90 hover:text-white"
        : "text-brandText/90 hover:text-brandText",
      isActive ? "underline underline-offset-8 decoration-2" : "",
    ].join(" ");

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
              setAboutMobileOpen(false);
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
            {items.map((it, index) => (
              <div key={it.to} className="flex items-center gap-6 lg:gap-8">
                <NavLink
                  to={it.to}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className={navBaseClass}
                >
                  {it.label}
                </NavLink>

                {/* GIỚI THIỆU nằm ngay cạnh TRANG CHỦ */}
                {index === 0 && (
                  <div
                    className="relative"
                    onMouseEnter={() => setAboutOpen(true)}
                    onMouseLeave={() => setAboutOpen(false)}
                  >
                    <button
                      type="button"
                      className={[
                        "no-underline font-['Times_New_Roman'] uppercase transition-all",
                        "text-[16px] lg:text-[18px] font-extrabold tracking-[0.06em]",
                        "inline-flex items-center gap-2",
                        scrolled
                          ? "text-white/90 hover:text-white"
                          : "text-brandText/90 hover:text-brandText",
                      ].join(" ")}
                    >
                      GIỚI THIỆU
                      <svg
                        className={`transition-transform duration-300 ${
                          aboutOpen ? "rotate-180" : ""
                        }`}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div
                      className={[
                        "absolute left-0 top-full pt-4 transition-all duration-300",
                        aboutOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2",
                      ].join(" ")}
                    >
                      <div className="min-w-[340px] overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-xl">
                        <NavLink
                          to="/gioi-thieu/ve-siti-group"
                          onClick={() => {
                            setAboutOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="block px-5 py-4 no-underline font-['Times_New_Roman'] font-extrabold uppercase text-brandText hover:bg-brand/10 transition whitespace-nowrap"
                        >
                          VỀ SITI GROUP
                        </NavLink>

                        <NavLink
                          to="/gioi-thieu/ve-uso-organization"
                          onClick={() => {
                            setAboutOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="block px-5 py-4 no-underline font-['Times_New_Roman'] font-extrabold uppercase text-brandText hover:bg-brand/10 transition whitespace-nowrap"
                        >
                          VỀ USO ORGANIZATION
                        </NavLink>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* MOBILE DROPDOWN */}
        <div
          className={[
            "lg:hidden overflow-hidden transition-all duration-300",
            open ? "max-h-[500px] pb-3" : "max-h-0",
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
              {items.map((it, index) => (
                <div key={it.to}>
                  <NavLink
                    to={it.to}
                    onClick={() => {
                      setOpen(false);
                      setAboutMobileOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={({ isActive }) =>
                      [
                        "px-3 py-3 rounded-xl no-underline font-['Times_New_Roman'] uppercase block",
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

                  {/* GIỚI THIỆU nằm ngay dưới TRANG CHỦ trên mobile */}
                  {index === 0 && (
                    <div className="mt-1">
                      <button
                        type="button"
                        onClick={() => setAboutMobileOpen((v) => !v)}
                        className={[
                          "w-full px-3 py-3 rounded-xl text-left font-['Times_New_Roman'] uppercase",
                          "text-[16px] font-extrabold transition tracking-[0.05em]",
                          "flex items-center justify-between",
                          scrolled
                            ? "text-white/90 hover:text-white hover:bg-white/10"
                            : "text-brandText/90 hover:text-brandText hover:bg-brand/10",
                        ].join(" ")}
                      >
                        <span>GIỚI THIỆU</span>
                        <svg
                          className={`transition-transform duration-300 ${
                            aboutMobileOpen ? "rotate-180" : ""
                          }`}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <div
                        className={[
                          "overflow-hidden transition-all duration-300",
                          aboutMobileOpen ? "max-h-40 mt-2" : "max-h-0",
                        ].join(" ")}
                      >
                        <div className="ml-3 flex flex-col gap-2">
                          <NavLink
                            to="/gioi-thieu/ve-siti-group"
                            onClick={() => {
                              setOpen(false);
                              setAboutMobileOpen(false);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={[
                              "px-3 py-3 rounded-xl no-underline font-['Times_New_Roman'] uppercase",
                              "text-[15px] font-extrabold transition tracking-[0.05em]",
                              scrolled
                                ? "text-white/90 hover:text-white hover:bg-white/10"
                                : "text-brandText/90 hover:text-brandText hover:bg-brand/10",
                            ].join(" ")}
                          >
                            VỀ SITI GROUP
                          </NavLink>

                          <NavLink
                            to="/gioi-thieu/ve-uso-organization"
                            onClick={() => {
                              setOpen(false);
                              setAboutMobileOpen(false);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={[
                              "px-3 py-3 rounded-xl no-underline font-['Times_New_Roman'] uppercase",
                              "text-[15px] font-extrabold transition tracking-[0.05em]",
                              scrolled
                                ? "text-white/90 hover:text-white hover:bg-white/10"
                                : "text-brandText/90 hover:text-brandText hover:bg-brand/10",
                            ].join(" ")}
                          >
                            VỀ USO ORGANIZATION
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
