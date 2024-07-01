import { Link } from "react-router-dom";
import Instagram from "./Instagram";
import Tiktok from "./Tiktok";
import Twitter from "./Twitter";
import Youtube from "./Youtube";
import Image from "./Image";

const Footer = () => {
  return (
    <div className="relative h-full w-full">
      <Image
        alt="footer Background"
        src="/assets/footerBG.svg"
        className="mx-auto hidden h-full w-full max-w-[1100px] object-cover md:block"
      />
      <Image
        alt="footer Background"
        src="/assets/footerBGMobile.svg"
        className="block h-full w-full object-cover md:hidden"
      />
      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 pt-20 md:pt-48">
        <p className="font-yrsa text-xl text-white">Kunjungi Kami!</p>
        <div className="flex h-[1.5rem] justify-between gap-2">
          <Link
            to="https://www.instagram.com/arcavena2024"
            target="_blank"
            className="flex justify-center"
          >
            <Instagram />
          </Link>
          <Link
            to="https://www.tiktok.com/@arcavena2024"
            target="_blank"
            className="flex justify-center"
          >
            <Tiktok />
          </Link>
          <Link
            to="https://www.youtube.com/@tpbfsrditb2023"
            target="_blank"
            className="flex justify-center"
          >
            <Youtube />
          </Link>
          <Link
            to="https://x.com/tpbfsrditb2023"
            target="_blank"
            className="flex justify-center"
          >
            <Twitter />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
