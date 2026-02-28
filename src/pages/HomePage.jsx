import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchVisitors } from "../api/visitors";

import SpaceScene from "../components/SpaceScene";
// import ProjectPanel from "../components/ProjectPanel";
import CenterLogo from "../components/CenterLogo";
// import PhaseBar from "../components/PhaseBar";
import LocationPanel from "../components/LocationPanel";
import { supabase } from "../utils/supabase";
import space from "../assets/space.jpg";

import { safeName } from "../utils/stars";

import { CONSTELLATIONS, PHASES } from "../data/constellations";

export default function HomePage() {
  // background parallax
  const MY_NAME_KEY = "moon_my_name_v1";
  const [bgZoom, setBgZoom] = useState(1);
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  const [phaseFx, setPhaseFx] = useState({ active: false, next: null });
  const [isMobile, setIsMobile] = useState(false);
  const LOGO_SHIFT_DESKTOP = -200;
  const LOGO_SHIFT_MOBILE = -70;
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640); // <640px = mobile (tailwind sm)
    onResize(); // chạy 1 lần khi mount
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const PHASE_META = {
    1: {
      title: "Định Vị Vì Sao",
      subtitle: "Nhìn thấy • Gọi tên • Đặt dấu",
      zoomHint: "Zoom gần",
    },
    2: {
      title: "Kết Quang Dệt Sáng",
      subtitle: "Kết nối • Dệt sáng • Đồng hành",
      zoomHint: "Zoom vừa",
    },
    3: {
      title: "Thắp Sáng Ngân Hà",
      subtitle: "Lan tỏa • Tổng lực • Ngân hà",
      zoomHint: "Zoom rộng",
    },
  };
  const isPhaseTransitioning = phaseFx.active;

  // user
  const setPhaseCinematic = (next) => {
    if (next === phase) return;

    setPhaseFx({ active: true, next });

    // “đổi phase” ở giữa transition
    window.setTimeout(() => setPhase(next), 1560);

    // tắt overlay
    window.setTimeout(() => setPhaseFx({ active: false, next: null }), 1360);
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
        console.log("VISITORS FROM SUPABASE:", arr.length, arr.slice(0, 5));
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

  // UI
  const [showProject, setShowProject] = useState(false);

  // Phase
  const [phase, setPhase] = useState(1);

  // Selected location (panel)
  const [selectedId, setSelectedId] = useState(null);
  const selected = CONSTELLATIONS.find((c) => c.id === selectedId) || null;

  const focusMeRef = useRef(null);

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

    setShowProject(false);
    window.setTimeout(() => setShowProject(true), 2200);
  };

  const resetAll = () => {
    resetPeople();
    localStorage.removeItem(MY_NAME_KEY);
    window.location.reload();
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950 text-white">
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

      {/* Phase bar (chỉ hiện sau khi started để đúng flow)
      {started && <PhaseBar phase={phase} setPhase={setPhaseCinematic} />} */}
      {/* 🌟 CANVAS + STARS */}
      <div className="relative z-20">
        <SpaceScene
          constellations={CONSTELLATIONS}
          activePhase={phase}
          started={started}
          onFocusMeRef={focusMeRef}
          onZoomChange={setBgZoom}
          onPanChange={setBgOffset}
          onSelectConstellation={setSelectedId}
          phaseTransitioning={isPhaseTransitioning}
          myName={myName}
          people={people}
          selectedId={selectedId}
        />
      </div>

      {/* Center Logo (xuất hiện dần) */}
      <motion.div
        className="fixed left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 10,
          filter: "blur(6px)",
          x: isMobile ? LOGO_SHIFT_MOBILE : LOGO_SHIFT_DESKTOP,
        }}
        animate={
          started
            ? {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                x: isMobile ? LOGO_SHIFT_MOBILE : LOGO_SHIFT_DESKTOP,
              }
            : {
                opacity: 0,
                scale: 0.96,
                y: 10,
                filter: "blur(6px)",
                x: isMobile ? LOGO_SHIFT_MOBILE : LOGO_SHIFT_DESKTOP,
              }
        }
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <CenterLogo />
      </motion.div>
      {/* Overlay intro (chỉ khi chưa started) */}
      <AnimatePresence>
        {!started && (
          <motion.div
            className="fixed inset-0 z-40 bg-[radial-gradient(800px_500px_at_50%_45%,rgba(110,231,255,0.10),rgba(3,7,18,0.88))] backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: "none" }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {phaseFx.active && (
          <motion.div
            className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {/* layer warp */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.02, filter: "blur(0px)" }}
              animate={{ scale: 1.08, filter: "blur(6px)" }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(70% 60% at 50% 45%, rgba(120,220,255,0.10) 0%, rgba(0,0,0,0.62) 58%, rgba(0,0,0,0.92) 100%)",
              }}
            />

            {/* phase text */}
            <motion.div
              className="relative z-10 text-center rounded-2xl border border-white/10 bg-black/35 px-6 py-5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
              initial={{ y: 10, opacity: 0, filter: "blur(6px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="text-xs tracking-[0.22em] text-white/60">
                PHASE {phaseFx.next}
              </div>
              <div className="mt-2 text-2xl md:text-3xl font-extrabold text-white/92">
                {PHASE_META[phaseFx.next]?.title}
              </div>
              <div className="mt-2 text-sm text-white/65">
                {PHASE_META[phaseFx.next]?.subtitle}
              </div>

              {/* progress bar */}
              <motion.div className="mt-5 h-[3px] w-[min(420px,72vw)] overflow-hidden rounded-full bg-white/10 mx-auto">
                <motion.div
                  className="h-full bg-white/70"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
            <p className="text-lg font-extrabold">Chào bạn 👋</p>
            <p className="mt-1 text-sm leading-relaxed text-white/70">
              Nhập tên để “đặt dấu” của bạn trên bầu trời.
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

      {/* Location Info Panel */}
      <LocationPanel
        open={!!selected}
        data={selected}
        phaseTitle={selected ? PHASES[selected.phase - 1]?.title : ""}
        onClose={() => setSelectedId(null)}
      />

      {/* Project Panel */}
      {/* <ProjectPanel show={showProject && !isPhaseTransitioning} /> */}
    </div>
  );
}
