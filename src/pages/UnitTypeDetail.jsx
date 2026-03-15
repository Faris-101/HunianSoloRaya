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
const UNIT_PRICE = {
  "1-lantai": "Rp 295 Juta",
  mezanin: "Rp 350 Juta",
  "2-lantai": "Rp 450 Juta",
};
const GRAD_MAP = {
  "1-lantai": "linear-gradient(135deg,#1a1510 0%,#2a1e0c 45%,#1c1509 100%)",
  mezanin: "linear-gradient(135deg,#0d1318 0%,#0e1d2a 45%,#091018 100%)",
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
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h2 className="font-serif text-3xl font-light">
          Tipe unit tidak ditemukan
        </h2>
        <button onClick={() => navigate("/")} className="btn-primary">
          ← Kembali
        </button>
      </div>
    );

  // Kumpulkan semua unit yang cocok
  const semuaUnit = [];
  PROJECTS.forEach((project) => {
    project.units_detail
      .filter((u) => u.floor_type === slug)
      .forEach((u) =>
        semuaUnit.push({
          ...u,
          projectName: project.name,
          projectSlug: project.slug,
          projectLocation: project.location,
        }),
      );
  });

  const lokasiCount = PROJECTS.filter((p) =>
    p.units_detail.some((u) => u.floor_type === slug),
  ).length;

  return (
    <div className="bg-cream min-h-screen">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-5 bg-cream/95 backdrop-blur-xl border-b border-[rgba(26,24,20,0.1)] max-md:px-5">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-transparent border-0 cursor-pointer text-[0.78rem] tracking-[0.1em] uppercase text-gray hover:text-gold transition-colors duration-200"
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
        <button
          onClick={() => goToBooking(navigate)}
          className="btn-primary text-[0.78rem] py-3 px-5"
        >
          Booking Sekarang
        </button>
      </nav>

      {/* HERO */}
      <div
        className="relative pt-20 min-h-[55vh] flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,#0f0d0a 0%,#1a1510 30%,#1e1a0f 55%,#16120c 75%,#0c0a08 100%)",
        }}
      >
        {/* Foto samar kanan */}
        <div className="absolute right-[-2%] bottom-0 w-[52%] h-full bg-[url('/assets/foto-1.PNG')] bg-center bg-cover pointer-events-none utd-photo-mask" />

        {/* Orb gold kiri */}
        <div
          className="absolute top-[-180px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(201,169,110,0.13) 0%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[-100px] left-[35%] w-[350px] h-[350px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(201,169,110,0.07) 0%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Garis tengah vertikal */}
        <div
          className="absolute top-0 bottom-0 left-[42%] w-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom,transparent,rgba(201,169,110,0.15) 40%,rgba(201,169,110,0.15) 60%,transparent)",
          }}
        />

        {/* Konten inner */}
        <div className="relative z-10 px-16 py-20 max-w-[680px] max-lg:px-8 max-md:px-5 max-md:py-14">
          <div className="flex items-center gap-3 text-[0.7rem] tracking-[0.25em] uppercase text-gold mb-5">
            <span className="block w-8 h-px bg-gold/70" />
            Tipe Unit Premium
          </div>

          <h1 className="font-serif text-[clamp(3rem,6vw,5.5rem)] font-light text-[#f5f0e8] leading-[1.0] mb-6 tracking-[-0.01em]">
            {unitType.label}
          </h1>

          <p className="text-[0.95rem] text-[rgba(245,240,232,0.5)] leading-[1.85] max-w-[520px] mb-8">
            {unitType.desc}
          </p>

          {/* Selling points */}
          <div className="flex flex-col gap-[0.65rem] mb-10">
            {(POINTS[slug] || []).map((pt, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-[0.82rem] text-[rgba(245,240,232,0.65)] tracking-[0.03em]"
              >
                <span className="text-gold text-[0.55rem] flex-shrink-0">
                  ✦
                </span>
                {pt}
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="flex items-center gap-8 pt-8 border-t border-[rgba(201,169,110,0.18)]">
            {[
              {
                num: UNIT_COUNT[slug] ?? semuaUnit.length,
                label: "Unit Tersedia",
              },
              { num: lokasiCount, label: "Lokasi Hunian" },
              { num: "KPR", label: "& Cash Tersedia" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-8">
                {i > 0 && (
                  <div className="w-px h-10 bg-[rgba(201,169,110,0.2)]" />
                )}
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-[1.8rem] font-normal text-gold leading-[1]">
                    {s.num}
                  </span>
                  <span className="text-[0.65rem] tracking-[0.12em] uppercase text-[rgba(245,240,232,0.35)]">
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DAFTAR UNIT */}
      <div className="px-16 py-20 max-w-[1400px] mx-auto max-lg:px-8 max-md:px-5">
        <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-light mb-10 text-dark">
          Semua Unit <em className="italic text-gold">{unitType.label}</em>
        </h2>

        {semuaUnit.length === 0 ? (
          <p className="text-gray text-[0.95rem]">
            Belum ada unit tersedia untuk tipe ini.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-px bg-[rgba(26,24,20,0.08)] max-lg:grid-cols-2 max-md:grid-cols-1">
            {semuaUnit.map((u, i) => (
              <div
                key={i}
                className="bg-white p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:z-10 relative group"
              >
                {/* Gold line bottom on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                {/* Asal hunian */}
                <div className="flex items-center gap-1.5 text-[0.68rem] tracking-[0.1em] uppercase text-gold mb-4 flex-wrap">
                  <span className="text-[0.5rem]">●</span>
                  {u.projectName}
                  <span className="text-gray text-[0.66rem] tracking-[0.06em] normal-case">
                    {u.projectLocation}
                  </span>
                </div>

                <div className="font-serif text-[1.4rem] font-normal mb-3 text-dark">
                  {u.name}
                </div>

                <div className="flex flex-wrap gap-3 text-[0.78rem] text-gray mb-5 pb-5 border-b border-[rgba(26,24,20,0.08)]">
                  {u.lt && <span>🏠 LT {u.lt} m²</span>}
                  {u.lb && <span>📐 LB {u.lb} m²</span>}
                  {u.beds > 0 && <span>🛏 {u.beds} KT</span>}
                  {u.baths > 0 && <span>🚿 {u.baths} KM</span>}
                </div>

                <div className="font-serif text-[1.35rem] text-dark mb-4">
                  <small className="font-sans text-[0.63rem] text-gray block mb-1 tracking-[0.08em] uppercase">
                    Mulai dari
                  </small>
                  {u.price}
                </div>

                {u.units && (
                  <div className="flex items-center gap-2 text-[0.72rem] text-gray mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] flex-shrink-0 shadow-[0_0_5px_rgba(37,211,102,0.5)]" />
                    {u.units} unit tersedia
                  </div>
                )}

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => {
                      navigate(`/proyek/${u.projectSlug}`);
                      window.scrollTo(0, 0);
                    }}
                    className="flex-1 py-3 px-4 bg-dark text-white text-[0.7rem] tracking-[0.1em] uppercase border-0 cursor-pointer transition-all duration-200 hover:bg-gold font-sans"
                  >
                    Lihat Hunian
                  </button>
                  <WAButtons
                    message={`Halo, saya tertarik dengan ${u.name} di ${u.projectName}. Boleh info lebih lanjut?`}
                    size="sm"
                    theme="light"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TIPE LAINNYA */}
      <div className="px-16 py-20 bg-[#f0ede6] max-lg:px-8 max-md:px-5">
        <div className="section-tag">Tipe Lainnya</div>
        <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-light mb-8">
          Lihat Tipe Unit <em className="italic text-gold">Lainnya</em>
        </h2>

        <div className="grid grid-cols-2 gap-px max-md:grid-cols-1">
          {UNIT_TYPES.filter((u) => u.slug !== slug).map((u) => (
            <div
              key={u.slug}
              onClick={() => {
                navigate(`/tipe-unit/${u.slug}`);
                window.scrollTo(0, 0);
              }}
              className="relative overflow-hidden p-10 cursor-pointer border border-[rgba(201,169,110,0.1)] hover:border-[rgba(201,169,110,0.3)] hover:-translate-y-1 transition-all duration-300 group max-md:p-6"
              style={{ background: GRAD_MAP[u.slug] || "#111" }}
            >
              {/* Gold line top on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.5)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              <div className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 mb-4">
                Tipe Unit
              </div>
              <div className="font-serif text-[2rem] font-light text-[#f5f0e8] mb-4 leading-[1]">
                {u.label}
              </div>
              <p className="text-[0.83rem] text-[rgba(245,240,232,0.38)] leading-[1.75] mb-8">
                {u.desc}
              </p>

              <div className="text-[0.8rem] text-gold/60 mb-4">
                {UNIT_PRICE[u.slug]}
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-[rgba(201,169,110,0.12)]">
                <span className="text-[0.68rem] tracking-[0.08em] uppercase text-[rgba(245,240,232,0.3)]">
                  {UNIT_COUNT[u.slug] ?? 0} unit tersedia
                </span>
                <span className="text-[0.7rem] tracking-[0.1em] uppercase text-gold transition-[letter-spacing] duration-200 group-hover:tracking-[0.16em]">
                  Lihat Semua →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
