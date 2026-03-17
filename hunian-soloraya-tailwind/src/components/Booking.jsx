import { useState } from "react";
import { PROJECTS } from "../data/index";
import WAButtons from "./WAButtons";

const INIT = { nama: "", hp: "", email: "", proyek: "", unit: "", pesan: "" };

export default function Booking({ onSubmit }) {
  const [form, setForm] = useState(INIT);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const inputCls =
    "w-full px-4 py-3 bg-white/5 border border-white/10 font-sans text-[0.88rem] text-white outline-none transition-colors duration-200 focus:border-gold resize-none placeholder:text-white/25";
  const labelCls =
    "block text-[0.68rem] tracking-[0.14em] uppercase text-white/35 mb-2";

  return (
    <section
      id="booking"
      className="px-16 py-24 bg-dark text-white max-lg:px-8 max-md:px-5 max-md:py-12"
    >
      <div className="grid grid-cols-[1fr_1.8fr] gap-20 max-lg:grid-cols-1 max-lg:gap-12">
        {/* KIRI */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 text-[0.72rem] tracking-[0.22em] uppercase text-gold mb-5 before:content-[''] before:block before:w-8 before:h-px before:bg-gold">
            Hubungi Kami
          </div>

          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] font-light leading-[1.15] mb-6">
            Jadwalkan
            <br />
            <em className="italic text-gold">Kunjungan</em> Anda
          </h2>

          <p className="text-white/40 text-[0.88rem] leading-[1.8] mb-10">
            Tim marketing kami siap membantu Anda menemukan properti yang tepat.
            Isi formulir dan kami akan menghubungi Anda dalam 24 jam.
          </p>

          {/* WA Buttons */}
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

        {/* FORM */}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
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

          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
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

          <button
            onClick={() => {
              const pesan = `Halo, saya ingin info lebih lanjut 🙏

Nama: ${form.nama}
No HP/WA: ${form.hp}
Email: ${form.email}
Proyek: ${form.proyek || "Belum dipilih"}
Tipe Unit: ${form.unit || "Belum dipilih"}
Pesan: ${form.pesan || "-"}`;

              window.open(
                `https://wa.me/6287888701191?text=${encodeURIComponent(pesan)}`,
                "_blank",
              );
              onSubmit();
              setForm(INIT);
            }}
            className="mt-1 w-full py-4 bg-gold text-dark font-sans text-[0.78rem] tracking-[0.15em] uppercase font-medium cursor-pointer hover:opacity-85 transition-opacity duration-200 border-0"
          >
            Kirim &amp; Jadwalkan Kunjungan →
          </button>

          <p className="text-[0.7rem] text-white/20 leading-[1.7] text-center">
            Dengan mengirimkan form ini, Anda menyetujui untuk dihubungi oleh
            tim kami. Data Anda aman dan tidak akan dibagikan ke pihak ketiga.
          </p>
        </div>
      </div>
    </section>
  );
}
