import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Image from "../components/Image";

const DaftarPage = () => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-between gap-8 bg-gradient-to-b from-[#0B014B] to-[#351F74] pt-20 text-white">
      <Image
        alt="Daftar BG"
        className="absolute left-0 top-0 hidden h-full w-full place-items-center object-cover md:block"
        src="/assets/daftar/daftarbg.svg"
      />
      <Image
        alt="Daftar BG"
        className="absolute left-0 top-0 block h-full w-full place-items-center object-cover md:hidden"
        src="/assets/daftar/daftarbgMobile.svg"
      />
      <div className="absolute left-0 top-0 h-full w-full place-items-center bg-gradient-to-t from-[#351F74] to-[#0b014b11] object-cover " />
      <div className="relative">
        <h1 className="text-shadow-md font-vollkorn text-5xl">Pendaftaran</h1>
        <p className="absolute top-0 font-vollkorn text-5xl text-white blur-sm brightness-150">
          Pendaftaran
        </p>
      </div>
      <main className="z-[1] flex w-full max-w-[600px] flex-col gap-8 px-4 py-6">
        <Link to="/reservasi">
          <button className="flex w-full flex-row justify-center rounded-xl bg-gradient-to-t from-[#9D62E8] to-[#af89e0] px-4 py-6 text-lg hover:shadow-lg hover:shadow-purple-500 hover:brightness-110">
            <p className="text-center">Reservasi Main Event ARCAVENA</p>
          </button>
        </Link>
        <Link
          to="https://docs.google.com/forms/d/10CSz-5AZZ-bCCAAVZNJjob-dvMWwZCaXBwuMeG8MrZg/viewform?edit_requested=true"
          target="_blank"
        >
          <button className="flex w-full flex-row justify-center rounded-xl bg-gradient-to-t from-[#9D62E8] to-[#af89e0] px-4 py-6 text-lg hover:shadow-lg hover:shadow-purple-500 hover:brightness-110">
            <p className="text-center">Pendaftaran Workshop</p>
          </button>
        </Link>
        {/* <button
          className="flex w-full flex-row justify-center rounded-xl bg-gradient-to-t from-[#351F74] to-[#402588] px-4 py-6 text-lg"
          disabled
        >
          <p className="text-center">PARADE "POMPAVERNA"</p>
        </button> */}
      </main>

      <Footer />
    </div>
  );
};

export default DaftarPage;
