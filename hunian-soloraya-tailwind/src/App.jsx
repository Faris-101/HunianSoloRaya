import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import ProjectDetail from "./pages/ProjectDetail";
import UnitTypeDetail from "./pages/UnitTypeDetail";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Units from "./components/Units";
import Calculator from "./components/Calculator";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

// ─── HALAMAN UTAMA ────────────────────────────────────────────────────────────
function HomePage() {
  const [toastShow, setToastShow] = useState(false);

  const handleSubmit = () => {
    setToastShow(true);
    setTimeout(() => setToastShow(false), 3500);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Units />
      <Calculator />
      <Booking onSubmit={handleSubmit} />
      <Footer />
      <Toast show={toastShow} />
    </>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/proyek/:slug" element={<ProjectDetail />} />
        <Route path="/tipe-unit/:slug" element={<UnitTypeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
