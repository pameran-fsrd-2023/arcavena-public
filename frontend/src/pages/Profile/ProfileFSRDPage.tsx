import { useNavigate, useParams } from "react-router-dom";
import Image from "../../components/Image";
import { IoIosLink } from "react-icons/io";
import { MdModeEdit, MdLogout } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GoPerson } from "react-icons/go";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import SocialMediaList from "../../components/Profile/SocialMediaList";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Footer from "../../components/Footer";
import ProfileBg from "../../assets/Profile/BGProfile.svg";

const ProfileFSRDPage = () => {
  const navigate = useNavigate();
  const { nim } = useParams();
  const [userData, setUserData] = useState({
    profilePicUrl: "",
    displayName: "",
    prodi: "",
    socialMedia: {
      instagramUrl: "",
      twitterUrl: "",
      linkedInUrl: "",
      behanceUrl: "",
    },
    karyas: [
      {
        _id: "",
        fileUrl: "",
        nama: "",
        matkul: "",
      },
      {
        _id: "",
        fileUrl: "",
        nama: "",
        matkul: "",
      },
      {
        _id: "",
        fileUrl: "",
        nama: "",
        matkul: "",
      },
      {
        _id: "",
        fileUrl: "",
        nama: "",
        matkul: "",
      },
    ],
  });
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
        const karyas = data.karyas.map(
          (el: {
            _id: string;
            imgUrl: string;
            title: string;
            matkul: string;
          }) => ({
            _id: el?._id,
            fileUrl: el?.imgUrl,
            nama: el?.title,
            matkul: el?.matkul,
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
  }, [nim]);

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#0B014B] via-[#351F74] to-[#0B014B]">
      <div className="absolute-container absolute z-[0] h-[80vh] w-full">
        <img
          src={ProfileBg}
          alt="cyberpunk"
          className="h-full w-full select-none object-cover object-center"
        />
      </div>

      <div className="relative z-[200] flex flex-col items-center  px-2 pb-8 pt-6 text-white">
        <div className="mx-auto h-full w-full max-w-[1100px] px-0 xs:px-4 sm:px-6">
          <div className="mx-auto flex h-full w-fit items-center justify-center gap-4 xxs:justify-start sm:gap-8">
            {userData.profilePicUrl ? (
              <Image
                src={userData.profilePicUrl || ""}
                alt="Pp"
                className="z-[100] aspect-[33/43] w-[50%] min-w-[140px] max-w-[440px] rounded-md border-[4px] border-purple-900 object-cover duration-300 ease-in hover:scale-105"
              />
            ) : (
              <div className="z-[100] flex aspect-[33/43] w-[50%] min-w-[140px] max-w-[337px] items-center justify-center rounded-md border-[4px] border-purple-900 object-cover duration-300 ease-in hover:scale-105">
                <GoPerson className="h-auto w-[80%]" />
              </div>
            )}
            <section className="z-[100] hidden h-full max-w-fit grow flex-col gap-4 xxs:flex md:gap-8">
              <div className="space-y-1" data-aos="fade-up">
                <p className="text-base font-light uppercase tracking-wider text-gray-100 sm:text-xl">
                  {userData?.prodi || "prodi"}
                </p>
                <h1 className="font-openSans text-lg font-bold sm:text-3xl md:text-2xl">
                  {userData?.displayName || "nama mahasiswa"}
                </h1>
              </div>
              <h2 className="text-base md:text-xl" data-aos="fade-up">
                NIM mahasiswa: {nim || "19623xxx"}
              </h2>
              <div className="hidden xs:block" data-aos="fade-up">
                <SocialMediaList socialMedia={userData.socialMedia} />
              </div>
              <div className="flex w-full flex-col items-start gap-2">
                <p
                  className="text-sm font-light uppercase tracking-wider text-gray-200"
                  data-aos="fade-up"
                >
                  Actions
                </p>
                <div className="flex gap-2" data-aos="fade-up">
                  <button
                    className="rounded-lg border-[1px] bg-none p-1 hover:bg-white/20"
                    title="copy profile link"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        import.meta.env.VITE_BASE_URL +
                          window.location.pathname,
                      );
                    }}
                  >
                    <IoIosLink size={25} color="white" />
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
              </div>
            </section>
          </div>
          <section className="z-[100] flex h-full max-w-fit grow flex-col gap-4 px-4 py-4 xxs:hidden xxs:px-0 md:gap-8">
            <div className="space-y-1">
              <p className="text-base font-light uppercase tracking-wider text-gray-100 sm:text-xl">
                {userData.prodi}
              </p>
              <h1 className="font-openSans text-lg font-bold sm:text-3xl md:text-2xl">
                {userData.displayName}
              </h1>
            </div>
            <h2 className="text-base md:text-xl">NIM mahasiswa: {nim}</h2>
            <div className="z-[100] hidden xs:block">
              <SocialMediaList socialMedia={userData.socialMedia} />
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <p className="text-sm font-light uppercase tracking-wider text-gray-200">
                Actions
              </p>
              <div className="flex gap-2">
                <button className="rounded-lg border-[1px] bg-none p-1 hover:bg-white/20">
                  <IoIosLink size={25} color="white" />
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
            </div>
          </section>
          <div className="block px-4 py-4 xxs:px-0 xs:hidden">
            <SocialMediaList socialMedia={userData.socialMedia} />
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
            {userData.karyas.map((karya, i) =>
              karya.fileUrl ? (
                <SwiperSlide key={i}>
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <Image
                      key={i}
                      src={karya.fileUrl}
                      alt="Pp"
                      className="duration-50 h-auto max-h-[70%] w-[70%] cursor-pointer object-contain ease-in hover:brightness-90 "
                    />
                    <div className="flex flex-col gap-2 py-4 text-center font-serif">
                      <p className="text-3xl font-bold capitalize tracking-wider">
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
            {userData.karyas.map((karya, i) =>
              karya.fileUrl ? (
                <div
                  key={i}
                  className={`aspect-square h-auto`}
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
