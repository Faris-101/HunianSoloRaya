import { useState } from "react";
import { PROJECTS, WA_NUMBERS } from "../data/index";
import WAButtons from "./WAButtons";

const INIT = { nama: "", hp: "", email: "", proyek: "", unit: "", pesan: "" };

export default function Booking({ onSubmit }) {
  const [form, setForm] = useState(INIT);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const inputCls =
    "w-full px-4 py-3 bg-white/5 border border-white/10 font-sans text-[0.88rem] text-white outline-none transition-colors duration-200 focus:border-gold resize-none placeholder:text-white/25";
  const labelCls =
    "block text-[0.68rem] tracking-[0.14em] uppercase text-white/35 mb-2";

  function buildPesan() {
    return `Halo, saya ingin info lebih lanjut 🙏\n\nNama: ${form.nama || "-"}\nNo HP/WA: ${form.hp || "-"}\nEmail: ${form.email || "-"}\nProyek: ${form.proyek || "Belum dipilih"}\nTipe Unit: ${form.unit || "Belum dipilih"}\nPesan: ${form.pesan || "-"}`;
  }

  function kirimKe(wa) {
    window.open(
      `https://wa.me/${wa.number}?text=${encodeURIComponent(buildPesan())}`,
      "_blank",
    );
    onSubmit();
    setForm(INIT);
  }

  const agent = import.meta.env.VITE_AGENT;
  const filtered = agent
    ? WA_NUMBERS.filter((w) => w.key === agent)
    : WA_NUMBERS;

  return (
    <section
      id="booking"
      className="px-5 py-14 bg-dark text-white md:px-8 md:py-20 lg:px-16 lg:py-24"
    >
      {/* Header mobile */}
      <div className="mb-8 lg:hidden">
        <div className="flex items-center gap-3 text-[0.72rem] tracking-[0.22em] uppercase text-gold mb-4 before:content-[''] before:block before:w-6 before:h-px before:bg-gold">
          Hubungi Kami
        </div>
        <h2 className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-light leading-[1.15] mb-4">
          Jadwalkan <em className="italic text-gold">Kunjungan</em> Anda
        </h2>
        <p className="text-white/40 text-[0.85rem] leading-[1.8] mb-6">
          Tim marketing kami siap membantu Anda menemukan properti yang tepat.
        </p>
        <div className="py-5 border-y border-white/8">
          <p className="text-[0.65rem] tracking-[0.14em] uppercase text-white/30 mb-4">
            Chat Langsung via WhatsApp
          </p>
          <WAButtons
            message="Halo, saya ingin info lebih lanjut tentang hunian di Hunian SoloRaya"
            size="md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
        {/* Kiri — desktop */}
        <div className="hidden lg:flex flex-col justify-center">
          <div className="flex items-center gap-3 text-[0.72rem] tracking-[0.22em] uppercase text-gold mb-5 before:content-[''] before:block before:w-8 before:h-px before:bg-gold">
            Hubungi Kami
          </div>
          <h2 className="font-serif text-[clamp(2.2rem,3.5vw,3.5rem)] font-light leading-[1.15] mb-6">
            Jadwalkan
            <br />
            <em className="italic text-gold">Kunjungan</em> Anda
          </h2>
          <p className="text-white/40 text-[0.88rem] leading-[1.8] mb-10">
            Tim marketing kami siap membantu Anda menemukan properti yang tepat.
            Isi formulir dan kami akan menghubungi Anda dalam 24 jam.
          </p>
          <div className="pt-8 border-t border-white/8">
            <p className="text-[0.65rem] tracking-[0.14em] uppercase text-white/30 mb-5">
              Chat Langsung via WhatsApp
            </p>
            <WAButtons
              message="Halo, saya ingin info lebih lanjut tentang hunian di Hunian SoloRaya"
              size="md"
            />
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Nama Lengkap</label>
              <input
                className={inputCls}
                type="text"
                placeholder="Nama Anda"
                value={form.nama}
                onChange={(e) => set("nama", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Nomor HP / WA</label>
              <input
                className={inputCls}
                type="tel"
                placeholder="+62 8xx xxxx xxxx"
                value={form.hp}
                onChange={(e) => set("hp", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Email</label>
            <input
              className={inputCls}
              type="email"
              placeholder="email@anda.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Proyek yang Diminati</label>
              <select
                className={inputCls + " appearance-none cursor-pointer"}
                value={form.proyek}
                onChange={(e) => set("proyek", e.target.value)}
              >
                <option value="" className="bg-dark">
                  Pilih proyek...
                </option>
                {PROJECTS.map((p) => (
                  <option key={p.slug} value={p.slug} className="bg-dark">
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Tipe Unit</label>
              <select
                className={inputCls + " appearance-none cursor-pointer"}
                value={form.unit}
                onChange={(e) => set("unit", e.target.value)}
              >
                <option value="" className="bg-dark">
                  Pilih tipe unit...
                </option>
                {["1 Lantai", "Mezanin", "2 Lantai"].map((o) => (
                  <option key={o} className="bg-dark">
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Pesan / Pertanyaan</label>
            <textarea
              className={inputCls}
              rows={4}
              placeholder="Tuliskan pertanyaan atau kebutuhan Anda..."
              value={form.pesan}
              onChange={(e) => set("pesan", e.target.value)}
            />
          </div>

          {/* 3 Tombol kirim per agen */}
          <div className="mt-1">
            <p className="text-[0.68rem] tracking-[0.14em] uppercase text-white/30 mb-3">
              Kirim & Jadwalkan Kunjungan via WhatsApp
            </p>
            <div className="grid grid-cols-3 gap-2">
              {filtered.map((wa) => (
                <button
                  key={wa.label}
                  onClick={() => kirimKe(wa)}
                  className="group flex flex-col items-center gap-1.5 py-3 px-2 bg-gold/10 border border-gold/25 hover:bg-gold hover:border-gold transition-all duration-200 cursor-pointer"
                >
                  {/* WA icon */}
                  <div className="w-8 h-8 rounded-full bg-[#25d366] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      width="18"
                      height="18"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.85L.057 23.617a.75.75 0 00.92.921l5.83-1.461A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.5-5.25-1.375l-.372-.214-3.863.968.984-3.793-.235-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                  </div>
                  <span className="text-[0.72rem] tracking-[0.08em] uppercase text-gold group-hover:text-dark transition-colors duration-200 font-medium">
                    {wa.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-[0.7rem] text-white/20 leading-[1.7] text-center">
            Data Anda aman dan tidak akan dibagikan ke pihak ketiga.
          </p>
        </div>
      </div>
    </section>
  );
}
