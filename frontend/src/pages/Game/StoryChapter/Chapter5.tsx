import ChapterImg from "../../../assets/Game/Story/ChapterImg5a.svg";
import ChapterImgB from "../../../assets/Game/Story/ChapterImg5b.svg";

const Chapter5 = () => {
  return (
    <div className="flex flex-col gap-8">
      <img src={ChapterImg} alt="chapter-image" className="h-auto w-full" />
      <p>
        Keinginan yang begitu kuat membuat mereka tergiur dan ingin menguasai
        kristal-kristal tersebut. Namun, keinginan mereka ini menimbulkan
        konflik batin antara mengambil atau tidak. Pertentangan batin ini
        ternyata membangkitkan sisi gelap mereka.
      </p>

      <p>
        Sisi gelap seolah berbisik pada mereka, menghasut ketiganya melalui cara
        yang berbeda. Mereka yang tergoda pun mengambil serpihan kristal secara
        diam-diam dan berusaha agar tidak diketahui satu sama lain.
      </p>

      <p>
        Sampai lah pada satu titik dimana mereka secara bersamaan mengambil satu
        kristal yang paling cantik. Ketika rasa ego dan keserakahan berhasil
        menguasai, mereka memperebutkan kristal tersebut tanpa ada rasa malu dan
        hanya terpaku pada keserakahan diri mereka sendiri.
      </p>
      <img src={ChapterImgB} alt="chapter-image" className="h-auto w-full" />
      <p>
        Salah satu dari mereka menyadari bahwa gerakan dari sisi gelap ini
        sedikit mirip dengan ilmu yang mereka dapatkan dari Arstralum. Mereka
        bertiga perlahan melawan sisi gelap dengan menggerakkan tubuhnya
        masing-masing sesuai ilmu yang mereka dapatkan.
      </p>

      <p>
        Saat melakukan gerakan tersebut, tanpa sengaja tubuh sisi gelap tersibak
        dan sekelebat menampilkan gemstone di dada mereka. Dengan cepat, Narici,
        Athelius, dan Creli bekerja sama melawan sisi gelap dan langsung
        mengambil gemstone dari tubuh sisi gelap.
      </p>
    </div>
  );
};

export default Chapter5;
