import { useNavigate } from "react-router-dom";
import { PROJECTS, PROJECT_GRADIENTS } from "../data/index";

export default function Projects() {
  const navigate = useNavigate();

  return (
    <section
      id="proyek"
      className="px-16 py-24 max-lg:px-8 max-md:px-5 max-md:py-12"
    >
      <div className="flex justify-between items-end mb-12 max-md:flex-col max-md:items-start max-md:gap-6">
        <div>
          <div className="section-tag">Portofolio Hunian</div>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.2]">
            Hunian <em className="italic text-gold">Pilihan</em> Kami
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-px max-lg:grid-cols-2 max-md:grid-cols-1">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            onClick={() => {
              navigate(`/proyek/${p.slug}`);
              window.scrollTo(0, 0);
            }}
            className="relative overflow-hidden bg-dark cursor-pointer aspect-[3/4] group transition-transform duration-[400ms] hover:-translate-y-1 hover:brightness-125"
          >
            {/* Bg */}
            <div
              className="w-full h-full min-h-full transition-transform duration-[600ms] group-hover:scale-[1.04]"
              style={{
                background: PROJECT_GRADIENTS[i % PROJECT_GRADIENTS.length],
              }}
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
            <div className="absolute inset-x-0 bottom-0 px-6 py-6 project-overlay text-white">
              <div className="text-[0.65rem] tracking-[0.15em] uppercase text-gold mb-1">
                ● {p.statusLabel}
              </div>
              <div className="font-serif text-[1.3rem] font-normal mb-1">
                {p.name}
              </div>
              <div className="text-[0.78rem] text-white/60">{p.location}</div>
              <div className="flex gap-6 mt-3 text-[0.72rem] text-white/50 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <span>{p.units}</span>
                <span>{p.type}</span>
                <span>{p.price}</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="absolute top-5 right-5 w-9 h-9 bg-gold text-dark flex items-center justify-center opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
