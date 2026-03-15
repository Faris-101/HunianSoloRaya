import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PROJECTS, PROJECT_GRADIENTS } from "../data/index";
export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.slug === slug);
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!project)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h2 className="font-serif text-3xl font-light">
          Proyek tidak ditemukan
        </h2>
        <button onClick={() => navigate("/")} className="btn-primary">
          ← Kembali
        </button>
      </div>
    );

  const specLabels = {
    jumlah_unit: "Jumlah Unit",
    tipe_unit: "Tipe Unit",
    sertifikat: "Sertifikat",
  };
  const unitGrad = {
    "1-lantai": "linear-gradient(135deg,#0f1a12 0%,#162110 40%,#0d1a0e 100%)",
    mezanin: "linear-gradient(135deg,#0e1320 0%,#111e30 40%,#0a1020 100%)",
    "2-lantai": "linear-gradient(135deg,#1a1208 0%,#2a1e0a 40%,#1c140a 100%)",
  };
  const floorLabel = {
    "1-lantai": "1 Lantai",
    mezanin: "Mezanin",
    "2-lantai": "2 Lantai",
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-5 bg-cream/95 backdrop-blur-xl border-b border-[rgba(26,24,20,0.1)] max-md:px-5">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-transparent border-0 cursor-pointer text-[0.78rem] tracking-[0.1em] uppercase text-gray hover:text-dark transition-colors duration-200"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Kembali
        </button>
        <a
          href="/"
          className="font-serif text-[1.5rem] font-medium tracking-[0.05em] text-dark no-underline"
        >
          Hunian<span className="text-gold">SoloRaya</span>
        </a>
        <a href="/#booking" className="btn-primary text-[0.78rem] py-3 px-5">
          Booking Sekarang
        </a>
      </nav>

      {/* HERO FOTO */}
      <div className="pt-20 bg-dark">
        {/* Gambar utama — klik untuk lightbox */}
        <div
          className="relative w-full h-[60vh] bg-dark flex items-center justify-center cursor-zoom-in max-md:h-[50vw] max-md:min-h-[220px]"
          onClick={() => setLightbox(true)}
        >
          <img
            src={project.photos[activePhoto]}
            alt={project.name}
            className="max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-300"
          />
          <div className="absolute top-5 left-5 px-4 py-2 bg-dark/80 backdrop-blur-sm text-[0.7rem] tracking-[0.15em] uppercase text-gold">
            ● {project.statusLabel}
          </div>
          {/* hint klik */}
          <div className="absolute bottom-4 right-4 text-[0.65rem] tracking-[0.1em] uppercase text-white/30">
            Klik untuk perbesar
          </div>
        </div>

        {/* Thumbnails — gelap */}
        <div className="grid grid-cols-4 gap-px bg-[#0a0908]">
          {project.photos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setActivePhoto(i)}
              className={`relative h-24 overflow-hidden cursor-pointer transition-all duration-200 ${activePhoto === i ? "ring-2 ring-gold" : "hover:brightness-110"}`}
            >
              <img src={photo} alt="" className="w-full h-full object-cover" />
              {/* overlay gelap */}
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-200 ${activePhoto === i ? "opacity-0" : "opacity-50"}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center cursor-zoom-out"
          onClick={() => setLightbox(false)}
        >
          <img
            src={project.photos[activePhoto]}
            alt={project.name}
            className="max-w-[95vw] max-h-[95vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {/* Tombol close */}
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-5 right-5 text-white/60 hover:text-white text-[1.5rem] bg-transparent border-0 cursor-pointer leading-none"
          >
            ✕
          </button>
          {/* Nav prev/next */}
          {project.photos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhoto(
                    (i) =>
                      (i - 1 + project.photos.length) % project.photos.length,
                  );
                }}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-[2rem] bg-transparent border-0 cursor-pointer leading-none"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhoto((i) => (i + 1) % project.photos.length);
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-[2rem] bg-transparent border-0 cursor-pointer leading-none"
              >
                ›
              </button>
            </>
          )}
          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-[0.75rem] tracking-[0.1em]">
            {activePhoto + 1} / {project.photos.length}
          </div>
        </div>
      )}

      {/* KONTEN */}
      <div className="flex gap-12 px-16 py-12 max-w-[1400px] mx-auto max-lg:px-8 max-md:px-5 max-md:flex-col">
        {/* KIRI */}
        <div className="flex-1 min-w-0 flex flex-col gap-12">
          {/* Judul */}
          <div>
            <div className="section-tag">{project.location}</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.1] mb-3">
              {project.name}
            </h1>
            <p className="text-gray text-base">{project.tagline}</p>
          </div>

          {/* Deskripsi */}
          <div>
            <h3 className="text-[0.72rem] tracking-[0.18em] uppercase text-gray mb-4 pb-3 border-b border-[rgba(26,24,20,0.08)]">
              Tentang Proyek
            </h3>
            <p className="text-[0.92rem] text-gray leading-[1.8]">
              {project.description}
            </p>
          </div>

          {/* Spesifikasi */}
          <div>
            <h3 className="text-[0.72rem] tracking-[0.18em] uppercase text-gray mb-4 pb-3 border-b border-[rgba(26,24,20,0.08)]">
              Spesifikasi Kawasan
            </h3>
            <div className="grid grid-cols-3 gap-px bg-[rgba(26,24,20,0.08)] max-md:grid-cols-2">
              {["jumlah_unit", "tipe_unit", "sertifikat"].map((key) => (
                <div key={key} className="bg-cream py-5 px-4">
                  <div className="text-[0.65rem] tracking-[0.12em] uppercase text-gray mb-2">
                    {specLabels[key]}
                  </div>
                  <div className="font-serif text-[1.1rem] font-light text-dark">
                    {project.specs[key]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fasilitas */}
          <div>
            <h3 className="text-[0.72rem] tracking-[0.18em] uppercase text-gray mb-4 pb-3 border-b border-[rgba(26,24,20,0.08)]">
              Fasilitas Kawasan
            </h3>
            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              {project.facilities.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-[0.88rem] text-dark py-1"
                >
                  <span className="text-gold text-[0.5rem] mt-1.5 flex-shrink-0">
                    ✦
                  </span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Tipe & Harga Unit */}
          <div>
            <h3 className="text-[0.72rem] tracking-[0.18em] uppercase text-gray mb-4 pb-3 border-b border-[rgba(26,24,20,0.08)]">
              Tipe & Harga Unit
            </h3>
            <div className="grid grid-cols-2 gap-px max-md:grid-cols-1">
              {project.units_detail.map((u, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden p-8 text-white border border-gold/10 hover:border-gold/35 transition-colors duration-300 group"
                  style={{
                    background: unitGrad[u.floor_type] || unitGrad["2-lantai"],
                  }}
                >
                  {/* Gold line bottom on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="flex items-center gap-2 text-[0.6rem] tracking-[0.18em] uppercase text-gold/70 mb-3">
                    <span className="block w-5 h-px bg-gold/50" />
                    {floorLabel[u.floor_type] || u.floor_type}
                  </div>
                  <div className="font-serif text-[1.3rem] font-light text-[#f5f0e8] mb-2">
                    {u.name}
                  </div>
                  <div className="flex gap-4 text-[0.73rem] text-white/35 mb-4">
                    <span>📐 {u.size} m²</span>
                    {u.beds > 0 && <span>🛏 {u.beds} KT</span>}
                    {u.baths > 0 && <span>🚿 {u.baths} KM</span>}
                  </div>
                  <div className="font-serif text-[1.2rem] text-gold-light pt-3 border-t border-gold/15">
                    <small className="font-sans text-[0.63rem] text-white/28 block mb-1 tracking-[0.08em] uppercase">
                      Mulai dari
                    </small>
                    {u.price}
                  </div>
                  <a
                    href="/#booking"
                    className="inline-block mt-4 text-[0.68rem] tracking-[0.12em] uppercase text-gold no-underline hover:opacity-70 transition-opacity duration-200"
                  >
                    Tanyakan Unit Ini →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Lokasi */}
          <div>
            <h3 className="text-[0.72rem] tracking-[0.18em] uppercase text-gray mb-4 pb-3 border-b border-[rgba(26,24,20,0.08)]">
              Lokasi
            </h3>
            <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
              <div className="relative bg-dark aspect-[4/3] overflow-hidden">
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#2a2520] to-[#1a1814]">
                  <div
                    className="w-12 h-12 bg-gold"
                    style={{
                      clipPath: "polygon(50% 100%,0 40%,20% 0,80% 0,100% 40%)",
                    }}
                  />
                  <p className="text-white/40 text-[0.8rem] tracking-[0.1em] text-center px-6">
                    {project.address}
                  </p>
                </div>
                <button
                  onClick={() => window.open(project.maps_url, "_blank")}
                  className="absolute bottom-4 right-4 px-5 py-2 bg-gold text-dark text-[0.72rem] tracking-[0.1em] uppercase cursor-pointer border-0 font-sans font-medium hover:opacity-85 transition-opacity duration-200"
                >
                  Buka Maps ↗
                </button>
              </div>
              <div>
                <div className="text-[0.7rem] tracking-[0.15em] uppercase text-gray mb-4">
                  Akses Terdekat
                </div>
                {project.nearby.map((n, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-3 border-b border-[rgba(26,24,20,0.06)] text-[0.88rem]"
                  >
                    <span className="text-gold text-sm flex-shrink-0">📍</span>
                    {n}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING CARD */}
        <div className="hidden" />
      </div>

      {/* PROYEK LAINNYA */}
      <div className="px-16 py-20 bg-[#f0ede6] max-lg:px-8 max-md:px-5">
        <div className="section-tag">Proyek Lainnya</div>
        <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-light mb-8">
          Temukan Hunian <em className="italic text-gold">Impian Anda</em>
        </h2>
        <div className="grid grid-cols-3 gap-px max-lg:grid-cols-2 max-md:grid-cols-1">
          {PROJECTS.filter((p) => p.slug !== slug)
            .slice(0, 3)
            .map((p, i) => (
              <div
                key={p.id}
                onClick={() => {
                  navigate(`/proyek/${p.slug}`);
                  window.scrollTo(0, 0);
                }}
                className="relative aspect-[3/4] overflow-hidden cursor-pointer group"
              >
                <div
                  className="w-full h-full transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{
                    background: PROJECT_GRADIENTS[i % PROJECT_GRADIENTS.length],
                  }}
                >
                  {p.thumbnail && (
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 project-overlay text-white">
                  <div className="text-[0.65rem] tracking-[0.15em] uppercase text-gold mb-1">
                    ● {p.statusLabel}
                  </div>
                  <div className="font-serif text-[1.2rem] mb-1">{p.name}</div>
                  <div className="text-[0.75rem] text-white/55">
                    {p.location}
                  </div>
                  <div className="font-serif text-[0.95rem] text-gold/80 mt-1">
                    {p.price}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
