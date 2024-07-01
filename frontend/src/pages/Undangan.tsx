import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";

export default function Undangan() {
  return (
    <div className="flex min-h-screen flex-col content-center items-center justify-center bg-gradient-to-b from-[#0B004B] from-15% to-[#5626A5]">
      <div className=" w-grow z-10 -mb-20 h-auto content-center justify-center px-5 pt-10 xl:-mb-40 xl:px-10">
        <div className="flex flex-col items-center px-10 py-10">
          <img className=" w-max xl:w-1/2" src="/assets\TITLE.webp" />
        </div>
        <h1 className=" -mt-8 text-center font-lato text-lg text-white xl:-mt-20">
          Pameran Akademik TPB FSRD ITB 2023
        </h1>
      </div>
      <div className="w-grow z-0 flex flex-col items-center py-10 xl:w-1/2 ">
        <img className="w-grow h-auto" src="/assets\bg_undangan.webp " />
      </div>
      <div className="z-10 -mt-10">
        <h1 className="text-center font-lato text-base text-white">
          TPB FSRD ITB Mengundang
        </h1>
        <h1 className="mt-5 p-5 text-center font-vollkorn text-4xl font-semibold text-white [text-shadow:_5px_5px_50px_white] sm:text-6xl lg:text-5xl">
          KMSR
        </h1>
        <h1 className=" text-1xl -mt-5 text-center font-yrsa font-semibold text-white [text-shadow:_5px_5px_50px_white] sm:text-4xl lg:text-3xl">
          IPPDIG, INDDES, VASA, IMDI, TERIKAT
        </h1>
      </div>
      <div className="mt-10 flex flex-col items-center justify-start">
        <NavLink
          to="/reservasi"
          className="mb-5 w-[170px] rounded-full bg-orange-400 px-6 py-4 text-center font-bold text-white hover:bg-orange-500"
        >
          Registrasi
        </NavLink>
        <NavLink
          to="/alamat"
          className="w-[150px] rounded-full bg-yellow-100 px-4 py-2 text-center font-bold text-[#0B004B] hover:bg-blue-200"
        >
          Peta
        </NavLink>
      </div>
      <h1 className="mt-5 p-5 text-center font-vollkorn text-4xl font-semibold text-white [text-shadow:_5px_5px_50px_white] sm:text-6xl lg:text-5xl">
        Rundown
      </h1>
      <h1 className="text-1xl -mt-5 text-center font-yrsa font-semibold text-white [text-shadow:_5px_5px_50px_white] sm:text-4xl lg:text-3xl">
        22-23 Juni 2024
      </h1>
      <div className=" flex flex-col items-center px-10 py-10 xl:w-1/2">
        <img className="" src="/assets\tabel.webp" />
      </div>
      <Footer />
    </div>
  );
}
