import { useParams, useNavigate } from "react-router-dom";
import Chapter1 from "./StoryChapter/Chapter1";
import Chapter2 from "./StoryChapter/Chapter2";
import Chapter3 from "./StoryChapter/Chapter3";
import Chapter4 from "./StoryChapter/Chapter4";
import Chapter5 from "./StoryChapter/Chapter5";
import Chapter6 from "./StoryChapter/Chapter6";
import Footer from "../../components/Footer";

const StoryChapter = () => {
  const { chapter } = useParams();
  const navigate = useNavigate();

  const renderChapter = () => {
    switch (chapter) {
      case "1":
        return <Chapter1 />;
      case "2":
        return <Chapter2 />;
      case "3":
        return <Chapter3 />;
      case "4":
        return <Chapter4 />;
      case "5":
        return <Chapter5 />;
      case "6":
        return <Chapter6 />;
      default:
        navigate("/story");
        return null;
    }
  };

  return (
    <section className="min-h-fit font-lato text-white">
      <div className="min-h-screen w-full px-4">{renderChapter()}</div>
      <Footer />
    </section>
  );
};

export default StoryChapter;
