import ChapterImg from "../../../assets/Game/Story/ChapterImg6.svg";

const Chapter4 = () => {
  return (
    <div className="flex flex-col gap-8">
      <img src={ChapterImg} alt="chapter-image" className="h-auto w-full" />
      <p>
        Mereka akhirnya mengambil gemstone dari tubuh sisi gelap dan
        menggabungkannya dengan gem piece yang mereka dapatkan dari Arstralum.
      </p>

      <p>
        Gemstone perlahan memancarkan cahaya dan semakin lama semakin terang.
        Mereka membawa gemstone tersebut dan kembali ke petua Arstralum.
      </p>

      <p>
        Akhirnya, para petua menerima mereka sebagai Arstralum dan memeriahkan
        keberhasilan mereka.
      </p>
    </div>
  );
};

export default Chapter4;
