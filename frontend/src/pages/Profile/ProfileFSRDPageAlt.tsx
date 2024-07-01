import { useNavigate, useParams } from "react-router-dom";
import Image from "../../components/Image";
import { IoIosShareAlt } from "react-icons/io";
import { MdModeEdit, MdLogout } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GoPerson } from "react-icons/go";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Footer from "../../components/Footer";
import SocialMediaListAlt from "../../components/Profile/SocialMediaListAlt";
import Swal from "sweetalert2";

interface Ikarya {
  _id?: string | null;
  fileUrl: string;
  matkul: string;
  dimensi: string;
  media: string;
  title: string;
  nama: string;
}

interface ISocialMedia {
  instagramUrl: string;
  twitterUrl: string;
  linkedInUrl: string;
  behanceUrl: string;
}

interface IUserData {
  profilePicUrl: string;
  displayName: string;
  prodi: string;
  socialMedia: ISocialMedia;
  karyas: Ikarya[];
}

const ProfileFSRDPage = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [currentImage, setCurrentImage] = useState<Ikarya | null>(null);

  const toggleVisibility = (karya: Ikarya | null) => {
    if (karya) {
      setCurrentImage(null);
      setCurrentImage(karya);
    }

    setIsHidden(!isHidden); // Toggle isHidden state
  };

  const navigate = useNavigate();
  const { nim } = useParams();
  const [userData, setUserData] = useState<IUserData | null>(null);
  const { setUser, user } = useContext(CurrentUserContext);

  const handleLogout = () => {
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
  };

  useEffect(() => {
    const setInitialData = async () => {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_BASE_BACKEND_URL + "/profile/fsrd/" + nim,
        );
        if (!data.nim) {
          await Swal.fire({
            icon: "error",
            title: "Oops..",
            text: "User Tidak ditemukan",
          });
          navigate("/");
        }
        const karyas = data.karyas.map(
          (el: {
            _id: string;
            imgUrl: string;
            title: string;
            matkul: string;
            media: string;
            dimensi: string;
          }) => ({
            _id: el?._id,
            fileUrl: el?.imgUrl,
            nama: el?.title,
            matkul: el?.matkul,
            media: el?.media,
            dimensi: el?.dimensi,
          }),
        );
        setUserData({
          profilePicUrl: data.profilePicUrl,
          displayName: data.displayName,
          prodi: data.prodi,
          socialMedia: {
            instagramUrl: data?.socialMedia?.instagramUrl,
            twitterUrl: data?.socialMedia?.twitterUrl,
            linkedInUrl: data?.socialMedia?.linkedInUrl,
            behanceUrl: data?.socialMedia?.behanceUrl,
          },
          karyas,
        });
      } catch (error) {
        console.error(error);
      }
    };
    setInitialData();
  }, [nim, navigate]);

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#0B014B] via-[#351F74] to-[#0B014B]">
      <div
        id="modal"
        className={`fixed left-0 z-[2000] h-screen w-screen delay-75 duration-200 ease-in ${!isHidden ? "top-0" : "top-[-200%]"}`}
      >
        <div className="h-full w-full bg-black/40" />
        <div
          className="absolute left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center p-4"
          onClick={() => toggleVisibility(null)}
        >
          <section
            className="w-full max-w-[500px] rounded-md bg-[#33296d] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-fit w-full">
              <img
                src={currentImage?.fileUrl}
                alt={currentImage?.title}
                className="h-auto w-full bg-black/30 object-contain"
              />
            </div>
            <div className="flex w-full items-stretch justify-between text-white">
              <div className="p-5 text-white">
                <h2 className="mb-2 font-vollkorn font-bold">
                  {currentImage?.nama}
                </h2>
                <p className="font-lato text-sm">{currentImage?.matkul}</p>
                <p className="font-lato text-sm">{currentImage?.media}</p>
                <p className="font-lato text-sm">{currentImage?.dimensi}</p>
                {/* Render other properties of currentImage as needed */}
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="absolute-container absolute z-[0] h-[80vh] w-full">
        <img
          src={userData?.karyas[0]?.fileUrl}
          alt="cyberpunk"
          className="h-full w-full select-none object-cover object-center"
        />
      </div>

      <div className="relative z-[200] flex flex-col items-center  px-0 pb-8 pt-0 text-white">
        <div className="flex w-full flex-row gap-2 p-2">
          <button
            className="rounded-lg border-[1px] bg-none p-1 text-left hover:bg-white/20"
            title="copy profile link"
            onClick={() => {
              navigator.clipboard.writeText(
                import.meta.env.VITE_BASE_URL + window.location.pathname,
              );
            }}
          >
            <IoIosShareAlt size={25} color="white" />
          </button>
          {nim === user?.nim && (
            <>
              <button
                className="flex items-center gap-2 rounded-lg border-[1px] bg-none px-2 hover:bg-white/20"
                title="Edit your profile"
                onClick={() => navigate(`/profile-fsrd/${nim}/edit`)}
              >
                <MdModeEdit size={25} color="white" /> Edit
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border-[1px] bg-none px-2 hover:bg-white/20"
                title="Edit your profile"
                onClick={() => handleLogout()}
              >
                <MdLogout size={25} color="white" /> Logout
              </button>
            </>
          )}
        </div>
        <div className="mx-auto h-full w-full max-w-[1100px] px-8 pb-6 pt-8 xs:px-8 sm:px-20">
          <div className="mx-auto flex h-full w-fit items-center justify-center gap-4 sm:gap-8">
            {userData?.profilePicUrl ? (
              <Image
                src={userData?.profilePicUrl || ""}
                alt="Pp"
                className="z-[10] aspect-[33/43] w-[40%] min-w-[100px] max-w-[440px] rounded-md object-cover duration-300 ease-in hover:scale-105"
              />
            ) : (
              <div className="z-[10] flex aspect-[33/43] w-[50%] min-w-[140px] max-w-[337px] items-center justify-center rounded-md border-[4px] border-purple-900 object-cover duration-300 ease-in hover:scale-105">
                <GoPerson className="h-auto w-[80%]" />
              </div>
            )}
            <section className="z-[10] flex h-full max-w-fit grow flex-col gap-1 md:gap-8">
              <div
                className="max-w-32 space-y-1 sm:max-w-48 lg:max-w-full"
                data-aos="fade-up"
              >
                <div className="">
                  <h1 className="font-vollkorn text-lg font-bold [text-shadow:_5px_5px_50px_white] sm:text-2xl lg:text-5xl">
                    {userData?.displayName || "nama mahasiswa"}
                  </h1>
                </div>
                <h2
                  className="font-vollkorn text-lg [text-shadow:_5px_5px_50px_white] sm:text-3xl lg:text-5xl"
                  data-aos="fade-up"
                >
                  {nim || "19623xxx"}
                </h2>
              </div>
              <p className="max-w-24 font-yrsa text-sm font-light capitalize tracking-wider text-gray-100 sm:max-w-96 sm:text-xl lg:text-3xl">
                {userData?.prodi || "prodi"}
              </p>
              <div className="" data-aos="fade-up">
                <SocialMediaListAlt
                  socialMedia={userData?.socialMedia as ISocialMedia}
                />
              </div>
              <div className="flex w-full flex-col items-start gap-2">
                <p
                  className="text-sm font-light uppercase tracking-wider text-gray-200"
                  data-aos="fade-up"
                ></p>
              </div>
            </section>
          </div>
        </div>

        <div className="h-fit w-full max-w-[900px] py-10">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {userData?.karyas.map((karya, i) =>
              karya.fileUrl ? (
                <SwiperSlide key={i}>
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <button
                      onClick={() => toggleVisibility(karya)} // Corrected onClick handling
                      className="h-auto max-h-[100%] w-[70%]"
                    >
                      <div>
                        <Image
                          key={i}
                          src={karya.fileUrl}
                          alt="Pp"
                          className="duration-50 cursor-pointer object-contain ease-in hover:brightness-90 "
                        />
                      </div>
                    </button>

                    <div className="flex flex-col gap-2 py-4 text-center font-serif">
                      <p className="max-w-80 text-2xl font-bold capitalize tracking-wider">
                        {karya.nama}
                      </p>
                      <p className="text-xl">{karya.matkul}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ) : (
                <div key={i} />
              ),
            )}
          </Swiper>
        </div>
        <div className="mx-auto flex max-w-[1100px] flex-col rounded-md px-4 pb-8">
          <div className="flex w-full flex-wrap justify-center gap-1">
            {userData?.karyas?.map((karya, i) =>
              karya.fileUrl ? (
                <div
                  key={i}
                  className={`aspect-square h-auto`}
                  onClick={() => toggleVisibility(karya)}
                  style={{
                    width: `${100 / +(userData.karyas.length + 0.5)}%`,
                  }}
                >
                  <Image
                    src={karya.fileUrl}
                    alt="Pp"
                    className={`duration-50 aspect-square w-full cursor-pointer bg-white/20 object-cover ease-in hover:brightness-90`}
                  />
                </div>
              ) : (
                <div key={i} />
              ),
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileFSRDPage;
