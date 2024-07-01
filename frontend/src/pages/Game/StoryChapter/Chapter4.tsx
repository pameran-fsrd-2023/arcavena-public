import ChapterImg from "../../../assets/Game/Story/ChapterImg4.svg";

const Chapter4 = () => {
  return (
    <div className="flex flex-col gap-8">
      <img src={ChapterImg} alt="chapter-image" className="h-auto w-full" />
      <p>
        Arstralum mengatakan bahwa syarat yang harus mereka penuhi untuk
        mendalami ilmu dan menjadi bagian dari Arstralum adalah dengan memiliki
        sebuah gemstone.
      </p>

      <p>
        Sebelum melanjutkan perjalanan mencari gemstone, Arstalum memberikan
        mereka sedikit ilmu melalui gerakan dan gem piece sebagai “reward” untuk
        mereka.
      </p>

      <p>
        Karena tekad yang kuat, mereka tetap melanjutkan perjalanan untuk
        mencari gemstone yang mereka inginkan. Perjalanan mencari gemstone pun
        dimulai. Hamparan kristal terpampang indah di depan mata mereka.
      </p>
    </div>
  );
};

export default Chapter4;
