import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import HomePage from "./pages/HomePage";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import DonatePage from "./pages/DonatePage";
import MapPage from "./pages/MapPage";
import AboutSiTiGroupPage from "./pages/AboutSiTiGroupPage";
import AboutUSOPage from "./pages/AboutUSOPage";

import StarTransitionOverlay from "./components/StarTransitionOverlay";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  const navigate = useNavigate();

  const [transitionOn, setTransitionOn] = useState(false);
  const busyRef = useRef(false);

  const startTransition = (to) => {
    if (busyRef.current) return;
    busyRef.current = true;

    setTransitionOn(true);

    window.setTimeout(() => {
      navigate(to);

      window.setTimeout(() => {
        setTransitionOn(false);
        busyRef.current = false;
      }, 1000);
    }, 1500);
  };

  return (
    <>
      <StarTransitionOverlay
        show={transitionOn}
        dim={1}
        minSize={34}
        maxSize={110}
        spawnEveryMs={60}
        maxStars={180}
        starLifeMs={6000}
      />

      <Routes>
        <Route path="/" element={<Navigate to="/HomePage" replace />} />
        <Route
          path="/HomePage"
          element={<HomePage startTransition={startTransition} />}
        />
        <Route path="/explore" element={<MapPage />} />
        <Route path="/mainPage" element={<Page1 />} />
        <Route path="/Activities" element={<Page2 />} />
        <Route path="/donate" element={<DonatePage />} />

        {/* GIỚI THIỆU */}
        <Route
          path="/gioi-thieu/ve-siti-group"
          element={<AboutSiTiGroupPage />}
        />
        <Route
          path="/gioi-thieu/ve-uso-organization"
          element={<AboutUSOPage />}
        />
      </Routes>
    </>
  );
}
