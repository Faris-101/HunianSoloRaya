import { useNavigate } from "react-router-dom";
import { UNITS } from "../data/index";

export default function Units() {
  const navigate = useNavigate();

  return (
    <section id="tipe-unit" className="px-16 py-24 bg-dark text-white max-lg:px-8 max-md:px-5 max-md:py-12">
      <div className="flex items-center gap-3 text-[0.72rem] tracking-[0.22em] uppercase text-gold mb-4 before:content-[''] before:block before:w-8 before:h-px before:bg-gold">
        Pilihan Tipe Unit
      </div>

      <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.2] mb-4">
        Tipe Unit untuk<br />
        <em className="italic text-gold">Setiap Kebutuhan</em>
      </h2>

      <p className="text-white/50 text-[0.92rem] leading-[1.7] max-w-[500px] mb-12">
        Dari hunian satu lantai yang efisien hingga dua lantai yang luas — pilih tipe unit yang paling sesuai dengan kebutuhan keluarga Anda.
      </p>

      <div className="grid grid-cols-3 gap-px bg-white/8 max-lg:grid-cols-2 max-md:grid-cols-1">
        {UNITS.map((u) => (
          <div
            key={u.slug}
            onClick={() => { navigate(`/tipe-unit/${u.slug}`); window.scrollTo(0,0); }}
            className="relative overflow-hidden bg-dark p-8 cursor-pointer border border-transparent hover:border-gold transition-all duration-300 group"
          >
            {/* Gold line bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

            <div className="text-[0.7rem] tracking-[0.15em] uppercase text-gold mb-4">{u.type}</div>
            <div className="font-serif text-[2rem] font-normal mb-2 text-white">{u.name}</div>
            <div className="flex gap-4 my-4 text-[0.75rem] text-white/45" />
            <p className="text-[0.8rem] text-white/40 leading-[1.6]">{u.desc}</p>
            <div className="font-serif text-[1.2rem] text-gold-light mt-6 pt-4 border-t border-white/8">
              <small className="font-sans text-[0.7rem] text-white/35 block mb-1 tracking-[0.08em] uppercase">Mulai dari</small>
              {u.price}
            </div>
            <div className="mt-6 text-[0.72rem] tracking-[0.1em] uppercase text-gold opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              Lihat Semua Unit {u.name} →
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
