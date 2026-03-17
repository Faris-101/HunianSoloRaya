import { useParams, useNavigate } from "react-router-dom";
import { UNIT_TYPES, PROJECTS } from "../data/index";
import WAButtons from "../components/WAButtons";

function goToBooking(navigate) {
  navigate("/");
  setTimeout(() => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }, 300);
}

const UNIT_COUNT = { "1-lantai": 15, mezanin: 10, "2-lantai": 112 };
const UNIT_PRICE = { "1-lantai": "Rp 295 Juta", mezanin: "Rp 350 Juta", "2-lantai": "Rp 450 Juta" };
const GRAD_MAP = {
  "1-lantai": "linear-gradient(135deg,#1a1510 0%,#2a1e0c 45%,#1c1509 100%)",
  mezanin:    "linear-gradient(135deg,#0d1318 0%,#0e1d2a 45%,#091018 100%)",
  "2-lantai": "linear-gradient(135deg,#12100e 0%,#1e1608 45%,#160f06 100%)",
};
const POINTS = {
  "1-lantai": [
    "Aksesibilitas penuh — ideal untuk keluarga & lansia",
    "Perawatan mudah, efisien, & hemat biaya jangka panjang",
    "Harga mulai Rp 295 Juta dengan legalitas SHM terjamin",
  ],
  mezanin: [
    "Desain split-level eksklusif — ruang terasa lebih luas",
    "Area mezanin fleksibel: ruang kerja, baca, atau kamar tambahan",
    "Harga mulai Rp 350 Juta, tersedia Cash & KPR",
  ],
  "2-lantai": [
    "Dua zona terpisah — area publik & privat optimal",
    "Ruang keluarga lapang, cocok untuk hunian jangka panjang",
    "Harga mulai Rp 450 Juta — investasi properti bernilai tinggi",
  ],
};

