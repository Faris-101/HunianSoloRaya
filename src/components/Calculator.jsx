import { useState, useEffect } from "react";
import { TENOR_OPTIONS } from "../data/index";
import { formatRp } from "../utils/formatRp";

const SKEMA = [
  { key: "cash-keras", label: "Cash Keras", icon: "⚡" },
  { key: "cash-bertahap", label: "Cash Bertahap", icon: "📅" },
  { key: "kpr", label: "KPR", icon: "🏦" },
];
const KPR_JENIS = [
  { key: "syariah", label: "Syariah (Murabahah)" },
  { key: "konvensional", label: "Konvensional" },
];

export default function Calculator() {
  const [skema, setSkema] = useState("cash-keras");
  const [harga, setHarga] = useState(650000000);
  const [dpPersen, setDpPersen] = useState(80);
  const [tenor, setTenor] = useState(15);
  const [rate, setRate] = useState(9);
  const [kprJenis, setKprJenis] = useState("syariah");
  const [result, setResult] = useState(null);

  useEffect(() => {
    hitung();
  }, [skema, harga, dpPersen, tenor, rate, kprJenis]);

  function hitung() {
    const dpNominal = (harga * dpPersen) / 100;
    const sisaBayar = harga - dpNominal;
    if (skema === "cash-keras" || skema === "cash-bertahap") {
      setResult({
        harga,
        dpNominal,
        dpPersen,
        sisaBayar,
        highlightValue: sisaBayar / 12,
        highlight:
          skema === "cash-keras" ? "Cicilan / Bulan" : "Angsuran / Bulan",
        keterangan: "Sisa pembayaran dicicil 12 bulan tanpa bunga",
      });
    } else {
      const n = tenor * 12;
      let cicilan, totalBayar, totalMargin;
      if (kprJenis === "syariah") {
        const marginTotal = sisaBayar * (rate / 100) * tenor;
        const hargaJual = sisaBayar + marginTotal;
        cicilan = hargaJual / n;
        totalBayar = dpNominal + hargaJual;
        totalMargin = marginTotal;
      } else {
        const bm = rate / 100 / 12;
        cicilan =
          bm > 0
            ? (sisaBayar * bm * Math.pow(1 + bm, n)) / (Math.pow(1 + bm, n) - 1)
            : sisaBayar / n;
        totalBayar = dpNominal + cicilan * n;
        totalMargin = cicilan * n - sisaBayar;
      }
      setResult({
        harga,
        dpNominal,
        dpPersen,
        sisaBayar,
        totalBayar,
        totalMargin,
        highlightValue: cicilan,
        highlight: "Cicilan / Bulan",
        keterangan:
          kprJenis === "syariah"
            ? `Murabahah — margin flat ${rate}%/thn`
            : `Anuitas — bunga ${rate}%/thn`,
      });
    }
  }

  const dpMin =
    skema === "cash-keras" ? 80 : skema === "cash-bertahap" ? 40 : 10;
  function handleSkema(key) {
    setSkema(key);
    setDpPersen(key === "cash-keras" ? 80 : key === "cash-bertahap" ? 40 : 20);
  }

  const inputCls =
    "w-full px-4 py-3 bg-white border border-[rgba(26,24,20,0.1)] font-sans text-[0.88rem] text-dark outline-none focus:border-gold transition-colors duration-200 appearance-none";
  const labelCls =
    "block text-[0.72rem] tracking-[0.12em] uppercase text-gray mb-2";

  return (
    <section
      id="simulasi"
      className="px-5 py-14 bg-[#f0ede6] md:px-8 md:py-20 lg:px-16 lg:py-24"
    >
      <div className="section-tag">Simulasi Pembayaran</div>
      <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.2] mb-3">
        Hitung Simulasi
        <br />
        <em className="italic text-gold">Pembayaran Anda</em>
      </h2>
      <p className="text-gray text-[0.88rem] leading-[1.7] max-w-[500px] mb-8">
        Pilih skema pembayaran yang sesuai dengan kemampuan Anda.
      </p>

      {/* Mobile: dropdown */}
      <div className="sm:hidden mb-4">
        <label className={labelCls}>Pilihan Pembayaran</label>
        <div className="relative">
          <select
            value={skema}
            onChange={(e) => handleSkema(e.target.value)}
            className="w-full px-4 py-3.5 bg-dark text-gold border border-gold/30 font-sans text-[0.9rem] outline-none appearance-none cursor-pointer pr-10"
          >
            {SKEMA.map((s) => (
              <option key={s.key} value={s.key} className="bg-dark text-gold">
                {s.icon} {s.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Desktop: tabs */}
      <div className="hidden sm:flex border border-[rgba(26,24,20,0.1)] w-fit mb-4">
        {SKEMA.map((s) => (
          <button
            key={s.key}
            onClick={() => handleSkema(s.key)}
            className={`flex items-center gap-2 px-8 py-[0.85rem] border-r border-[rgba(26,24,20,0.1)] last:border-r-0 font-sans text-[0.8rem] tracking-[0.08em] uppercase cursor-pointer transition-all duration-200 whitespace-nowrap ${skema === s.key ? "bg-dark text-gold" : "bg-white text-gray hover:bg-cream hover:text-dark"}`}
          >
            <span>{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>

      {/* Deskripsi skema */}
      <p className="text-[0.83rem] text-gray leading-[1.7] mb-8">
        {skema === "cash-keras" && (
          <>
            <strong className="text-dark">Cash Keras</strong> — DP minimum 80%,
            sisa dicicil <strong className="text-dark">12 bulan</strong> tanpa
            bunga.
          </>
        )}
        {skema === "cash-bertahap" && (
          <>
            <strong className="text-dark">Cash Bertahap</strong> — DP minimum
            40%, sisa diangsur <strong className="text-dark">12 bulan</strong>{" "}
            tanpa bunga.
          </>
        )}
        {skema === "kpr" && (
          <>
            <strong className="text-dark">KPR</strong> — Pembiayaan bank,
            pilihan <strong className="text-dark">Syariah</strong> atau{" "}
            <strong className="text-dark">Konvensional</strong>. Tenor hingga 30
            tahun.
          </>
        )}
      </p>

      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:items-start">
        {/* Form */}
        <div className="flex flex-col gap-5">
          <div>
            <label className={labelCls}>Harga Properti (Rp)</label>
            <input
              className={inputCls}
              type="number"
              value={harga}
              onChange={(e) => setHarga(parseFloat(e.target.value) || 0)}
            />
            <div className="text-[0.72rem] text-gray mt-1">
              {formatRp(harga)}
            </div>
          </div>

          <div>
            <label className={labelCls}>
              {skema === "cash-keras"
                ? "Uang Muka (min. 80%)"
                : skema === "cash-bertahap"
                  ? "Uang Muka (min. 40%)"
                  : "Uang Muka / DP (%)"}
            </label>
            <input
              className={inputCls}
              type="number"
              value={dpPersen}
              min={dpMin}
              max={99}
              onChange={(e) =>
                setDpPersen(
                  Math.max(
                    dpMin,
                    Math.min(99, parseFloat(e.target.value) || 0),
                  ),
                )
              }
            />
            <div className="text-[0.72rem] text-gray mt-1">
              {formatRp((harga * dpPersen) / 100)} ({dpPersen}%)
              {dpPersen < dpMin && (
                <span className="text-amber-700 font-medium">
                  {" "}
                  ⚠ Minimum {dpMin}%
                </span>
              )}
            </div>
          </div>

          {skema === "kpr" && (
            <>
              <div>
                <label className={labelCls}>Jenis Pembiayaan</label>
                <div className="flex border border-[rgba(26,24,20,0.1)]">
                  {KPR_JENIS.map((j) => (
                    <button
                      key={j.key}
                      onClick={() => setKprJenis(j.key)}
                      className={`flex-1 py-3 px-3 border-r last:border-r-0 border-[rgba(26,24,20,0.1)] font-sans text-[0.78rem] text-gray cursor-pointer transition-all duration-200 ${kprJenis === j.key ? "bg-dark text-gold" : "bg-white hover:bg-cream"}`}
                    >
                      {j.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Tenor (Tahun)</label>
                  <select
                    className={inputCls}
                    value={tenor}
                    onChange={(e) => setTenor(parseFloat(e.target.value))}
                  >
                    {TENOR_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t} Tahun
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>
                    {kprJenis === "syariah"
                      ? "Margin (%/thn)"
                      : "Bunga (%/thn)"}
                  </label>
                  <input
                    className={inputCls}
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </>
          )}

          <p className="text-[0.8rem] text-gray leading-[1.6]">
            * Simulasi bersifat estimasi. Harga aktual dapat berbeda.
          </p>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-dark text-white p-6 md:p-10 lg:sticky lg:top-28">
            <div className="text-[0.72rem] tracking-[0.15em] uppercase text-gold mb-6">
              Hasil Simulasi —{" "}
              {skema === "cash-keras"
                ? "Cash Keras"
                : skema === "cash-bertahap"
                  ? "Cash Bertahap"
                  : kprJenis === "syariah"
                    ? "KPR Syariah"
                    : "KPR Konvensional"}
            </div>
            {[
              ["Harga Properti", formatRp(result.harga)],
              [`Uang Muka (${result.dpPersen}%)`, formatRp(result.dpNominal)],
              ["Sisa yang Dibiayai", formatRp(result.sisaBayar)],
              ...(skema === "kpr" && result.totalMargin !== undefined
                ? [
                    [
                      kprJenis === "syariah"
                        ? "Total Margin Bank"
                        : "Total Bunga",
                      formatRp(result.totalMargin),
                    ],
                  ]
                : []),
              ...(skema === "kpr"
                ? [["Total Keseluruhan", formatRp(result.totalBayar)]]
                : []),
            ].map(([label, val]) => (
              <div
                key={label}
                className="py-3 border-b border-white/8 last:border-0 flex justify-between items-baseline gap-4 md:block md:py-4"
              >
                <div className="text-[0.75rem] text-white/40 mb-0 md:mb-1 flex-shrink-0">
                  {label}
                </div>
                <div className="font-serif text-[1.2rem] text-white md:text-[1.5rem]">
                  {val}
                </div>
              </div>
            ))}
            <div className="mt-5 p-5 bg-gold/15 border border-gold/30">
              <div className="text-[0.75rem] text-gold mb-1">
                {result.highlight}
              </div>
              <div className="font-serif text-[1.8rem] text-gold md:text-[2rem]">
                {formatRp(result.highlightValue)}
              </div>
              <div className="text-[0.75rem] text-gold/70 mt-1">
                {skema === "kpr"
                  ? `selama ${tenor} tahun (${tenor * 12} bulan)`
                  : "selama 12 bulan"}
              </div>
            </div>
            <p className="text-[0.72rem] text-white/35 mt-4 leading-[1.6] italic">
              {result.keterangan}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
