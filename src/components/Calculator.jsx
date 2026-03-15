import { useState, useEffect } from "react";
import { TENOR_OPTIONS } from "../data/index";
import { formatRp } from "../utils/formatRp";

const SKEMA = [
  { key: "cash-keras",    label: "Cash Keras",    icon: "⚡" },
  { key: "cash-bertahap", label: "Cash Bertahap", icon: "📅" },
  { key: "kpr",           label: "KPR",           icon: "🏦" },
];
const KPR_JENIS = [
  { key: "syariah",       label: "Syariah (Murabahah)" },
  { key: "konvensional",  label: "Konvensional" },
];

export default function Calculator() {
  const [skema, setSkema]       = useState("cash-keras");
  const [harga, setHarga]       = useState(650000000);
  const [dpPersen, setDpPersen] = useState(80);
  const [tenor, setTenor]       = useState(15);
  const [rate, setRate]         = useState(9);
  const [kprJenis, setKprJenis] = useState("syariah");
  const [result, setResult]     = useState(null);

  useEffect(() => { hitung(); }, [skema, harga, dpPersen, tenor, rate, kprJenis]);

  function hitung() {
    const dpNominal = (harga * dpPersen) / 100;
    const sisaBayar = harga - dpNominal;
    if (skema === "cash-keras" || skema === "cash-bertahap") {
      setResult({ harga, dpNominal, dpPersen, sisaBayar, highlightValue: sisaBayar/12, highlight: skema==="cash-keras"?"Cicilan / Bulan":"Angsuran / Bulan", keterangan:"Sisa pembayaran dicicil 12 bulan tanpa bunga" });
    } else {
      const n = tenor * 12;
      let cicilan, totalBayar, totalMargin;
      if (kprJenis === "syariah") {
        const marginTotal = sisaBayar*(rate/100)*tenor;
        const hargaJual = sisaBayar+marginTotal;
        cicilan = hargaJual/n; totalBayar=dpNominal+hargaJual; totalMargin=marginTotal;
      } else {
        const bm = rate/100/12;
        cicilan = bm>0?(sisaBayar*bm*Math.pow(1+bm,n))/(Math.pow(1+bm,n)-1):sisaBayar/n;
        totalBayar=dpNominal+cicilan*n; totalMargin=cicilan*n-sisaBayar;
      }
      setResult({ harga,dpNominal,dpPersen,sisaBayar,totalBayar,totalMargin,highlightValue:cicilan,highlight:"Cicilan / Bulan",keterangan:kprJenis==="syariah"?`Murabahah — margin flat ${rate}%/thn`:`Anuitas — bunga ${rate}%/thn` });
    }
  }

  const dpMin = skema==="cash-keras"?80:skema==="cash-bertahap"?40:10;
  function handleSkema(key) { setSkema(key); setDpPersen(key==="cash-keras"?80:key==="cash-bertahap"?40:20); }

  const inputCls = "w-full px-4 py-[0.9rem] bg-white border border-[rgba(26,24,20,0.1)] font-sans text-[0.9rem] text-dark outline-none focus:border-gold transition-colors duration-200 appearance-none";
  const labelCls = "block text-[0.72rem] tracking-[0.12em] uppercase text-gray mb-2";

  return (
    <section id="simulasi" className="px-16 py-24 bg-[#f0ede6] max-lg:px-8 max-md:px-5 max-md:py-12">
      <div className="section-tag">Simulasi Pembayaran</div>
      <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.2] mb-4">
        Hitung Simulasi<br /><em className="italic text-gold">Pembayaran Anda</em>
      </h2>
      <p className="text-gray text-[0.92rem] leading-[1.7] max-w-[500px] mb-10">
        Pilih skema pembayaran yang sesuai dengan kemampuan dan kebutuhan Anda.
      </p>

      {/* Tabs skema */}
      <div className="flex border border-[rgba(26,24,20,0.1)] w-fit mb-4 max-md:flex-col max-md:w-full">
        {SKEMA.map(s => (
          <button
            key={s.key}
            onClick={() => handleSkema(s.key)}
            className={`flex items-center gap-2 px-8 py-[0.85rem] border-r border-[rgba(26,24,20,0.1)] last:border-r-0 font-sans text-[0.8rem] tracking-[0.08em] uppercase cursor-pointer transition-all duration-200 max-md:border-r-0 max-md:border-b max-md:last:border-b-0 ${skema===s.key?"bg-dark text-gold":"bg-white text-gray hover:bg-cream hover:text-dark"}`}
          >
            <span>{s.icon}</span>{s.label}
          </button>
        ))}
      </div>

      {/* Deskripsi skema */}
      <p className="text-[0.85rem] text-gray leading-[1.7] mb-10">
        {skema==="cash-keras" && <><strong className="text-dark">Cash Keras</strong> — DP minimum 80%, sisa dicicil <strong className="text-dark">12 bulan</strong> langsung ke developer tanpa bunga.</>}
        {skema==="cash-bertahap" && <><strong className="text-dark">Cash Bertahap</strong> — DP minimum 40%, sisa diangsur <strong className="text-dark">12 bulan</strong> tanpa bunga.</>}
        {skema==="kpr" && <><strong className="text-dark">KPR</strong> — Pembiayaan bank, pilihan <strong className="text-dark">Syariah</strong> atau <strong className="text-dark">Konvensional</strong>. Tenor hingga 30 tahun.</>}
      </p>

      <div className="grid grid-cols-[1.2fr_1fr] gap-20 items-start max-lg:grid-cols-1 max-lg:gap-8">
        {/* Form */}
        <div className="flex flex-col gap-6">
          <div>
            <label className={labelCls}>Harga Properti (Rp)</label>
            <input className={inputCls} type="number" value={harga} onChange={e => setHarga(parseFloat(e.target.value)||0)} />
            <div className="text-[0.72rem] text-gray mt-1">{formatRp(harga)}</div>
          </div>

          <div>
            <label className={labelCls}>{skema==="cash-keras"?"Uang Muka (min. 80%)":skema==="cash-bertahap"?"Uang Muka (min. 40%)":"Uang Muka / DP (%)"}</label>
            <input className={inputCls} type="number" value={dpPersen} min={dpMin} max={99} onChange={e => setDpPersen(Math.max(dpMin,Math.min(99,parseFloat(e.target.value)||0)))} />
            <div className="text-[0.72rem] text-gray mt-1">
              {formatRp((harga*dpPersen)/100)} ({dpPersen}%)
              {dpPersen < dpMin && <span className="text-amber-700 font-medium"> ⚠ Minimum {dpMin}%</span>}
            </div>
          </div>

          {skema==="kpr" && <>
            <div>
              <label className={labelCls}>Jenis Pembiayaan</label>
              <div className="flex border border-[rgba(26,24,20,0.1)]">
                {KPR_JENIS.map(j => (
                  <button key={j.key} onClick={() => setKprJenis(j.key)}
                    className={`flex-1 py-3 px-4 border-r last:border-r-0 border-[rgba(26,24,20,0.1)] font-sans text-[0.8rem] text-gray cursor-pointer transition-all duration-200 ${kprJenis===j.key?"bg-dark text-gold":"bg-white hover:bg-cream"}`}>
                    {j.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Tenor (Tahun)</label>
                <select className={inputCls} value={tenor} onChange={e => setTenor(parseFloat(e.target.value))}>
                  {TENOR_OPTIONS.map(t => <option key={t} value={t}>{t} Tahun</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>{kprJenis==="syariah"?"Margin (%/thn)":"Suku Bunga (%/thn)"}</label>
                <input className={inputCls} type="number" step="0.1" value={rate} onChange={e => setRate(parseFloat(e.target.value)||0)} />
              </div>
            </div>
          </>}

          <p className="text-[1rem] text-gray leading-[1.6]">* Simulasi ini bersifat estimasi. Harga dan ketentuan aktual dapat berbeda.</p>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-dark text-white p-10 sticky top-28">
            <div className="text-[0.72rem] tracking-[0.15em] uppercase text-gold mb-8">
              Hasil Simulasi — {skema==="cash-keras"?"Cash Keras":skema==="cash-bertahap"?"Cash Bertahap":kprJenis==="syariah"?"KPR Syariah":"KPR Konvensional"}
            </div>
            {[
              ["Harga Properti", formatRp(result.harga)],
              [`Uang Muka (${result.dpPersen}%)`, formatRp(result.dpNominal)],
              ["Sisa yang Dibiayai", formatRp(result.sisaBayar)],
              ...(skema==="kpr" && result.totalMargin !== undefined ? [[kprJenis==="syariah"?"Total Margin Bank":"Total Bunga", formatRp(result.totalMargin)]] : []),
              ...(skema==="kpr" ? [["Total Keseluruhan", formatRp(result.totalBayar)]] : []),
            ].map(([label, val]) => (
              <div key={label} className="py-4 border-b border-white/8 last:border-0">
                <div className="text-[0.75rem] text-white/40 mb-1">{label}</div>
                <div className="font-serif text-[1.5rem] text-white">{val}</div>
              </div>
            ))}
            <div className="mt-6 p-6 bg-gold/15 border border-gold/30">
              <div className="text-[0.75rem] text-gold mb-1">{result.highlight}</div>
              <div className="font-serif text-[2rem] text-gold">{formatRp(result.highlightValue)}</div>
              <div className="text-[0.75rem] text-gold/70 mt-1">{skema==="kpr"?`selama ${tenor} tahun (${tenor*12} bulan)`:"selama 12 bulan"}</div>
            </div>
            <p className="text-[0.72rem] text-white/35 mt-4 leading-[1.6] italic">{result.keterangan}</p>
          </div>
        )}
      </div>
    </section>
  );
}
