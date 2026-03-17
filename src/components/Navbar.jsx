import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  const links = [
    { href: "#proyek",   label: "Hunian" },
    { href: "#tipe-unit",label: "Tipe Unit" },
    { href: "#simulasi", label: "Simulasi" },
    { href: "#booking",  label: "Hubungi" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-cream/95 backdrop-blur-xl border-b border-[rgba(26,24,20,0.1)] transition-all duration-300 md:px-8 lg:px-16 md:py-5 ${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.07)]" : ""}`}>

        {/* Logo */}
        <a href="#home" onClick={close} className="font-serif text-[1.35rem] font-medium tracking-[0.04em] text-dark no-underline md:text-[1.6rem]">
          Hunian<span className="text-gold">SoloRaya</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex gap-8 list-none">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-[0.8rem] tracking-[0.1em] uppercase text-gray no-underline hover:text-dark transition-colors duration-200">{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Kanan */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9 bg-transparent border-0 cursor-pointer p-1 flex-shrink-0"
          >
            <span className={`block w-full h-0.5 bg-dark rounded-sm transition-all duration-300 origin-center ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block w-full h-0.5 bg-dark rounded-sm transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-full h-0.5 bg-dark rounded-sm transition-all duration-300 origin-center ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>

          <a href="#booking" onClick={close} className="px-4 py-2.5 bg-dark text-cream text-[0.7rem] tracking-[0.08em] uppercase no-underline hover:bg-gold transition-colors duration-200 whitespace-nowrap md:px-6 md:py-[0.65rem] md:text-[0.78rem] md:tracking-[0.1em]">
            Booking
          </a>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={close}
        className={`fixed inset-0 bg-black/35 z-[48] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Mobile menu */}
      <div className={`fixed top-[61px] left-0 right-0 z-[49] bg-cream/98 backdrop-blur-2xl border-b border-[rgba(26,24,20,0.1)] overflow-hidden transition-all duration-400 ease-[cubic-bezier(.77,0,.175,1)] md:top-[66px] ${open ? "max-h-[280px] opacity-100" : "max-h-0 opacity-0"}`}>
        <ul className="list-none py-1 pb-3">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={close}
                className="flex items-center gap-3 px-5 py-4 text-[0.85rem] tracking-[0.1em] uppercase text-dark no-underline border-b border-[rgba(26,24,20,0.07)] hover:text-gold hover:pl-7 transition-all duration-200 last:border-0"
              >
                <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
