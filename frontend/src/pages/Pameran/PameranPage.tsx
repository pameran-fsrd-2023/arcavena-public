import KenaliSeniman from "../../assets/Pameran/KenaliSeniman.svg";
import Divider from "../../assets/Divider.svg";
import AquaGem from "../../assets/Pameran/ButtonGems/AquaGem.svg";
import OrangeGem from "../../assets/Pameran/ButtonGems/OrangeGem.svg";
import PurpleGem from "../../assets/Pameran/ButtonGems/PurpleGem.svg";
import Footer from "../../components/Footer";
import useFetch from "../../lib/hooks/useFetch";
import axios from "axios";
import { BACKEND_URL } from "../../lib/constant";
import React, { useState, useEffect, useCallback } from "react";
import Image from "../../components/Image";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import { debounce } from "lodash";

interface IUser {
  displayName: string;
  nim: string;
}
interface IKarya {
  _id: string;
  dimensi: string;
  imgUrl: string;
  media: string;
  matkul: string;
  title: string;
  previewUrl: string;
  user: IUser;
}

interface IModalData {
  imgUrl: string;
  title: string;
  author: string;
  UserNIM: string;
}

const PameranPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modal, showModal] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [modalData, setModalData] = useState<IModalData | null>(null);
  const [prodi, setProdi] = useState("");

  const fetchFunction = useCallback(() => {
    const queryParams = new URLSearchParams(location.search);
    const prodiParam = queryParams.get("prodi");
    const filterNameParam = queryParams
      .get("filterName")
      ?.replace(/\s+/g, "-")
      .toLowerCase();
    return axios.get(
      `${BACKEND_URL}/karyas${prodiParam || filterNameParam ? `?${prodiParam ? `prodi=${prodiParam}` : ""}${filterNameParam ? `&filterName=${filterNameParam}` : ""}` : ""}`,
    );
  }, [location.search]);
  const { data, loading, setLoading, error, refetch } = useFetch<IKarya[]>(
    fetchFunction,
    true,
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const prodiParam = queryParams.get("prodi");
    const filterNameParam = queryParams.get("filterName");
    if (prodiParam) {
      setProdi(prodiParam);
    }
    if (filterNameParam) {
      setFilterName(filterNameParam);
    }
  }, [location.search]);

  const handleCLick = (data: IModalData) => {
    setModalData(data);
    showModal(true);
  };

  const handleRefetch = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5-second delay
    refetch();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedProdiChange = useCallback(
    debounce((formattedProdi: string, filterName: string) => {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set("prodi", formattedProdi);
      queryParams.set("filterName", filterName);
      navigate(`/pameran?${queryParams.toString()}`);
      setProdi(formattedProdi);
    }, 300), // 500ms debounce
    [location.search, navigate],
  );

  const handleProdiChange = (prodi: string) => {
    const queryParams = new URLSearchParams(location.search);
    const prodiParam = queryParams.get("prodi");
    let formattedProdi = prodi.toLowerCase().replace(/\s+/g, "-");
    if (formattedProdi === prodiParam) {
      formattedProdi = "";
    }
    debouncedProdiChange(formattedProdi, filterName);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilterNameChange = useCallback(
    debounce((value: string) => {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set("filterName", value);
      queryParams.set("prodi", prodi);
      navigate(`/pameran?${queryParams.toString()}`);
    }, 300), // 500ms debounce
    [location.search, prodi, navigate],
  );

  const handleChangeFilterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterName(value);
    debouncedFilterNameChange(value);
  };

  return (
    <div>
      <div
        id="modal"
        className={`fixed left-0 z-[20] h-screen w-screen delay-75 duration-200 ease-in ${modal ? "top-0" : "top-[-200%]"}`}
      >
        <div className="h-full w-full bg-black/40" />
        <div
          className="absolute left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center p-4"
          onClick={() => {
            showModal(false);
            setModalData(null);
          }}
        >
          <section
            className="w-full max-w-[500px] rounded-md bg-gradient-to-t from-[#0B004B] to-[#9D62E8] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalData?.imgUrl}
              alt={modalData?.title}
              className="aspect-square h-auto w-full bg-black/20 object-cover"
            />
            <div className="flex w-full items-stretch justify-between text-white">
              <div className="min-h-[5rem] py-4">
                <p className="font-yrsa text-xl font-bold">
                  {modalData?.title}
                </p>
                <p className="font-lato">{modalData?.author}</p>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  color="white"
                  onClick={() =>
                    navigate(`/profile-fsrd/${modalData?.UserNIM}`)
                  }
                >
                  Kunjungi
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="relative z-[0] h-[50vh] w-screen overflow-hidden md:h-[70vh]">
        <img
          src={(data?.[0]?.imgUrl as string) || KenaliSeniman}
          alt=""
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-[#0b004b] to-[#0b014b]/50" />
        <p className="absolute left-5 top-5 w-[300px] font-vollkorn text-5xl font-semibold tracking-wider text-white md:left-20 md:text-[90px]">
          Kenali Seniman
        </p>
        <img
          src={Divider}
          alt=""
          className="absolute bottom-[-10%] left-0 h-[50%] w-full object-cover"
        />
      </div>
      <div className="gradient-to-t z-[1] from-[#0b004b] to-[#0b014b]/50">
        <main className="mx-auto max-w-[1100px] px-2">
          <input
            type="text"
            placeholder="Temukan artist..."
            value={filterName}
            onChange={handleChangeFilterName}
            className="w-full rounded-xl bg-white px-6 py-2"
          />
          <section className="flex justify-between py-10">
            <button
              className={`relative aspect-square h-auto w-[24%] ${prodi !== "desain-produk" && "hover:brightness-[130%]"}`}
              onClick={() => handleProdiChange("Desain Produk")}
            >
              <img
                src={PurpleGem}
                alt=""
                className={`h-full w-full ${prodi !== "desain-produk" && "brightness-[60%]"}`}
              />
              <div className="absolute inset-y-0 left-0 flex h-full w-full items-center justify-center font-vollkorn text-xl text-white shadow-black/70 text-shadow-sm sm:text-3xl md:text-[50px]">
                <p>DP</p>
              </div>
            </button>
            <button
              className={`relative aspect-square h-auto w-[24%] ${prodi !== "kriya" && "hover:brightness-[130%]"}`}
              onClick={() => handleProdiChange("Kriya")}
            >
              <img
                src={AquaGem}
                alt=""
                className={`h-full w-full ${prodi !== "kriya" && "brightness-[60%]"}`}
              />
              <div className="absolute inset-y-0 left-0 flex h-full w-full items-center justify-center font-vollkorn text-xl text-white shadow-black/70 text-shadow-sm sm:text-3xl md:text-[50px]">
                <p>KRY</p>
              </div>
            </button>
            <button
              className={`relative aspect-square h-auto w-[24%] ${prodi !== "desain-komunikasi-visual" && "hover:brightness-[130%]"}`}
              onClick={() => handleProdiChange("Desain Komunikasi Visual")}
            >
              <img
                src={PurpleGem}
                alt=""
                className={`h-full w-full ${prodi !== "desain-komunikasi-visual" && "brightness-[60%]"}`}
              />
              <div className="absolute inset-y-0 left-0 flex h-full w-full items-center justify-center font-vollkorn text-xl text-white shadow-black/70 text-shadow-sm sm:text-3xl md:text-[50px]">
                <p>DKV</p>
              </div>
            </button>
            <button
              className={`relative aspect-square h-auto w-[24%] ${prodi !== "seni-rupa" && "hover:brightness-[130%]"}`}
              onClick={() => handleProdiChange("Seni Rupa")}
            >
              <img
                src={OrangeGem}
                alt=""
                className={`h-full w-full ${prodi !== "seni-rupa" && "brightness-[60%]"}`}
              />
              <div className="absolute inset-y-0 left-0 flex h-full w-full items-center justify-center font-vollkorn text-xl text-white shadow-black/70 text-shadow-sm sm:text-3xl md:text-[50px]">
                <p>SR</p>
              </div>
            </button>
            <button
              className={`relative aspect-square h-auto w-[24%] ${prodi !== "desain-interior" && "hover:brightness-[130%]"}`}
              onClick={() => handleProdiChange("Desain Interior")}
            >
              <img
                src={PurpleGem}
                alt=""
                className={`h-full w-full ${prodi !== "desain-interior" && "brightness-[60%]"}`}
              />
              <div className="absolute inset-y-0 left-0 flex h-full w-full items-center justify-center font-vollkorn text-xl text-white shadow-black/70 text-shadow-sm sm:text-3xl md:text-[50px]">
                <p>DI</p>
              </div>
            </button>
          </section>
          <section className="flex h-20 w-full items-center justify-center py-20">
            <Button onClick={() => handleRefetch()}>
              <p className="px-4 text-2xl">Refresh</p>
            </Button>
          </section>
          <section className="flex w-full flex-wrap justify-center gap-[3px]">
            {loading ? (
              <React.Fragment>
                {Array.from({ length: 12 })?.map((_, i) => (
                  <button
                    key={i}
                    className="aspect-square w-[32%] animate-pulse bg-gray-300 sm:w-[24.5%]"
                  ></button>
                ))}
              </React.Fragment>
            ) : error ? (
              <div className="flex max-h-[20rem] animate-pulse flex-col items-center">
                <Image
                  src="/home/karakter/Narici.webp"
                  className="mx-auto h-full w-auto"
                />
                <p className="font-vollkorn text-2xl text-white">
                  Mohon maaf, belum ada karya :(
                </p>
              </div>
            ) : (data?.length as number) > 0 ? (
              <React.Fragment>
                {data?.map((el, i) => (
                  <button
                    key={i}
                    className="h-fit w-[32%] hover:brightness-[80%] sm:w-[24.5%]"
                    onClick={() =>
                      handleCLick({
                        imgUrl: el?.imgUrl,
                        title: el?.title,
                        author: el?.user?.displayName,
                        UserNIM: el?.user?.nim,
                      })
                    }
                  >
                    <Image
                      src={el.previewUrl}
                      alt={el.title}
                      className="aspect-square h-auto w-full bg-white object-cover"
                      loading="lazy"
                    />
                    <div className="max-w-full py-2 text-white">
                      <p>{el?.user?.displayName}</p>
                      <p>{el?.user?.nim}</p>
                    </div>
                  </button>
                ))}
              </React.Fragment>
            ) : (
              <div className="flex max-h-[20rem] flex-col items-center">
                <Image
                  src="/home/karakter/Narici.webp"
                  className="mx-auto h-full w-auto"
                />
                <p className="font-vollkorn text-2xl text-white">
                  Mohon maaf, belum ada karya :(
                </p>
              </div>
            )}
          </section>
          <section className="flex h-28 w-full items-center justify-center py-20">
            <Button onClick={() => handleRefetch()}>
              <p className="px-4 text-2xl">Refresh</p>
            </Button>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PameranPage;
