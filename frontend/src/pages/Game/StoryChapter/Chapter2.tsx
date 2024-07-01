import ChapterImg from "../../../assets/Game/Story/ChapterImg2.svg";

const Chapter2 = () => {
  return (
    <div className="flex flex-col gap-8">
      <img src={ChapterImg} alt="chapter-image" className="h-auto w-full" />
      <p>Sesampainya di mulut goa, mereka bertemu dengan satu sama lain.</p>

      <p>
        Bergegaslah mereka masuk ke dalam gua dengan harapan kebenaran akan
        adanya kota Crystatem yang selama ini mereka cari.
      </p>

      <p>
        Dalam perjalanan masuk ke dalam gua, mulai muncul perasaan asing dalam
        diri mereka yang membuat rasa takut, penasaran, dan was-was bercampur
        aduk yang menyelimuti mereka.
      </p>
    </div>
  );
};

export default Chapter2;
