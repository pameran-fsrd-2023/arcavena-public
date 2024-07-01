import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Youtube from "../components/Youtube";
import Tiktok from "../components/Tiktok";
import Instagram from "../components/Instagram";
import Twitter from "../components/Twitter";

const MediaSosialPage = () => {
  const socialMedias = [
    {
      urlLink: "https://www.youtube.com/@tpbfsrditb2023",
      label: "@arcavena2024",
      icon: <Youtube />,
    },
    {
      urlLink: "https://www.tiktok.com/@arcavena2024",
      label: "@arcavena2024",
      icon: <Tiktok />,
    },
    {
      urlLink: "ttps://www.instagram.com/arcavena2024",
      label: "@arcavena2024",
      icon: <Instagram />,
    },
    {
      urlLink: "https://x.com/tpbfsrditb2023",
      label: "@tpbfsrditb2023",
      icon: <Twitter />,
    },
  ];

  return (
    <div className="flex h-full min-h-screen w-full flex-col justify-between">
      <div className="mx-auto flex w-full grow flex-col items-center justify-center gap-8 pt-10">
        <h1 className="w-fit max-w-[24rem] px-4 text-center font-vollkorn text-[38px] font-semibold tracking-wider text-white shadow-gray-400 text-shadow xxs:text-[32px] xs:text-[40px]">
          Media sosial Kami
        </h1>
        <div className="mx-auto flex w-full max-w-[600px] flex-col gap-4 px-8 font-bold text-white">
          {socialMedias?.map((el, i) => (
            <Link key={i} to={el.urlLink} target="_blank">
              <button
                className="flex w-full flex-row justify-start gap-8 rounded-xl bg-gradient-to-t from-[#9D62E8] to-[#af89e0] px-8 py-4 font-yrsa text-2xl hover:brightness-90 md:py-6"
                data-aos="fade-up"
              >
                <div className="h-8 w-8 shrink-0">{el.icon}</div>
                <p className="text-center text-xl tracking-wider md:text-2xl">
                  {el.label}
                </p>
              </button>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MediaSosialPage;
