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
    { href: "#simulasi", label: "Simulasi Pembayaran" },
    { href: "#booking",  label: "Hubungi Kami" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-6 bg-cream/92 backdrop-blur-xl border-b border-[rgba(26,24,20,0.1)] transition-all duration-300 max-lg:px-8 max-md:px-5 max-md:py-4 ${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.08)]" : ""}`}>
        
        {/* Logo */}
        <a href="#home" onClick={close} className="font-serif text-[1.6rem] font-medium tracking-[0.05em] text-dark no-underline">
          Hunian<span className="text-gold">SoloRaya</span>
        </a>

        {/* Links desktop */}
        <ul className="hidden lg:flex gap-10 list-none">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-[0.82rem] tracking-[0.12em] uppercase text-gray no-underline hover:text-dark transition-colors duration-200">{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Kanan: hamburger + CTA */}
        <div className="flex items-center gap-3">
          {/* Hamburger — tablet/HP */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9 bg-transparent border-0 cursor-pointer p-1"
          >
            <span className={`block w-full h-0.5 bg-dark rounded-sm transition-all duration-300 origin-center ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block w-full h-0.5 bg-dark rounded-sm transition-all duration-300 ${open ? "opacity-0 w-0" : ""}`} />
            <span className={`block w-full h-0.5 bg-dark rounded-sm transition-all duration-300 origin-center ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>

          <a href="#booking" onClick={close} className="px-6 py-[0.65rem] bg-dark text-cream text-[0.8rem] tracking-[0.1em] uppercase no-underline hover:bg-gold transition-colors duration-200 max-md:text-[0.68rem] max-md:px-3">
            Booking Sekarang
          </a>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={close}
        className={`fixed inset-0 bg-black/35 z-[48] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Mobile dropdown */}
      <div className={`fixed top-[62px] left-0 right-0 z-[49] bg-cream/98 backdrop-blur-2xl border-b border-[rgba(26,24,20,0.1)] overflow-hidden transition-all duration-500 ease-[cubic-bezier(.77,0,.175,1)] max-md:top-[56px] ${open ? "max-h-80 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}>
        <ul className="list-none py-2 pb-4">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={close}
                className="block px-6 py-4 text-[0.85rem] tracking-[0.12em] uppercase text-gray no-underline border-b border-[rgba(26,24,20,0.08)] hover:text-dark hover:pl-8 transition-all duration-200 last:border-0"
              >{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
