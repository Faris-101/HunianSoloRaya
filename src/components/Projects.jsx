import { useNavigate } from "react-router-dom";
import { PROJECTS, PROJECT_GRADIENTS } from "../data/index";

export default function Projects() {
  const navigate = useNavigate();

  return (
    <section id="proyek" className="px-5 py-14 md:px-8 md:py-20 lg:px-16 lg:py-24">
      <div className="flex justify-between items-end mb-8 md:mb-12 flex-wrap gap-4">
        <div>
          <div className="section-tag">Portofolio Hunian</div>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.2]">
            Hunian <em className="italic text-gold">Pilihan</em> Kami
          </h2>
        </div>
      </div>

      {/* Mobile: 2 col, tablet: 2 col, desktop: 4 col */}
      <div className="grid grid-cols-2 gap-px sm:grid-cols-2 lg:grid-cols-4">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            onClick={() => { navigate(`/proyek/${p.slug}`); window.scrollTo(0, 0); }}
            className="relative overflow-hidden bg-dark cursor-pointer aspect-[3/4] group transition-transform duration-[400ms] hover:-translate-y-1 hover:brightness-110"
          >
            {/* Bg */}
            <div
              className="w-full h-full min-h-full transition-transform duration-[600ms] group-hover:scale-[1.04]"
              style={{ background: PROJECT_GRADIENTS[i % PROJECT_GRADIENTS.length] }}
            >
              {p.thumbnail && (
                <img
                  src={p.thumbnail}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
              )}
            </div>

            {/* Overlay */}
            <div className="absolute inset-x-0 bottom-0 px-4 py-4 project-overlay text-white md:px-6 md:py-6">
              <div className="text-[0.6rem] tracking-[0.12em] uppercase text-gold mb-1 md:text-[0.65rem]">
                ● {p.statusLabel}
              </div>
              <div className="font-serif text-[1rem] font-normal mb-0.5 leading-tight md:text-[1.2rem]">
                {p.name}
              </div>
              <div className="text-[0.7rem] text-white/55 hidden sm:block">{p.location}</div>
              <div className="text-[0.75rem] text-gold/80 font-serif mt-1">{p.price}</div>
            </div>

            {/* Arrow */}
            <div className="absolute top-3 right-3 w-7 h-7 bg-gold text-dark flex items-center justify-center opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 md:w-9 md:h-9 md:top-5 md:right-5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
