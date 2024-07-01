import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
// import L1_00_Mobile from "../../components/Home/L1_00_Mobile";
import L1_00_Desktop from "../../components/Home/L1_00_Desktop";

const ReservasiAcara = () => {
  return (
    <div>
      <div className="relative flex h-fit min-h-[60vh] flex-col items-center justify-between">
        <div className="absolute left-0 top-0 z-[0] h-screen w-screen bg-gradient-to-t from-[#0b004b] to-[#520088]">
          <L1_00_Desktop />
        </div>
        <div className="absolute left-0 top-0 z-[0] h-screen w-screen bg-gradient-to-t from-[#0b004b] to-[#0b014b]/50"></div>

        <main className="z-[1] flex min-h-fit grow flex-col items-center justify-center gap-8 pt-10 md:gap-12">
          <h1 className="w-fit max-w-[24rem] px-4 text-center font-vollkorn text-[38px] font-semibold tracking-wider text-white shadow-purple-500 text-shadow xxs:text-[32px] xs:text-[40px]">
            Reservasi Acara
          </h1>
          <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
            <img
              src="/assets\tabel.webp"
              alt=""
              className="h-auto w-[70vw] sm:w-60 lg:w-80"
            />
            <div className="flex flex-col items-center">
              <Button>
                <Link to="/reservasi/daftar/1">
                  <p className="px-2 py-8 text-2xl shadow-black drop-shadow-md">
                    Daftar Tiket
                  </p>
                </Link>
              </Button>
              <Button color="white">
                <Link to="/reservasi/tiket-saya">
                  <p className="px-2 py-10 shadow-black drop-shadow-md">
                    Tiket Saya
                  </p>
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ReservasiAcara;
