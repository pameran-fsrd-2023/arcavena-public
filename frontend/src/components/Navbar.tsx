import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "./Image";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(CurrentUserContext);

  const [scrollDirection, setScrollDirection] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isNavMobileOpen, setIsNavMobileOpen] = useState(false);

  const handleLogout = async () => {
    const swalResult = await Swal.fire({
      title: "Ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
    });

    if (swalResult.isConfirmed) {
      if (setUser) {
        setUser({
          id: "",
          displayName: "",
          nim: "",
          accessToken: "",
          authType: "",
        });
      }
      localStorage.setItem("access_token", "");
    }
  };

  useEffect(() => {
    const changeShadow = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos === 0) {
        setScrollDirection(true);
      } else if (prevScrollPos > currentScrollPos) {
        setScrollDirection(true);
      } else {
        if (currentScrollPos >= window.innerWidth / 4.8) {
          setScrollDirection(false);
        }
      }
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", changeShadow);

    return () => window.removeEventListener("scroll", changeShadow);
  }, [prevScrollPos]);

  useEffect(() => {
    setScrollDirection(true);
  }, []);

  useEffect(() => {
    if (isNavMobileOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isNavMobileOpen]);

  return (
    <div
      className={`sticky left-0 top-0 z-[10000] flex h-16 w-full items-center justify-between bg-[#0B004B] px-4 text-white shadow-sm duration-150 ease-in md:h-20 md:px-8 ${
        scrollDirection ? "translate-y-0" : "-translate-y-24"
      }`}
    >
      <div onClick={() => navigate("/")}>
        <Image
          src="/assets/icon.webp"
          className="h-[4rem] w-auto cursor-pointer md:h-[4.5rem]"
        />
      </div>
      <div className="hidden gap-8 font-lato font-[500] tracking-wide lg:flex">
        <button>
          <Link to="/">Beranda</Link>
        </button>
        <button>
          <Link to="/tentang">Tentang</Link>
        </button>
        <button>
          <Link to="/media-sosial">Media Sosial</Link>
        </button>
        <button>
          <Link to="/reservasi">Reservasi</Link>
        </button>
        <button>
          <Link to="/alamat">Alamat</Link>
        </button>
        <button>
          <Link to="/sponsor">Sponsor</Link>
        </button>
        <button>
          <Link to="/game">Game</Link>
        </button>
        {user?.displayName ? (
          user?.nim ? (
            <button className="rounded-full border-[1px] border-white px-4 py-2 uppercase shadow-none shadow-white hover:bg-white/20 hover:shadow-md hover:shadow-white">
              <Link to={`/profile-fsrd/${user.nim}`}>
                {user?.displayName.split(" ")[0].length > 10
                  ? user.displayName.slice(0, 10) + "..."
                  : user.displayName.split(" ")[0]}
              </Link>
            </button>
          ) : (
            <button
              className="rounded-full border-[1px] border-white px-4 py-2 uppercase shadow-none shadow-white hover:bg-white/20 hover:shadow-md hover:shadow-white"
              onClick={handleLogout}
            >
              <p>
                {user?.displayName.split(" ")[0].length > 10
                  ? user.displayName.slice(0, 10) + "..."
                  : user.displayName.split(" ")[0]}
              </p>
            </button>
          )
        ) : (
          <button className="rounded-full border-[1px] border-white px-4 py-2 uppercase shadow-none shadow-white hover:bg-white/20 hover:shadow-md hover:shadow-white">
            <Link to="/auth/sign-in">Login</Link>
          </button>
        )}
      </div>
      <div className="flex items-center gap-4 lg:hidden">
        {user?.displayName ? (
          user?.nim ? (
            <button className="rounded-full border-[1px] border-white px-4 py-2 uppercase shadow-none shadow-white hover:bg-white/20 hover:shadow-md hover:shadow-white">
              <Link to={`/profile-fsrd/${user.nim}`}>
                {user?.displayName.split(" ")[0].length > 10
                  ? user.displayName.slice(0, 10) + "..."
                  : user.displayName.split(" ")[0]}
              </Link>
            </button>
          ) : (
            <button
              className="rounded-full border-[1px] border-white px-4 py-2 uppercase shadow-none shadow-white hover:bg-white/20 hover:shadow-md hover:shadow-white"
              onClick={handleLogout}
            >
              <p>
                {user?.displayName.split(" ")[0].length > 10
                  ? user.displayName.slice(0, 10) + "..."
                  : user.displayName.split(" ")[0]}
              </p>
            </button>
          )
        ) : (
          <button className="rounded-full border-[1px] border-white px-4 py-2 uppercase shadow-none shadow-white hover:bg-white/20 hover:shadow-md hover:shadow-white">
            <Link to="/auth/sign-in">Login</Link>
          </button>
        )}
        <div
          className="cursor-pointer"
          onClick={() => setIsNavMobileOpen(true)}
        >
          <GiHamburgerMenu size={25} />
        </div>
      </div>

      <div
        className={
          isNavMobileOpen
            ? "fixed left-0 top-0 z-[10000] h-[100vh] w-screen overflow-hidden bg-black/40 duration-300 ease-in lg:hidden"
            : "fixed left-[200%] top-0 z-[10000] h-[100vh] w-screen overflow-hidden bg-black/40 duration-300 ease-in lg:hidden"
        }
        onClick={() => setIsNavMobileOpen(false)}
      >
        <div className="flex h-full w-full justify-end">
          <div className="flex h-full w-screen max-w-[70%] flex-col gap-8 bg-[#0B004B] px-6 py-4 xxs:max-w-[60%] xs:max-w-[50%] sm:max-w-[40%]">
            <Image
              alt="Arcavena icon"
              src="/assets/icon.webp"
              className="h-auto w-full"
            />
            <div className="flex w-full flex-col justify-start gap-4 text-left">
              <button className="w-fit">
                <Link to="/">Beranda</Link>
              </button>
              <button className="w-fit">
                <Link to="/tentang">Tentang</Link>
              </button>
              <button className="w-fit">
                <Link to="/media-sosial">Media Sosial</Link>
              </button>
              <button className="w-fit">
                <Link to="/reservasi">Reservasi</Link>
              </button>
              <button className="w-fit">
                <Link to="/alamat">Alamat</Link>
              </button>
              <button className="w-fit">
                <Link to="/sponsor">Sponsor</Link>
              </button>
              <button className="w-fit">
                <Link to="/game">Game</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
