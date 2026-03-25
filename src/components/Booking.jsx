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

          {/* Tombol kirim per agen */}
          <div className="mt-2">
            <p className="text-[0.62rem] tracking-[0.18em] uppercase text-white/25 mb-3">
              Kirim & Jadwalkan Kunjungan via WhatsApp
            </p>
            <div className="flex flex-col gap-2">
              {filtered.map((wa) => (
                <button
                  key={wa.label}
                  onClick={() => kirimKe(wa)}
                  className="group w-full px-5 py-3.5 bg-gold/10 border border-gold/30 hover:bg-gold hover:border-gold transition-all duration-200 cursor-pointer text-center"
                >
                  <span className="text-[0.82rem] tracking-[0.12em] uppercase font-medium text-gold group-hover:text-dark transition-colors duration-200">
                    Kirim ke {wa.label}
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
