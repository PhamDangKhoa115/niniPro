import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import HomePage from "./pages/HomePage";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import DonatePage from "./pages/DonatePage";

import StarTransitionOverlay from "./components/StarTransitionOverlay";

export default function App() {
  const navigate = useNavigate();

  const [transitionOn, setTransitionOn] = useState(false);
  const busyRef = useRef(false);

  // gọi hàm này để chuyển trang với hiệu ứng sao phủ màn hình + tan dần
  const startTransition = (to) => {
    if (busyRef.current) return;
    busyRef.current = true;

    setTransitionOn(true);

    // phủ lâu hơn trước khi chuyển trang
    window.setTimeout(() => {
      navigate(to);

      // giữ overlay lâu hơn sau khi sang trang rồi mới fade out
      window.setTimeout(() => {
        setTransitionOn(false);
        busyRef.current = false;
      }, 1000); // tăng lên 900-1400
    }, 1500); // tăng lên 1200-2000
  };

  return (
    <>
      {/* ✅ Overlay sống xuyên route nên mới tan dần được sau khi chuyển trang */}
      <StarTransitionOverlay
        show={transitionOn}
        dim={1}
        minSize={34}
        maxSize={110}
        spawnEveryMs={60} // dày nhanh hơn
        maxStars={180} // phủ kín hơn
        starLifeMs={6000} // sống lâu hơn
      />

      <Routes>
        <Route path="/" element={<Navigate to="/HomePage" replace />} />
        <Route
          path="/HomePage"
          element={<HomePage startTransition={startTransition} />}
        />

        <Route path="/mainPage" element={<Page1 />} />
        <Route path="/Activities" element={<Page2 />} />
        <Route path="/donate" element={<DonatePage />} />
      </Routes>
    </>
  );
}
