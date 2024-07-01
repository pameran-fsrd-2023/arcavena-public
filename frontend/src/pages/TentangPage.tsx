import Footer from "../components/Footer";

const TentangPage = () => {
  return (
    <div className="flex h-full min-h-screen w-full flex-col justify-between">
      <div className="mx-auto flex w-full grow flex-col items-center justify-center gap-8 pt-10">
        <h1 className="w-fit max-w-[24rem] text-center font-vollkorn text-[38px] font-semibold tracking-wider text-white shadow-gray-400 text-shadow xxs:text-[32px] xs:text-[40px]">
          Tentang Kami
        </h1>
        <div className="w-full max-w-[700px] space-y-8 px-4 text-center font-lato text-base font-[450] leading-relaxed text-white lg:text-[20px]">
          <p data-aos="fade-up">
            Pameran "Arcavena" adalah pameran akademik Tahap Persiapan Bersama
            (TPB) FSRD ITB 2023. Ini mendorong kolaborasi antar-mahasiswa dan
            memperkaya pengalaman mereka dalam seni, desain, dan kriya.
            "Arcavena" juga menjadi syarat untuk melanjutkan ke jenjang
            berikutnya, sehingga TPB FSRD ITB 2023 berkolaborasi dengan
            pendekatan multidisiplin.
          </p>
          <p data-aos="fade-up">
            Pameran ini bertujuan sebagai wadah bagi mahasiswa TPB FSRD ITB 2023
            untuk memamerkan tugas selama masa TPB dan bertujuan menjadi sarana
            untuk memaksimalkan potensi dari keberagaman pengetahuan akan ilmu
            seni, desain, dan kriya serta menjadi wadah kolaborasi baik antar
            sesama mahasiswa TPB FSRD ITB 2023 kampus Ganesha, Jatinangor,
            Cirebon maupun dengan pihak eksternal.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TentangPage;
