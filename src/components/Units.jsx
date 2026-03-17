import { useNavigate } from "react-router-dom";
import { UNITS } from "../data/index";

export default function Units() {
  const navigate = useNavigate();

  return (
    <section id="tipe-unit" className="px-5 py-14 bg-dark text-white md:px-8 md:py-20 lg:px-16 lg:py-24">
      <div className="flex items-center gap-3 text-[0.72rem] tracking-[0.22em] uppercase text-gold mb-4 before:content-[''] before:block before:w-8 before:h-px before:bg-gold">
        Pilihan Tipe Unit
      </div>

      <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.2] mb-4">
        Tipe Unit untuk<br />
        <em className="italic text-gold">Setiap Kebutuhan</em>
      </h2>

      <p className="text-white/50 text-[0.88rem] leading-[1.7] max-w-[500px] mb-10">
        Dari hunian satu lantai yang efisien hingga dua lantai yang luas — pilih tipe unit yang paling sesuai.
      </p>

      {/* Mobile: 1 col, tablet+: 3 col */}
      <div className="flex flex-col gap-px sm:grid sm:grid-cols-3">
        {UNITS.map((u) => (
          <div
            key={u.slug}
            onClick={() => { navigate(`/tipe-unit/${u.slug}`); window.scrollTo(0, 0); }}
            className="relative overflow-hidden bg-dark cursor-pointer border border-transparent hover:border-gold transition-all duration-300 group"
          >
            {/* Mobile: horizontal layout */}
            <div className="flex items-center gap-4 p-5 sm:hidden">
              <div className="flex-1 min-w-0">
                <div className="text-[0.65rem] tracking-[0.15em] uppercase text-gold mb-1">{u.type}</div>
                <div className="font-serif text-[1.4rem] font-normal text-white">{u.name}</div>
                <p className="text-[0.78rem] text-white/40 leading-[1.5] mt-1 line-clamp-2">{u.desc}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-[0.6rem] tracking-[0.08em] uppercase text-white/30 mb-1">Mulai dari</div>
                <div className="font-serif text-[1rem] text-gold">{u.price}</div>
                <div className="mt-3 w-8 h-8 bg-gold/15 border border-gold/30 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Gold line bottom mobile */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/20 sm:hidden" />

            {/* Desktop: vertical layout */}
            <div className="hidden sm:block p-8">
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <div className="text-[0.7rem] tracking-[0.15em] uppercase text-gold mb-4">{u.type}</div>
              <div className="font-serif text-[2rem] font-normal mb-2 text-white">{u.name}</div>
              <p className="text-[0.8rem] text-white/40 leading-[1.6]">{u.desc}</p>
              <div className="font-serif text-[1.2rem] text-gold mt-6 pt-4 border-t border-white/8">
                <small className="font-sans text-[0.7rem] text-white/35 block mb-1 tracking-[0.08em] uppercase">Mulai dari</small>
                {u.price}
              </div>
              <div className="mt-5 text-[0.72rem] tracking-[0.1em] uppercase text-gold opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Lihat Semua Unit {u.name} →
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
