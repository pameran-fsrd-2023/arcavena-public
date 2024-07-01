import { useNavigate, useParams } from "react-router-dom";
import Instagram from "../../components/Instagram";
import LinkedIn from "../../components/LinkedIn";
import Behance from "../../components/Behance";
import Twitter from "../../components/Twitter";
import { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import Swal from "sweetalert2";
import axios, { AxiosError } from "axios";
import Image from "../../components/Image";

interface Ikarya {
  _id?: string | null;
  file: File | null | undefined;
  filePreviewUrl?: string;
  dimensi: string;
  media: string;
  nama: string;
  prodi: string;
}

const ProfileFSRDEditPage = () => {
  const { nim } = useParams();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [karyas, setKaryas] = useState<Ikarya[]>([
    {
      _id: null,
      file: null,
      filePreviewUrl: "",
      nama: "",
      prodi: "",
      media: "",
      dimensi: "",
    },
    {
      _id: null,
      file: null,
      filePreviewUrl: "",
      nama: "",
      prodi: "",
      media: "",
      dimensi: "",
    },
    {
      _id: null,
      file: null,
      filePreviewUrl: "",
      nama: "",
      prodi: "",
      media: "",
      dimensi: "",
    },
    {
      _id: null,
      file: null,
      filePreviewUrl: "",
      nama: "",
      prodi: "",
      media: "",
      dimensi: "",
    },
    {
      _id: null,
      file: null,
      filePreviewUrl: "",
      nama: "",
      prodi: "",
      media: "",
      dimensi: "",
    },
  ]);

  const handleProfilePicChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    limit: number,
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          Swal.fire({
            icon: "error",
            title: "Tipe file tidak sesuai",
            text: "Tolong masukkan file image, suggested types (webp, svg)",
            footer:
              '<a href="https://www.iloveimg.com" target="_blank">Image processing website for free <span style="color:blue;">https://www.iloveimg.com</span></a>',
          });
          return;
        }
        if (file.size > limit * 1024 * 1024) {
          Swal.fire({
            icon: "error",
            title: "Maaf, file terlalu besar!",
            text: "File size exceeds the limit (16MB).",
            footer:
              '<a href="https://www.iloveimg.com" target="_blank">Compress here https://www.iloveimg.com</a>',
          });
          return;
        }

        setProfilePic(file);
      }
    }
  };

  const handleKaryaFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    limit: number,
    idx: number,
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          Swal.fire({
            icon: "error",
            title: "Tipe file tidak sesuai",
            text: "Tolong masukkan file image, suggested types (webp, svg)",
            footer:
              '<a href="https://www.iloveimg.com" target="_blank">Image processing website for free <span style="color:blue;">https://www.iloveimg.com</span></a>',
          });
          return;
        }
        if (file.size > limit * 1024 * 1024) {
          Swal.fire({
            icon: "error",
            title: "Maaf, file terlalu besar!",
            text: "File size exceeds the limit (16MB).",
            footer:
              '<a href="https://www.iloveimg.com" target="_blank">Compress here https://www.iloveimg.com</a>',
          });
          return;
        }

        // Create a new array to update the state
        const updatedKaryas = [...karyas];
        updatedKaryas[idx] = {
          ...updatedKaryas[idx],
          file: file,
          filePreviewUrl: URL.createObjectURL(file),
        };
        setKaryas(updatedKaryas);
      }
    }
  };

  const [formData, setFormData] = useState({
    displayName: "",
    prodi: "",
    profilePicUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    linkedInUrl: "",
    behanceUrl: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    try {
      setFormData((formData) => ({
        ...formData,
        [name]: value,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Swal.fire({
        icon: "info",
        title: "Yakin ingin menyimpan perubahan?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      });

      if (response.isConfirmed) {
        const {
          displayName,
          prodi,
          instagramUrl,
          twitterUrl,
          linkedInUrl,
          behanceUrl,
        } = formData;

        const fd = new FormData();
        fd.append("displayName", displayName as string);
        fd.append("prodi", prodi);
        fd.append(
          "socialMedia",
          JSON.stringify({
            instagramUrl,
            twitterUrl,
            linkedInUrl,
            behanceUrl,
          }),
        );
        if (profilePic) {
          fd.append("profilePic", profilePic);
        }

        karyas.forEach((karya, index) => {
          if (karya) {
            fd.append(`karya${index + 1}`, karya.file as File);
            fd.append(`karya${index + 1}Id`, karya._id as string);
            fd.append(`karya${index + 1}Name`, karya.nama);
            fd.append(`karya${index + 1}Prodi`, karya.prodi);
            fd.append(`karya${index + 1}Dimensi`, karya.dimensi);
            fd.append(`karya${index + 1}Media`, karya.media);
          }
        });

        const access_token = localStorage.getItem("access_token");
        if (!access_token) {
          navigate("/auth/sign-in");
          return;
        }

        await axios.put(
          import.meta.env.VITE_BASE_BACKEND_URL + "/profile/fsrd/" + nim,
          fd,
          { headers: { access_token, is_fsrd: true } },
        );

        await Swal.fire("Saved!", "", "success");
        navigate("/profile-fsrd/" + nim);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        Swal.fire({
          icon: "error",
          title: "Gagal Login",
          text: error?.response?.data as string,
        });
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const setInitialData = async () => {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_BASE_BACKEND_URL + "/profile/fsrd/" + nim,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
              is_fsrd: true,
            },
          },
        );
        const karyas = data.karyas.map(
          (el: {
            _id: string;
            imgUrl: string;
            title: string;
            matkul: string;
            dimensi: string;
            media: string;
          }) => ({
            _id: el?._id,
            file: null,
            filePreviewUrl: el?.imgUrl,
            nama: el?.title,
            prodi: el?.matkul,
            dimensi: el?.dimensi,
            media: el?.media,
          }),
        );

        setFormData({
          profilePicUrl: data?.profilePicUrl || "",
          displayName: data?.displayName || "",
          prodi: data?.prodi || "",
          instagramUrl: data?.socialMedia?.instagramUrl || "",
          twitterUrl: data?.socialMedia?.twitterUrl || "",
          linkedInUrl: data?.socialMedia?.linkedInUrl || "",
          behanceUrl: data?.socialMedia?.behanceUrl || "",
        });

        setKaryas(karyas);
      } catch (error) {
        console.error(error);
      }
    };
    setInitialData();
  }, [nim]);

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#0B014B] to-[#351F74] p-4 pb-8 pt-6 text-white">
      {loading && (
        <div className="fixed left-0 top-0 z-[300] h-screen w-screen animate-pulse bg-black/90"></div>
      )}
      <div className="flex max-w-[calc(min(1300px,90vw))] flex-col gap-8 rounded-lg bg-white/30 p-4 md:px-16 md:py-8">
        <h1 className="text-4xl font-bold uppercase tracking-wide">
          Edit Profile nim: {nim}
        </h1>
        <form
          action="post"
          className="flex w-full flex-col gap-12"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="flex aspect-[17/23] w-[400px] max-w-[80vw] flex-col gap-1">
              <p className="text-xs uppercase tracking-wide text-gray-300">
                profile picture
              </p>
              <input
                type="file"
                name="profilePic"
                id="profilePic"
                onChange={(e) => handleProfilePicChange(e, 8)}
                accept="image/*"
                className="hidden"
              />
              <label
                htmlFor="profilePic"
                className="w-full cursor-pointer hover:brightness-75"
              >
                {profilePic || formData.profilePicUrl ? (
                  <Image
                    src={
                      profilePic
                        ? URL.createObjectURL(profilePic)
                        : formData.profilePicUrl
                    }
                    alt="Profile"
                    className="aspect-[17/22] h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[17/22] h-auto w-full cursor-pointer flex-col items-center justify-center border-[1px] border-dashed border-white">
                    <CiImageOn
                      style={{ width: "60%", height: "auto", aspectRatio: 1 }}
                    />
                    <p className="px-4 text-2xl uppercase">
                      Upload Profile Image
                    </p>
                  </div>
                )}
              </label>
            </div>

            <section className="flex grow flex-col gap-12">
              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="displayName"
                  className="text-xs uppercase tracking-wide text-gray-300"
                >
                  display Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  id="displayName"
                  autoComplete="new-password"
                  value={formData?.displayName}
                  onChange={handleFormChange}
                  className="border-b-2 bg-white/0 p-1 text-xl outline-none focus:outline-white/0 focus:ring-0"
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <p className="text-xs uppercase tracking-wide text-gray-300">
                  prodi
                </p>
                <div className="space-x-2">
                  <input
                    type="radio"
                    name="prodi"
                    id="Seni Rupa"
                    value="seni-rupa"
                    checked={formData.prodi == "seni-rupa"}
                    onChange={handleFormChange}
                  />
                  <label htmlFor="Seni Rupa">Seni Rupa</label>
                </div>
                <div className="space-x-2">
                  <input
                    type="radio"
                    name="prodi"
                    id="Kriya"
                    value="kriya"
                    checked={formData.prodi == "kriya"}
                    onChange={handleFormChange}
                  />
                  <label htmlFor="Kriya">Kriya</label>
                </div>
                <div className="space-x-2">
                  <input
                    type="radio"
                    name="prodi"
                    id="Desain Komunikasi Visual"
                    value="desain-komunikasi-visual"
                    checked={formData.prodi == "desain-komunikasi-visual"}
                    onChange={handleFormChange}
                  />
                  <label htmlFor="Desain Komunikasi Visual">
                    Desain Komunikasi Visual
                  </label>
                </div>
                <div className="space-x-2">
                  <input
                    type="radio"
                    name="prodi"
                    id="Desain Produk"
                    value="desain-produk"
                    checked={formData.prodi == "desain-produk"}
                    onChange={handleFormChange}
                  />
                  <label htmlFor="Desain Produk">Desain Produk</label>
                </div>
                <div className="space-x-2">
                  <input
                    type="radio"
                    name="prodi"
                    id="Desain Interior"
                    value="desain-interior"
                    checked={formData.prodi == "desain-interior"}
                    onChange={handleFormChange}
                  />
                  <label htmlFor="Desain Interior">Desain Interior</label>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <p className="text-xs uppercase tracking-wide text-gray-300">
                  social media account
                </p>
                <div className="flex w-full items-center gap-1">
                  <label
                    htmlFor="instagramUrl"
                    className="text-xs uppercase tracking-wide text-gray-300"
                  >
                    <div className="h-[2.1rem] w-[2.1rem] ">
                      <Instagram />
                    </div>
                  </label>
                  <input
                    type="text"
                    name="instagramUrl"
                    id="instagramUrl"
                    autoComplete="new-password"
                    value={formData.instagramUrl}
                    onChange={handleFormChange}
                    className="grow border-b-2 bg-white/0 p-1 text-sm outline-none focus:outline-white/0 focus:ring-0"
                  />
                </div>
                <div className="flex w-full items-center gap-1">
                  <label
                    htmlFor="twitterUrl"
                    className="text-xs uppercase tracking-wide text-gray-300"
                  >
                    <div className="h-[2.1rem] w-[2.1rem]">
                      <Twitter />
                    </div>
                  </label>
                  <input
                    type="text"
                    name="twitterUrl"
                    id="twitterUrl"
                    autoComplete="new-password"
                    value={formData.twitterUrl}
                    onChange={handleFormChange}
                    className="grow border-b-2 bg-white/0 p-1 text-sm outline-none focus:outline-white/0 focus:ring-0"
                  />
                </div>
                <div className="flex w-full items-center gap-1">
                  <label
                    htmlFor="linkedInUrl"
                    className="text-xs uppercase tracking-wide text-gray-300"
                  >
                    <div className="h-[2.1rem] w-[2.1rem]">
                      <LinkedIn />
                    </div>
                  </label>
                  <input
                    type="text"
                    name="linkedInUrl"
                    id="linkedInUrl"
                    autoComplete="new-password"
                    value={formData.linkedInUrl}
                    onChange={handleFormChange}
                    className="grow border-b-2 bg-white/0 p-1 text-sm outline-none focus:outline-white/0 focus:ring-0"
                  />
                </div>
                <div className="flex w-full items-center gap-1">
                  <label
                    htmlFor="behanceUrl"
                    className="text-xs uppercase tracking-wide text-gray-300"
                  >
                    <div className="h-[2.1rem] w-[2.1rem]">
                      <Behance />
                    </div>
                  </label>
                  <input
                    type="text"
                    name="behanceUrl"
                    id="behanceUrl"
                    autoComplete="new-password"
                    value={formData.behanceUrl}
                    onChange={handleFormChange}
                    className="grow border-b-2 bg-white/0 p-1 text-sm outline-none focus:outline-white/0 focus:ring-0"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="flex h-full w-full flex-wrap justify-between gap-4">
            {[0, 1, 2, 3, 4].map((el) => (
              <section
                className="flex w-full flex-col gap-6 rounded-md bg-white/20 px-4 pb-8 pt-4 xs:gap-2 lg:w-[49%]"
                key={el}
              >
                <p className="text-xl font-light uppercase tracking-wide text-gray-100">
                  - Karya {el + 1} {el == 0 && "(Highlight)"}
                </p>
                <div className="flex w-full flex-col items-baseline gap-1 xs:flex-row">
                  <label
                    htmlFor={`namaKarya${el}`}
                    className="shrink-0 text-lg tracking-wide text-white"
                  >
                    Judul Karya:
                  </label>
                  <input
                    type="text"
                    name={`namaKarya${el}`}
                    id={`namaKarya${el}`}
                    autoComplete="new-password"
                    defaultValue={karyas[el]?.nama}
                    onChange={(e) =>
                      setKaryas((karyas) => {
                        const newKaryas = [...karyas];
                        newKaryas[el].nama = e.target.value;
                        return newKaryas;
                      })
                    }
                    className="w-full grow border-b-2 bg-white/0 px-1 text-sm outline-none focus:outline-white/0 focus:ring-0 xs:w-0"
                  />
                </div>
                <div className="flex w-full flex-col items-baseline gap-1 xs:flex-row">
                  <label
                    htmlFor={`prodiKarya${el}`}
                    className="shrink-0 text-lg tracking-wide text-white"
                  >
                    Mata kuliah:
                  </label>
                  <input
                    type="text"
                    name={`prodiKarya${el}`}
                    id={`prodiKarya${el}`}
                    autoComplete="new-password"
                    defaultValue={karyas[el]?.prodi}
                    onChange={(e) =>
                      setKaryas((karyas) => {
                        const newKaryas = [...karyas];
                        newKaryas[el].prodi = e.target.value;
                        return newKaryas;
                      })
                    }
                    className="w-full grow border-b-2 bg-white/0 px-1 text-sm outline-none focus:outline-white/0 focus:ring-0 xs:w-0"
                  />
                </div>
                <div className="flex w-full flex-col items-baseline gap-1 xs:flex-row">
                  <label
                    htmlFor={`dimensi${el}`}
                    className="shrink-0 text-lg tracking-wide text-white"
                  >
                    Dimensi:
                  </label>
                  <input
                    type="text"
                    name={`dimensi${el}`}
                    id={`dimensi${el}`}
                    autoComplete="new-password"
                    defaultValue={karyas[el]?.dimensi}
                    onChange={(e) =>
                      setKaryas((karyas) => {
                        const newKaryas = [...karyas];
                        newKaryas[el].dimensi = e.target.value;
                        return newKaryas;
                      })
                    }
                    className="w-full grow border-b-2 bg-white/0 px-1 text-sm outline-none focus:outline-white/0 focus:ring-0 xs:w-0"
                  />
                </div>
                <div className="flex w-full flex-col items-baseline gap-1 xs:flex-row">
                  <label
                    htmlFor={`media${el}`}
                    className="shrink-0 text-lg tracking-wide text-white"
                  >
                    Media:
                  </label>
                  <input
                    type="text"
                    name={`media${el}`}
                    id={`media${el}`}
                    autoComplete="new-password"
                    defaultValue={karyas[el]?.media}
                    onChange={(e) =>
                      setKaryas((karyas) => {
                        const newKaryas = [...karyas];
                        newKaryas[el].media = e.target.value;
                        return newKaryas;
                      })
                    }
                    className="w-full grow border-b-2 bg-white/0 px-1 text-sm outline-none focus:outline-white/0 focus:ring-0 xs:w-0"
                  />
                </div>
                <input
                  type="file"
                  name={`karya${el}`}
                  id={`karya${el}`}
                  onChange={(e) => handleKaryaFileChange(e, 16, el)}
                  accept="image/*"
                  className="hidden"
                />
                <label
                  htmlFor={`karya${el}`}
                  className="flex w-full cursor-pointer justify-center pt-4 hover:brightness-75"
                >
                  {karyas[el]?.filePreviewUrl ? (
                    <Image
                      src={karyas[el].filePreviewUrl as string}
                      width={400}
                      height={400}
                      key={`karya${el}Preview`}
                      alt="Profile"
                      className="aspect-square h-auto w-[60%] object-contain"
                    />
                  ) : (
                    <div
                      key={`karya${el}Input`}
                      className="flex aspect-square w-[60%]  cursor-pointer flex-col items-center justify-center rounded-md border-[1px] border-dashed border-white object-cover sm:w-[60%]"
                    >
                      <CiImageOn style={{ width: "60%", height: "60%" }} />
                      <p className="text-center text-2xl uppercase">
                        Upload Image
                      </p>
                    </div>
                  )}
                </label>
              </section>
            ))}
          </div>

          <div className="flex w-full flex-col gap-2 md:flex-row md:gap-0">
            <button className="w-full md:w-[50%] md:pr-1">
              <div className="w-full rounded-lg bg-[#F5893A] px-4 py-2 font-bold text-white hover:brightness-105 hover:drop-shadow-md">
                Submit
              </div>
            </button>
            <button
              className="w-full  md:w-[50%] md:pl-1"
              type="button"
              onClick={() => navigate(`/profile-fsrd/${nim}`)}
            >
              <div className="rounded-lg bg-white/70 px-4 py-2 text-black hover:bg-white/80 hover:brightness-105 hover:drop-shadow-md">
                Cancel
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileFSRDEditPage;
