import { WA_NUMBERS } from "../data/index";

const WA_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.85L.057 23.617a.75.75 0 00.92.921l5.83-1.461A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.5-5.25-1.375l-.372-.214-3.863.968.984-3.793-.235-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

export default function WAButtons({
  message = "Halo, saya tertarik dengan hunian di Hunian SoloRaya. Boleh minta info lebih lanjut mengenai ketersediaan unit, harga, dan cara pembelian? Terima kasih 🙏",
  size = "md",
  theme = "dark",
}) {
  const agent = import.meta.env.VITE_AGENT;
  const filtered = agent
    ? WA_NUMBERS.filter((w) => w.key === agent)
    : WA_NUMBERS;

  const isDark = theme === "dark";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {filtered.map((wa) => (
        <a
          key={wa.label}
          href={`https://wa.me/${wa.number}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noreferrer"
          className={`group flex items-center gap-3 no-underline px-4 py-3 transition-all duration-300 border ${
            isDark
              ? "border-white/10 bg-white/[0.03] hover:bg-[#25d366]/10 hover:border-[#25d366]/40"
              : "border-black/10 bg-black/[0.03] hover:bg-[#25d366]/10 hover:border-[#25d366]/40"
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-[#25d366] flex items-center justify-center flex-shrink-0 text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(37,211,102,0.45)]">
            {WA_SVG}
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className={`text-[0.58rem] tracking-[0.18em] uppercase mb-0.5 transition-colors duration-200 ${isDark ? "text-white/30 group-hover:text-[#25d366]/70" : "text-black/30 group-hover:text-[#25d366]/80"}`}
            >
              Chat via WhatsApp
            </span>
            <span
              className={`text-[0.85rem] font-medium tracking-wide transition-colors duration-200 ${isDark ? "text-white/80 group-hover:text-white" : "text-black/80 group-hover:text-black"}`}
            >
              {wa.label}
            </span>
          </div>
          <svg
            className={`ml-2 w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1 ${isDark ? "text-white/15 group-hover:text-[#25d366]/60" : "text-black/15 group-hover:text-[#25d366]/60"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      ))}
    </div>
  );
}
