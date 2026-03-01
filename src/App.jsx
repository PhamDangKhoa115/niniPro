import HomePage from "./pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";

import DonatePage from "./pages/DonatePage";

export default function App() {
  return (
    <>
      {/* padding-top để tránh navbar che nội dung */}
      {/* <div className="pt-20"> */}
      <Routes>
        <Route path="/" element={<Navigate to="/HomePage" replace />} />
        <Route path="/mainPage" element={<Page1 />} />
        <Route path="/Activities" element={<Page2 />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
      {/* </div> */}
    </>
  );
}