export default function UnitTypeDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const unitType = UNIT_TYPES.find((u) => u.slug === slug);

  if (!unitType)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-5">
        <h2 className="font-serif text-3xl font-light">Tipe unit tidak ditemukan</h2>
        <button onClick={() => navigate("/")} className="btn-primary">← Kembali</button>
      </div>
    );

  const semuaUnit = [];
  PROJECTS.forEach((project) => {
    project.units_detail.filter((u) => u.floor_type === slug).forEach((u) =>
      semuaUnit.push({ ...u, projectName: project.name, projectSlug: project.slug, projectLocation: project.location })
    );
  });

  const lokasiCount = PROJECTS.filter((p) => p.units_detail.some((u) => u.floor_type === slug)).length;

  return (
    <div className="bg-cream min-h-screen">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-cream/95 backdrop-blur-xl border-b border-[rgba(26,24,20,0.1)] md:px-8 md:py-5 lg:px-16">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-transparent border-0 cursor-pointer text-[0.75rem] tracking-[0.1em] uppercase text-gray hover:text-gold transition-colors duration-200"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Kembali
        </button>
        <a href="/" className="font-serif text-[1.3rem] font-medium tracking-[0.04em] text-dark no-underline md:text-[1.5rem]">
          Hunian<span className="text-gold">SoloRaya</span>
        </a>
        <button
          onClick={() => goToBooking(navigate)}
          className="px-4 py-2 bg-dark text-cream text-[0.68rem] tracking-[0.08em] uppercase border-0 cursor-pointer hover:bg-gold transition-colors duration-200 md:px-5 md:py-3 md:text-[0.75rem]"
        >
          Booking
        </button>
      </nav>

      {/* HERO */}
      <div
        className="relative pt-[61px] md:pt-[66px] min-h-[50vh] md:min-h-[55vh] flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0f0d0a 0%,#1a1510 30%,#1e1a0f 55%,#16120c 75%,#0c0a08 100%)" }}
      >
        {/* Foto samar — hidden di mobile kecil */}
        <div className="absolute right-[-2%] bottom-0 w-[45%] h-full hidden sm:block bg-[url('/assets/foto-1.PNG')] bg-center bg-cover pointer-events-none utd-photo-mask" />

        {/* Orb gold */}
        <div className="absolute top-[-180px] left-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(201,169,110,0.12) 0%,transparent 70%)", filter: "blur(80px)" }} />

        {/* Konten */}
        <div className="relative z-10 px-5 py-12 max-w-[680px] md:px-8 md:py-16 lg:px-16 lg:py-20">
          <div className="flex items-center gap-3 text-[0.7rem] tracking-[0.22em] uppercase text-gold mb-4">
            <span className="block w-6 h-px bg-gold/70" />
            Tipe Unit Premium
          </div>

          <h1 className="font-serif text-[clamp(2.5rem,8vw,5.5rem)] font-light text-[#f5f0e8] leading-[1.0] mb-4 tracking-[-0.01em]">
            {unitType.label}
          </h1>

          <p className="text-[0.9rem] text-[rgba(245,240,232,0.5)] leading-[1.8] max-w-[480px] mb-6">
            {unitType.desc}
          </p>

          {/* Selling points */}
          <div className="flex flex-col gap-2.5 mb-8">
            {(POINTS[slug] || []).map((pt, i) => (
              <div key={i} className="flex items-start gap-3 text-[0.82rem] text-[rgba(245,240,232,0.6)]">
                <span className="text-gold text-[0.55rem] flex-shrink-0 mt-1">✦</span>
                {pt}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-5 pt-6 border-t border-[rgba(201,169,110,0.18)] sm:gap-8">
            {[
              { num: UNIT_COUNT[slug] ?? semuaUnit.length, label: "Unit Tersedia" },
              { num: lokasiCount, label: "Lokasi Hunian" },
              { num: "KPR", label: "& Cash Tersedia" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-5 sm:gap-8">
                {i > 0 && <div className="w-px h-8 bg-[rgba(201,169,110,0.2)]" />}
                <div>
                  <span className="font-serif text-[1.6rem] sm:text-[1.8rem] font-normal text-gold leading-[1] block">{s.num}</span>
                  <span className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.12em] uppercase text-[rgba(245,240,232,0.35)]">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DAFTAR UNIT */}
      <div className="px-5 py-12 max-w-[1400px] mx-auto md:px-8 md:py-16 lg:px-16 lg:py-20">
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light mb-8 text-dark">
          Semua Unit <em className="italic text-gold">{unitType.label}</em>
        </h2>

        {semuaUnit.length === 0 ? (
          <p className="text-gray text-[0.95rem]">Belum ada unit tersedia untuk tipe ini.</p>
        ) : (
          <div className="grid grid-cols-1 gap-px bg-[rgba(26,24,20,0.08)] sm:grid-cols-2 lg:grid-cols-3">
            {semuaUnit.map((u, i) => (
              <div key={i} className="bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] relative group md:p-8">
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                <div className="flex items-center gap-1.5 text-[0.65rem] tracking-[0.1em] uppercase text-gold mb-3 flex-wrap">
                  <span className="text-[0.5rem]">●</span>
                  {u.projectName}
                  <span className="text-gray text-[0.63rem] normal-case">{u.projectLocation}</span>
                </div>

                <div className="font-serif text-[1.3rem] font-normal mb-2 text-dark md:text-[1.4rem]">{u.name}</div>

                <div className="flex flex-wrap gap-2.5 text-[0.75rem] text-gray mb-4 pb-4 border-b border-[rgba(26,24,20,0.08)]">
                  {u.lt && <span>🏠 LT {u.lt} m²</span>}
                  {u.lb && <span>📐 LB {u.lb} m²</span>}
                  {u.beds > 0 && <span>🛏 {u.beds} KT</span>}
                  {u.baths > 0 && <span>🚿 {u.baths} KM</span>}
                </div>

                <div className="font-serif text-[1.2rem] text-dark mb-3 md:text-[1.35rem]">
                  <small className="font-sans text-[0.62rem] text-gray block mb-1 tracking-[0.08em] uppercase">Mulai dari</small>
                  {u.price}
                </div>

                {u.units && (
                  <div className="flex items-center gap-2 text-[0.72rem] text-gray mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] flex-shrink-0" />
                    {u.units} unit tersedia
                  </div>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => { navigate(`/proyek/${u.projectSlug}`); window.scrollTo(0, 0); }}
                    className="flex-1 py-2.5 px-3 bg-dark text-white text-[0.68rem] tracking-[0.08em] uppercase border-0 cursor-pointer transition-all duration-200 hover:bg-gold font-sans min-w-[100px]"
                  >
                    Lihat Hunian
                  </button>
                  <WAButtons message={`Halo, saya tertarik dengan ${u.name} di ${u.projectName}. Boleh info lebih lanjut?`} size="sm" theme="light" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TIPE LAINNYA */}
      <div className="px-5 py-12 bg-[#f0ede6] md:px-8 lg:px-16 lg:py-20">
        <div className="section-tag">Tipe Lainnya</div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light mb-8">
          Lihat Tipe Unit <em className="italic text-gold">Lainnya</em>
        </h2>

        <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
          {UNIT_TYPES.filter((u) => u.slug !== slug).map((u) => (
            <div
              key={u.slug}
              onClick={() => { navigate(`/tipe-unit/${u.slug}`); window.scrollTo(0, 0); }}
              className="relative overflow-hidden p-6 cursor-pointer border border-[rgba(201,169,110,0.1)] hover:border-[rgba(201,169,110,0.3)] hover:-translate-y-0.5 transition-all duration-300 group md:p-10"
              style={{ background: GRAD_MAP[u.slug] || "#111" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.5)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 mb-3">Tipe Unit</div>
              <div className="font-serif text-[1.8rem] font-light text-[#f5f0e8] mb-3 leading-[1] md:text-[2rem]">{u.label}</div>
              <p className="text-[0.82rem] text-[rgba(245,240,232,0.38)] leading-[1.7] mb-6 line-clamp-3">{u.desc}</p>
              <div className="text-[0.8rem] text-gold/60 mb-3">{UNIT_PRICE[u.slug]}</div>
              <div className="flex items-center justify-between pt-4 border-t border-[rgba(201,169,110,0.12)]">
                <span className="text-[0.65rem] tracking-[0.08em] uppercase text-[rgba(245,240,232,0.3)]">{UNIT_COUNT[u.slug] ?? 0} unit tersedia</span>
                <span className="text-[0.7rem] tracking-[0.1em] uppercase text-gold transition-[letter-spacing] duration-200 group-hover:tracking-[0.16em]">Lihat Semua →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
