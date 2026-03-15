export default function Footer() {
  return (
    <footer className="px-16 py-12 bg-[#110f0d] flex justify-between items-center border-t border-white/5 max-md:flex-col max-md:gap-4 max-md:text-center max-md:px-5">
      <a href="#home" className="font-serif text-[1.6rem] font-medium tracking-[0.05em] text-white no-underline">
        Hunian<span className="text-gold">SoloRaya</span>
      </a>
      <p className="text-white/25 text-[0.78rem]">© 2025 Hunian SoloRaya. All rights reserved.</p>
      <div className="flex gap-8 flex-wrap justify-center">
        {["Kebijakan Privasi","Syarat & Ketentuan","Karir"].map(l => (
          <a key={l} href="#" className="text-white/35 text-[0.75rem] no-underline tracking-[0.08em] uppercase hover:text-gold transition-colors duration-200">{l}</a>
        ))}
      </div>
    </footer>
  );
}
