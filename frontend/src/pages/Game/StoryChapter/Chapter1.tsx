import ChapterImg1 from "../../../assets/Game/Story/ChapterImg1.svg";

const Chapter1 = () => {
  return (
    <div className="flex flex-col gap-8">
      <img src={ChapterImg1} alt="chapter-image" className="h-auto w-full" />
      <p>
        terdapat sebuah legenda yang mengatakan adanya sebuah gua kristal yang
        menawarkan keindahan dan kebebasan dalam berkreasi.
      </p>

      <p>
        Legenda tersebut muncul dengan banyaknya orang yang keluar dari gua
        kristal dan menceritakan keberadaan sebuah kota kristal bernama
        Crystatem, kota yang dapat mengabulkan keinginan hati seseorang.
      </p>

      <p>
        Banyaknya cerita rakyat dan pertunjukan yang diadaptasi dari legenda itu
        mengundang rasa penasaran. Suatu saat, sebuah pertunjukan yang
        mengangkat kisah legenda tersebut digelar. Kabar pertunjukan itu sampai
        pada Narici, Athelius, dan Creli. Merasa kebenaran legenda itu adalah
        hal nyata, mereka bertekad melakukan perjalanan dari tempat mereka
        masing-masing ke gua legenda itu.
      </p>
    </div>
  );
};

export default Chapter1;
