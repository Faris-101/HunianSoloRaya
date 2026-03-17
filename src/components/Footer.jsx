export default function Footer() {
  return (
    <footer className="px-5 py-10 bg-[#110f0d] border-t border-white/5 md:px-8 lg:px-16">
      <div className="flex flex-col items-center gap-5 text-center md:flex-row md:justify-between md:items-center md:text-left">
        <a href="#home" className="font-serif text-[1.5rem] font-medium tracking-[0.05em] text-white no-underline">
          Hunian<span className="text-gold">SoloRaya</span>
        </a>
        <p className="text-white/25 text-[0.75rem] order-3 md:order-2">© 2025 Hunian SoloRaya. All rights reserved.</p>
        <div className="flex gap-5 flex-wrap justify-center order-2 md:order-3">
          {["Kebijakan Privasi","Syarat & Ketentuan"].map(l => (
            <a key={l} href="#" className="text-white/35 text-[0.72rem] no-underline tracking-[0.08em] uppercase hover:text-gold transition-colors duration-200">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
