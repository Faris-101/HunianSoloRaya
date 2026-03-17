export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen grid grid-cols-2 pt-20 overflow-hidden max-lg:grid-cols-1 max-lg:min-h-auto"
    >
      {/* Kiri */}
      <div className="flex flex-col justify-center px-16 py-20 max-lg:px-8 max-lg:pt-24 max-lg:pb-12 max-md:px-5 max-md:pt-20">
        <div className="flex items-center gap-3 text-[0.75rem] tracking-[0.2em] uppercase text-gold mb-6 before:content-[''] before:block before:w-8 before:h-px before:bg-gold animate-fade-up [animation-delay:0.1s]">
          Developer Properti Terpercaya
        </div>

        <h1 className="font-serif text-[clamp(2.4rem,4.5vw,4.5rem)] font-light leading-[1.08] mb-3 tracking-[-0.01em] animate-fade-up [animation-delay:0.2s]">
          Hunian Berkualitas,
          <br />
          Harga Terjangkau,
          <br />
          <em className="italic text-gold">Lokasi Strategis</em>
        </h1>

        <p className="font-serif italic text-[1.1rem] text-gold/70 mb-6 animate-fade-up [animation-delay:0.25s]">
          "Tempat Pulang yang Selalu Ditunggu"
        </p>

        <p className="text-[0.92rem] leading-[1.85] text-gray max-w-[460px] mb-4 animate-fade-up [animation-delay:0.3s]">
          Hunian SoloRaya hadir untuk mewujudkan impian memiliki rumah yang
          nyaman, berkualitas, dan terjangkau di kawasan Solo Raya. Dengan
          pilihan lokasi strategis — dekat jalan tol, pusat perbelanjaan,
          sekolah, dan fasilitas umum — setiap hunian kami dirancang untuk
          memenuhi kebutuhan keluarga muda yang baru membangun kehidupan, maupun
          mereka yang menginginkan kenyamanan di masa pensiun.
        </p>

        <p className="text-[0.92rem] leading-[1.85] text-gray max-w-[460px] mb-10 animate-fade-up [animation-delay:0.32s]">
          Tersedia dalam tiga tipe unit — 1 Lantai, Mezanin, dan 2 Lantai —
          mulai dari{" "}
          <strong className="text-dark font-medium">Rp 295 Juta</strong> dengan
          legalitas SHM terjamin dan kemudahan pembayaran Cash maupun KPR
          Syariah &amp; Konvensional.
        </p>

        <p className="text-[0.72rem] tracking-[0.15em] uppercase text-gold mb-8 animate-fade-up [animation-delay:0.34s]">
          ✦ Investasi Terbaik untuk Keluarga Anda
        </p>

        <div className="flex gap-4 items-center animate-fade-up [animation-delay:0.4s] max-md:flex-col max-md:items-start">
          <a href="#proyek" className="btn-primary">
            Lihat Proyek
          </a>
          <a href="#simulasi" className="btn-secondary">
            Simulasi Pembayaran
          </a>
        </div>
      </div>

      {/* Kanan */}
      <div className="relative bg-dark overflow-hidden max-lg:h-[50vh] max-md:h-[40vh]">
        <div className="grid grid-rows-2 h-full gap-px">
          <div className="relative overflow-hidden">
            <img
              src="/assets/foto-3.PNG"
              alt="Rumah Premium"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 right-8 bg-gold text-dark px-6 py-4 text-[0.75rem] tracking-[0.1em] uppercase font-medium">
              Cluster Gedongan
            </div>
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
