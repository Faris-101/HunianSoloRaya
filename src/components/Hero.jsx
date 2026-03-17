export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col pt-[62px] overflow-hidden md:grid md:grid-cols-2 md:pt-20"
    >
      {/* Kiri */}
      <div className="flex flex-col justify-center px-5 py-10 md:px-8 lg:px-16 md:py-20 order-2 md:order-1">
        <div className="flex items-center gap-3 text-[0.72rem] tracking-[0.2em] uppercase text-gold mb-5 before:content-[''] before:block before:w-6 before:h-px before:bg-gold animate-fade-up [animation-delay:0.1s]">
          Developer Properti Terpercaya
        </div>

        <h1 className="font-serif text-[clamp(2rem,7vw,4.5rem)] font-light leading-[1.1] mb-3 tracking-[-0.01em] animate-fade-up [animation-delay:0.2s]">
          Hunian Berkualitas,
          <span className="block">Harga Terjangkau,</span>
          <em className="italic text-gold">Lokasi Strategis</em>
        </h1>

        <p className="font-serif italic text-[1rem] text-gold/70 mb-5 animate-fade-up [animation-delay:0.25s]">
          "Tempat Pulang yang Selalu Ditunggu"
        </p>

        <p className="text-[0.88rem] leading-[1.8] text-gray max-w-[460px] mb-3 animate-fade-up [animation-delay:0.3s]">
          Hunian SoloRaya hadir untuk mewujudkan impian memiliki rumah nyaman,
          berkualitas, dan terjangkau di kawasan Solo Raya — dekat jalan tol,
          pusat perbelanjaan, sekolah, dan fasilitas umum.
        </p>

        <p className="text-[0.88rem] leading-[1.8] text-gray max-w-[460px] mb-7 animate-fade-up [animation-delay:0.32s]">
          Tersedia tipe{" "}
          <strong className="text-dark font-medium">
            1 Lantai, Mezanin & 2 Lantai
          </strong>{" "}
          mulai dari{" "}
          <strong className="text-dark font-medium">Rp 295 Juta</strong>,
          legalitas SHM terjamin, pembayaran Cash maupun KPR Syariah &
          Konvensional.
        </p>

        <p className="text-[0.7rem] tracking-[0.15em] uppercase text-gold mb-7 animate-fade-up [animation-delay:0.34s]">
          ✦ Investasi Terbaik untuk Keluarga Anda
        </p>

        <div className="flex gap-3 flex-wrap animate-fade-up [animation-delay:0.4s]">
          <a href="#proyek" className="btn-primary text-[0.75rem] px-6 py-3">
            Lihat Proyek
          </a>
          <a
            href="#simulasi"
            className="btn-secondary text-[0.75rem] px-6 py-3"
          >
            Simulasi Pembayaran
          </a>
        </div>
      </div>

      {/* Kanan — foto */}
      <div className="relative bg-dark overflow-hidden order-1 md:order-2 h-[55vw] min-h-[240px] md:h-auto">
        <div className="grid grid-rows-2 h-full gap-px">
          <div className="relative overflow-hidden">
            <img
              src="/assets/foto-3.PNG"
              alt="Rumah Premium"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden">
            <img
              src="/assets/foto-1.PNG"
              alt="Rumah Premium"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
