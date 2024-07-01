import { NavLink, Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import AquaGem from "../../assets/Pameran/ButtonGems/AquaGem.svg";
import OrangeGem from "../../assets/Pameran/ButtonGems/OrangeGem.svg";
import PurpleGem from "../../assets/Pameran/ButtonGems/PurpleGem.svg";
import GameFooter from "../../assets/Game/GameFooter.svg";
import Peta from "../../assets/Game/Peta.svg";
import { GoBook } from "react-icons/go";
import { CiCamera } from "react-icons/ci";
import Image from "../../components/Image";

const GameLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-0 min-h-fit w-screen grow flex-col">
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
      <div className="relative flex h-fit w-full grow flex-col justify-between bg-[#0B004B] text-white lg:hidden">
        <img
          className="absolute bottom-0 left-0 h-auto w-full sm:hidden"
          src={GameFooter}
          alt="footer"
        />
        <div className="absolute bottom-0 left-0 hidden h-auto w-full sm:flex">
          <img className="h-auto w-[50%]" src={GameFooter} alt="footer" />
          <img className="h-auto w-[50%]" src={GameFooter} alt="footer" />
        </div>
        <Outlet />
        <section className="flex w-full justify-evenly pb-4">
          <NavLink
            to="/game/story"
            className="relative aspect-square h-auto w-[6rem] max-w-[24%] hover:brightness-[80%]"
          >
            <img src={AquaGem} alt="Aqua Gem" className="h-full w-full" />
            <div className="absolute inset-y-0 left-0 flex h-full w-full flex-col items-center justify-center p-4 font-vollkorn text-base font-extrabold text-white shadow-black/70 drop-shadow-md text-shadow-sm">
              <GoBook size={40} />
            </div>
          </NavLink>

          <NavLink
            to={location.pathname === "/game/scan" ? "/game" : "/game/scan"}
            className="relative aspect-square h-auto w-[6rem] max-w-[24%] hover:brightness-[80%]"
          >
            <img src={PurpleGem} alt="Purple Gem" className="h-full w-full" />
            <div className="absolute inset-y-0 left-0 flex h-full w-full flex-col items-center justify-center p-2 font-vollkorn text-base font-extrabold text-white shadow-black/70 drop-shadow-md text-shadow-sm">
              {location.pathname === "/game/scan" ? (
                <div className="absolute inset-y-0 left-0 flex h-full w-full flex-col items-center justify-center p-2 font-vollkorn text-base font-extrabold text-blue-800 shadow-black/70 drop-shadow-md text-shadow-sm">
                  <Image src={Peta} className="h-full w-full px-2 pb-2" />
                </div>
              ) : (
                <CiCamera size={50} />
              )}
            </div>
          </NavLink>

          <NavLink
            to="/nirmana"
            className={`relative aspect-square h-auto w-[6rem] max-w-[24%] hover:brightness-[80%]`}
          >
            <img src={OrangeGem} alt="" className={`h-full w-full`} />
            <div className="absolute inset-y-0 left-0 flex h-full w-full flex-col items-center justify-center p-2 font-vollkorn text-base font-extrabold text-blue-800 shadow-black/70 drop-shadow-md text-shadow-sm">
              <Image src="/home/nirmana.png" className="h-full w-full" />
            </div>
          </NavLink>
        </section>
      </div>
    </div>
  );
};

export default GameLayout;
