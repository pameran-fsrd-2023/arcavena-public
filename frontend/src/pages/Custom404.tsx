import { Link } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";

const Custom404 = () => {
  return (
    <main className="flex h-full min-h-screen w-full flex-col justify-between">
      <div className="flex h-full w-full grow flex-col items-center justify-center gap-8 text-white">
        <p className="w-fit max-w-[24rem] text-center font-vollkorn text-[38px] font-semibold tracking-wider text-white shadow-gray-400 text-shadow-lg xxs:text-[32px] xs:text-[40px]">
          :(
        </p>
        <h1 className="w-fit max-w-[24rem] text-center font-vollkorn text-[38px] font-semibold tracking-wider text-white shadow-gray-400 text-shadow-lg xxs:text-[32px] xs:text-[40px]">
          Halaman Tidak Ditemukan
        </h1>
        <Link to="/">
          <Button isCoin>Beranda</Button>
        </Link>
      </div>
      <Footer />
    </main>
  );
};

export default Custom404;
