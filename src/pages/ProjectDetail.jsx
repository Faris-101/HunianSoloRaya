import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PROJECTS, PROJECT_GRADIENTS } from "../data/index";
import WAButtons from "../components/WAButtons";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.slug === slug);
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!project)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-5">
        <h2 className="font-serif text-3xl font-light">Proyek tidak ditemukan</h2>
        <button onClick={() => navigate("/")} className="btn-primary">← Kembali</button>
      </div>
    );

  const specLabels = { jumlah_unit: "Jumlah Unit", tipe_unit: "Tipe Unit", sertifikat: "Sertifikat" };
  const unitGrad = {
    "1-lantai": "linear-gradient(135deg,#0f1a12 0%,#162110 40%,#0d1a0e 100%)",
    mezanin:    "linear-gradient(135deg,#0e1320 0%,#111e30 40%,#0a1020 100%)",
    "2-lantai": "linear-gradient(135deg,#1a1208 0%,#2a1e0a 40%,#1c140a 100%)",
  };
  const floorLabel = { "1-lantai": "1 Lantai", mezanin: "Mezanin", "2-lantai": "2 Lantai" };

  return (
    <div className="bg-cream min-h-screen">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-cream/95 backdrop-blur-xl border-b border-[rgba(26,24,20,0.1)] md:px-8 md:py-5 lg:px-16">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-transparent border-0 cursor-pointer text-[0.75rem] tracking-[0.1em] uppercase text-gray hover:text-dark transition-colors duration-200"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Kembali
        </button>
        <a href="/" className="font-serif text-[1.3rem] font-medium tracking-[0.04em] text-dark no-underline md:text-[1.5rem]">
          Hunian<span className="text-gold">SoloRaya</span>
        </a>
        <a href="/#booking" className="px-4 py-2 bg-dark text-cream text-[0.68rem] tracking-[0.08em] uppercase no-underline hover:bg-gold transition-colors duration-200 md:px-5 md:py-3 md:text-[0.75rem]">
          Booking
        </a>
      </nav>

      {/* HERO FOTO */}
      <div className="pt-[61px] md:pt-[66px] bg-dark">
        <div
          className="relative w-full bg-dark flex items-center justify-center cursor-zoom-in"
          style={{ height: "clamp(220px, 55vw, 60vh)" }}
          onClick={() => setLightbox(true)}
        >
          <img
            src={project.photos[activePhoto]}
            alt={project.name}
            className="max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-300"
          />
          <div className="absolute top-3 left-3 px-3 py-1.5 bg-dark/80 backdrop-blur-sm text-[0.65rem] tracking-[0.12em] uppercase text-gold md:top-5 md:left-5 md:px-4 md:py-2 md:text-[0.7rem]">
            ● {project.statusLabel}
          </div>
          <div className="absolute bottom-3 right-3 text-[0.6rem] tracking-[0.1em] uppercase text-white/30 md:bottom-4 md:right-4">
            Klik untuk perbesar
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-px bg-[#0a0908]">
          {project.photos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setActivePhoto(i)}
              className={`relative overflow-hidden cursor-pointer transition-all duration-200 h-16 md:h-24 ${activePhoto === i ? "ring-2 ring-gold" : "hover:brightness-110"}`}
            >
              <img src={photo} alt="" className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-black transition-opacity duration-200 ${activePhoto === i ? "opacity-0" : "opacity-50"}`} />
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center cursor-zoom-out" onClick={() => setLightbox(false)}>
          <img src={project.photos[activePhoto]} alt={project.name} className="max-w-[95vw] max-h-[95vh] object-contain" onClick={e => e.stopPropagation()} />
          <button onClick={() => setLightbox(false)} className="absolute top-4 right-4 text-white/60 hover:text-white text-[1.5rem] bg-transparent border-0 cursor-pointer leading-none">✕</button>
          {project.photos.length > 1 && (
            <>
              <button onClick={e => { e.stopPropagation(); setActivePhoto(i => (i-1+project.photos.length)%project.photos.length); }} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-[2.5rem] bg-transparent border-0 cursor-pointer leading-none">‹</button>
              <button onClick={e => { e.stopPropagation(); setActivePhoto(i => (i+1)%project.photos.length); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-[2.5rem] bg-transparent border-0 cursor-pointer leading-none">›</button>
            </>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-[0.75rem] tracking-[0.1em]">{activePhoto+1} / {project.photos.length}</div>
        </div>
      )}

      {/* KONTEN */}
      <div className="px-5 py-8 max-w-[900px] mx-auto md:px-8 md:py-12 lg:px-16 lg:py-16 flex flex-col gap-10 md:gap-14">

        {/* Judul + WA (mobile) */}
        <div>
          <div className="section-tag">{project.location}</div>
          <h1 className="font-serif text-[clamp(1.8rem,5vw,3.5rem)] font-light leading-[1.1] mb-2">{project.name}</h1>
          <p className="text-gray text-[0.9rem] mb-5">{project.tagline}</p>
          {/* Harga + WA — mobile sticky card replacement */}
          <div className="flex items-center justify-between gap-4 py-4 border-y border-[rgba(26,24,20,0.08)] md:hidden">
            <div>
              <div className="text-[0.65rem] tracking-[0.1em] uppercase text-gray mb-0.5">{project.statusLabel}</div>
              <div className="font-serif text-[1.3rem] text-gold">{project.price}</div>
            </div>
            <WAButtons message={`Halo, saya tertarik dengan ${project.name}. Boleh info lebih lanjut?`} size="sm" />
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <h3 className="text-[0.7rem] tracking-[0.18em] uppercase text-gray mb-4 pb-3 border-b border-[rgba(26,24,20,0.08)]">Tentang Proyek</h3>
          <p className="text-[0.9rem] text-gray leading-[1.8]">{project.description}</p>
        </div>

        {/* Spesifikasi */}
        <div>
          <h3 className="text-[0.7rem] tracking-[0.18em] uppercase text-gray mb-4 pb-3 border-b border-[rgba(26,24,20,0.08)]">Spesifikasi Kawasan</h3>
          <div className="grid grid-cols-3 gap-px bg-[rgba(26,24,20,0.08)]">
            {["jumlah_unit","tipe_unit","sertifikat"].map(key => (
              <div key={key} className="bg-cream py-4 px-3 md:py-5 md:px-4">
                <div className="text-[0.6rem] tracking-[0.1em] uppercase text-gray mb-1.5 md:text-[0.65rem]">{specLabels[key]}</div>
                <div className="font-serif text-[0.95rem] font-light text-dark md:text-[1.1rem]">{project.specs[key]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fasilitas */}
        <div>
          <h3 className="text-[0.7rem] tracking-[0.18em] uppercase text-gray mb-4 pb-3 border-b border-[rgba(26,24,20,0.08)]">Fasilitas Kawasan</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {project.facilities.map((f, i) => (
              <div key={i} className="flex items-start gap-3 text-[0.88rem] text-dark py-1">
                <span className="text-gold text-[0.5rem] mt-1.5 flex-shrink-0">✦</span>{f}
              </div>
            ))}
          </div>
        </div>

        {/* Tipe & Harga Unit */}
        <div>
          <h3 className="text-[0.7rem] tracking-[0.18em] uppercase text-gray mb-4 pb-3 border-b border-[rgba(26,24,20,0.08)]">Tipe & Harga Unit</h3>
          <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
            {project.units_detail.map((u, i) => (
              <div key={i} className="relative overflow-hidden p-6 text-white border border-gold/10 hover:border-gold/35 transition-colors duration-300 group md:p-8"
                style={{ background: unitGrad[u.floor_type] || unitGrad["2-lantai"] }}>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="flex items-center gap-2 text-[0.6rem] tracking-[0.18em] uppercase text-gold/70 mb-2">
                  <span className="block w-4 h-px bg-gold/50" />{floorLabel[u.floor_type] || u.floor_type}
                </div>
                <div className="font-serif text-[1.2rem] font-light text-[#f5f0e8] mb-2">{u.name}</div>
                <div className="flex gap-3 text-[0.72rem] text-white/35 mb-4">
                  <span>📐 {u.size} m²</span>
                  {u.beds>0 && <span>🛏 {u.beds} KT</span>}
                  {u.baths>0 && <span>🚿 {u.baths} KM</span>}
                </div>
                <div className="font-serif text-[1.1rem] text-gold-light pt-3 border-t border-gold/15">
                  <small className="font-sans text-[0.62rem] text-white/28 block mb-1 tracking-[0.08em] uppercase">Mulai dari</small>
                  {u.price}
                </div>
                <a href="/#booking" className="inline-block mt-4 text-[0.65rem] tracking-[0.12em] uppercase text-gold no-underline hover:opacity-70 transition-opacity duration-200">
                  Tanyakan Unit Ini →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* WA Buttons — desktop */}
        <div className="hidden md:block py-6 border-y border-[rgba(26,24,20,0.08)]">
          <p className="text-[0.65rem] tracking-[0.14em] uppercase text-gray mb-5">Chat Langsung via WhatsApp</p>
          <WAButtons message={`Halo, saya tertarik dengan ${project.name}. Boleh info lebih lanjut?`} size="md" theme="light" />
        </div>

        {/* Lokasi */}
        <div>
          <h3 className="text-[0.7rem] tracking-[0.18em] uppercase text-gray mb-4 pb-3 border-b border-[rgba(26,24,20,0.08)]">Lokasi</h3>
          <div className="flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-8">
            <div className="relative bg-dark overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#2a2520] to-[#1a1814]">
                <div className="w-10 h-10 bg-gold" style={{ clipPath: "polygon(50% 100%,0 40%,20% 0,80% 0,100% 40%)" }} />
                <p className="text-white/40 text-[0.78rem] tracking-[0.08em] text-center px-5">{project.address}</p>
              </div>
              <button
                onClick={() => window.open(project.maps_url, "_blank")}
                className="absolute bottom-4 right-4 px-4 py-2 bg-gold text-dark text-[0.7rem] tracking-[0.1em] uppercase cursor-pointer border-0 font-sans font-medium hover:opacity-85 transition-opacity duration-200"
              >
                Buka Maps ↗
              </button>
            </div>
            <div>
              <div className="text-[0.7rem] tracking-[0.15em] uppercase text-gray mb-3">Akses Terdekat</div>
              {project.nearby.map((n, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-[rgba(26,24,20,0.06)] text-[0.88rem]">
                  <span className="text-gold flex-shrink-0">📍</span>{n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HUNIAN LAINNYA */}
      <div className="px-5 py-12 bg-[#f0ede6] md:px-8 lg:px-16 lg:py-20">
        <div className="section-tag">Hunian Lainnya</div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light mb-8">
          Temukan Hunian <em className="italic text-gold">Impian Anda</em>
        </h2>
        <div className="grid grid-cols-2 gap-px sm:grid-cols-3">
          {PROJECTS.filter(p => p.slug !== slug).slice(0, 3).map((p, i) => (
            <div key={p.id} onClick={() => { navigate(`/proyek/${p.slug}`); window.scrollTo(0, 0); }}
              className="relative aspect-[3/4] overflow-hidden cursor-pointer group">
              <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.04]"
                style={{ background: PROJECT_GRADIENTS[i % PROJECT_GRADIENTS.length] }}>
                {p.thumbnail && <img src={p.thumbnail} alt={p.name} className="absolute inset-0 w-full h-full object-cover opacity-60" />}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 project-overlay text-white md:p-6">
                <div className="text-[0.6rem] tracking-[0.12em] uppercase text-gold mb-1">● {p.statusLabel}</div>
                <div className="font-serif text-[1rem] mb-0.5 md:text-[1.2rem]">{p.name}</div>
                <div className="text-[0.72rem] text-white/55 hidden sm:block">{p.location}</div>
                <div className="font-serif text-[0.85rem] text-gold/80 mt-1">{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
