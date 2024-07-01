import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";

const NirmanaLayout = () => {
  return (
    <div className="flex h-0 w-screen grow flex-col px-2 text-white">
      {/* For Desktop view */}
      <div className="hidden h-full w-full flex-col bg-gradient-to-t from-[#50239d] via-[#0b004b] to-[#0b004b] lg:flex">
        <div className="flex h-fit w-full grow items-center justify-center">
          <div className="flex h-fit w-full max-w-[800px] flex-col-reverse items-center justify-center gap-8 py-20 text-white md:flex-row">
            <div className="max-w-[400px] space-y-4">
              <p className="font-vollkorn text-3xl">
                Gunakan SmartPhone untuk memainkan game.
              </p>
              <p className="font-lato">
                Maaf minigame ini tidak tersedia untuk perangkat desktop,
                silakan ganti perangkat anda ke smartphone.
              </p>
            </div>
            <img src="/assets/games/smartphone.svg" alt="smartphone" />
          </div>
        </div>
        <Footer />
      </div>
      {/* For Mobile view */}
      <div className="relative flex h-full w-full flex-col justify-between text-white lg:hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default NirmanaLayout;
