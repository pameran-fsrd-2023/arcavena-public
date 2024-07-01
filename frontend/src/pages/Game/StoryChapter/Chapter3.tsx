import ChapterImg from "../../../assets/Game/Story/ChapterImg3.svg";

const Chapter3 = () => {
  return (
    <div className="flex flex-col gap-8">
      <img src={ChapterImg} alt="chapter-image" className="h-auto w-full" />
      <p>
        Dari kejauhan terlihat kilauan warna-warni yang mendorong rasa penasaran
        mereka untuk mendekati kilauan itu.
      </p>

      <p>
        Ternyata kilauan itu berasal dari bongkahan crystal tajam yang di
        belakangnya ada kota yang sangat cantik. Mereka berharap di baliknya
        adalah kota Crystatem.
      </p>

      <p>
        Di depan bongkahan kristal tajam itu berdiri tiga petua dan petua itu
        memperkenalkan diri mereka sebagai Arstralum, warga Crystatem
      </p>
    </div>
  );
};

export default Chapter3;
