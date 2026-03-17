export default function Toast({ show }) {
  return (
    <div className={`fixed bottom-8 right-8 z-50 bg-dark text-white px-6 py-4 text-[0.85rem] border-l-[3px] border-gold transition-all duration-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24 pointer-events-none"}`}>
      ✓ Pesan terkirim! Kami akan menghubungi Anda segera.
    </div>
  );
}
