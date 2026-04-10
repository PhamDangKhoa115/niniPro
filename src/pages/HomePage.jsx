import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchVisitors } from "../api/visitors";

import SpaceScene from "../components/SpaceScene";
// import ProjectPanel from "../components/ProjectPanel";
import CenterLogo from "../components/CenterLogo";
// import PhaseBar from "../components/PhaseBar";

import { supabase } from "../utils/supabase";
import space from "../assets/space.jpg";

import { safeName } from "../utils/stars";

export default function HomePage({ startTransition }) {
  // background parallax

  const MY_NAME_KEY = "moon_my_name_v1";
  const [bgZoom, setBgZoom] = useState(1);
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });

  const [isMobile, setIsMobile] = useState(false);

  const LOGO_SHIFT_DESKTOP = -320;
  const LOGO_SHIFT_MOBILE = -70;
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640); // <640px = mobile (tailwind sm)
    onResize(); // chạy 1 lần khi mount
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // user
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    show: (delay = 0) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };
  const [nameInput, setNameInput] = useState(
    () => localStorage.getItem(MY_NAME_KEY) || "",
  );
  const [myName, setMyName] = useState(
    () => localStorage.getItem(MY_NAME_KEY) || "",
  );
  const [people, setPeople] = useState([]);
  useEffect(() => {
    fetchVisitors().then((rows) => {
      const list = rows.map((r) => ({
        name: r.name,
        firstSeen: Date.now(),
        lastSeen: Date.now(),
      }));

      setPeople(list);
    });
  }, []);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const { data, error } = await supabase
          .from("visitors")
          .select("name, created_at")
          .order("created_at", { ascending: false })
          .limit(200);

        if (error) {
          console.error("Supabase select error:", error);
          return;
        }

        // Map về đúng format mà buildStarsFromPeople đang dùng: [{ name }]
        const arr = (data || [])
          .filter((x) => x?.name)
          .map((x) => ({ name: x.name }));

        if (alive) setPeople(arr);
      } catch (e) {
        console.error("Supabase select exception:", e);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const [started, setStarted] = useState(false);

  const focusMeRef = useRef(null);
  // ở đầu HomePage

  const didAutoNavRef = useRef(false);

  useEffect(() => {
    if (!started) return;
    if (!myName?.trim()) return;
    if (didAutoNavRef.current) return;

    didAutoNavRef.current = true;

    const tFocus = window.setTimeout(() => {
      focusMeRef.current?.();
    }, 3000);

    // ✅ sau 5s gọi chuyển trang có hiệu ứng (overlay ở App)
    const tWarp = window.setTimeout(() => {
      startTransition("/mainPage");
    }, 8000);

    // ✅ fallback vẫn ok
    const tFallbackNav = window.setTimeout(() => {
      startTransition("/mainPage");
    }, 9500);

    return () => {
      window.clearTimeout(tFocus);
      window.clearTimeout(tWarp);
      window.clearTimeout(tFallbackNav);
    };
  }, [started, myName, startTransition]);
  const start = async (raw) => {
    const n = safeName(raw);
    if (!n) return;

    setMyName(n);
    setNameInput(n);
    localStorage.setItem(MY_NAME_KEY, n);
    setStarted(true);

    // ✅ Optimistic: thêm tên vừa nhập vào danh sách đang có (từ Supabase)
    setPeople((prev) => {
      const lower = n.toLowerCase();
      const exists = prev.some((p) => (p?.name || "").toLowerCase() === lower);
      return exists ? prev : [{ name: n }, ...prev];
    });

    // ✅ Lưu lên Supabase (web thật sự “chứa tên người dùng”)
    try {
      const { error } = await supabase.from("visitors").insert([{ name: n }]);
      if (error) console.error("Supabase insert error:", error);
    } catch (e) {
      console.error("Supabase insert exception:", e);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950 text-white touch-none">
      {/* 🌌 SPACE BACKGROUND (parallax zoom + pan) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-75"
        style={{
          backgroundImage: `url(${space})`,
          transform: `scale(${1 + (bgZoom - 1) * 0.25}) translate(${
            -bgOffset.x * 0.03
          }px, ${-bgOffset.y * 0.03}px)`,
          transformOrigin: "50% 50%",
        }}
      />

      {/* overlay nhẹ */}
      <div className="absolute inset-0 z-10 bg-black/20" />

      {/* 🌟 CANVAS + STARS */}
      <div className="relative z-20">
        <SpaceScene
          started={started}
          onFocusMeRef={focusMeRef}
          onZoomChange={setBgZoom}
          onPanChange={setBgOffset}
          myName={myName}
          people={people}
        />
      </div>

      <motion.div
        className="fixed left-[8%] top-[35%] -translate-y-1/2 w-[92vw] text-left pointer-events-none z-30"
        initial={{
          opacity: 0,
          x: -220,
          y: 20,
          filter: "blur(6px)",
        }}
        animate={
          started
            ? {
                opacity: 1,
                x: 0,
                y: 0,
                filter: "blur(0px)",
              }
            : {
                opacity: 0,
              }
        }
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          transform: `translate(calc(-50% + ${bgOffset.x * 0.18}px), calc(-50% + ${bgOffset.y * 0.1}px))`,
        }}
      >
        <motion.div className="fixed left-[5%] top-[90%]  w-[80vw] pointer-events-none z-30 flex flex-col items-center">
          {/* TITLE */}
          <motion.h1
            className="
    font-beaufort
    text-[clamp(20px,6vw,104px)]
    leading-[1.05]
    text-white
    text-center
    whitespace-nowrap
    drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]
    overflow-hidden text-ellipsis
  "
          >
            HÀNH TRÌNH HY VỌNG 2026
          </motion.h1>
          {/* SUBTITLE */}
          <motion.h2
            className="
      mt-4
      font-beaufort italic
      text-[22px] sm:text-[36px]
      text-white/90
      text-center
      drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]
    "
          >
            Thấu Sao Dệt Sáng
          </motion.h2>
        </motion.div>
      </motion.div>
      {/* CARD nhập tên -> morph góc trái */}
      {!started && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, y: 10, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-[520px] rounded-2xl border border-white/15 bg-white/10 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            <p className="text-[25px] font-['Times_New_Roman'] font-extrabold">
              Chào bạn 👋
            </p>
            <p className="mt-1 text-[18px] leading-relaxed font-['Times_New_Roman'] text-white/70">
              Hãy nhập tên để cùng chúng mình dệt nên dải ngân hà <br /> hy vọng
              nhé !
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                className="flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-sm text-white/90 outline-none placeholder:text-white/45 focus:border-cyan-200/40"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Nhập tên của bạn"
                maxLength={30}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    start(nameInput);
                  }
                }}
              />
              <button
                type="button"
                className="w-full sm:w-auto rounded-xl border border-cyan-200/35 bg-cyan-200/15 px-4 py-3 text-sm font-bold text-white/90 hover:bg-cyan-200/20 active:scale-[0.98]"
                onClick={() => start(nameInput)}
              >
                Bắt đầu
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
