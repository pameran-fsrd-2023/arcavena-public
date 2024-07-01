import axios from "axios";
import { BACKEND_URL } from "../../lib/constant";
import useFetch from "../../lib/hooks/useFetch";
import QRCode from "react-qr-code";
import Footer from "../../components/Footer";
import L1_00_Desktop from "../../components/Home/L1_00_Desktop";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../components/Image";
import Swal from "sweetalert2";

interface ITiket {
  _id: string;
  jumlahPengunjung: number;
  pengunjungs: string[];
  sesiDay1: string;
  sesiDay2: string;
}

const TiketSaya = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<ITiket>(
    async () =>
      await axios.get(BACKEND_URL + "/tickets/mine", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      }),
  );

  const hapusTiket = async () => {
    try {
      const result = await Swal.fire({
        title: "Menghapus Tiket Reservasi",
        text: "Apa anda yakin ingin untuk menghapus tiket anda?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Tidak",
      });

      if (!result.isConfirmed) return;

      await axios.delete(BACKEND_URL + "/tickets/mine", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      navigate("/reservasi");
    } catch (error) {
      Swal.fire({
        icon: "error",
        titleText: "Gagal",
        text: "Mohon kontak admin",
      });
    }
  };

  if (error) {
    return (
      <div className="relative flex w-full flex-col items-center justify-center pt-12 text-white">
        <div className="absolute left-0 top-0 z-[0] h-screen w-screen bg-gradient-to-t from-[#0b004b] to-[#520088]">
          <L1_00_Desktop />
        </div>
        <h1 className="z-[1] w-fit max-w-[24rem] px-4 text-center font-vollkorn text-[38px] font-semibold tracking-wider text-white shadow-white text-shadow-lg xxs:text-[32px] xs:text-[40px]">
          Tiket Saya
        </h1>
        <p>Mohon maaf, fitur sedang dalam pengembangan</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center pt-12 text-white">
      <div className="absolute left-0 top-0 z-[0] h-screen w-screen bg-gradient-to-t from-[#0b004b] to-[#520088]">
        <L1_00_Desktop />
      </div>
      <div className="absolute left-0 top-0 z-[0] h-screen w-screen bg-gradient-to-t from-[#0b004b] to-[#0b014b]/50"></div>
      <h1 className="z-[1] w-fit max-w-[24rem] grow px-4 text-center font-vollkorn text-[38px] font-semibold tracking-wider text-white shadow-purple-500 text-shadow xxs:text-[32px] xs:text-[40px]">
        Tiket Saya
      </h1>

      {loading ? (
        <>
          <p className="z-[1]">Loading...</p>
          <div
            className="flex h-auto w-[80%] max-w-[30rem] flex-col items-center justify-center"
            data-aos="fade-up"
          >
            <Image src="/home/karakter/Creli.webp" />
          </div>
        </>
      ) : data ? (
        <div className="z-[1] flex w-full flex-col gap-2 p-4 pt-8">
          <p className="text-md text-balance px-4 text-center font-inknutAntiqua">
            Terima kasih sudah memesan tiket reservasi, berikut detail tiket
            beserta QR yang akan digunakan saat acara
          </p>

          <div
            className="mx-auto flex h-auto w-[80%] max-w-[30rem] flex-col items-center justify-center"
            data-aos="fade-up"
          >
            <Image src="/home/karakter/Creli.webp" />
          </div>
          <p className="text-balance px-4 text-center font-jomolhari text-base">
            **Jika terjadi kesalahan dalam sesi atau nama, harap menghapus tiket
            (Batalkan Tiket, dapat ditemukan di bawah) dan memesannya kembali
          </p>
          <p className="mx-auto">. . .</p>
          {data?.pengunjungs?.map((person, i) => (
            <div
              key={i}
              className="flex w-full flex-col items-center justify-center gap-0 py-4 sm:items-start md:flex-row-reverse md:gap-8"
              data-aos="zoom-in-up"
            >
              <div className="flex w-[300px] max-w-[85vw] flex-col">
                <p className="pb-2 text-base uppercase tracking-wider text-gray-200">
                  Nama
                </p>
                <p className="text-2xl">{person}</p>
                <div className="flex gap-4 py-4">
                  <div>
                    <p className="font-openSans uppercase tracking-wider text-slate-200">
                      Sesi Day 1
                    </p>
                    <p>{data.sesiDay1 as string}</p>
                  </div>
                  <div>
                    <p className="font-openSans uppercase tracking-wider text-slate-200">
                      Sesi Day 2
                    </p>
                    <p>{data.sesiDay2 as string}</p>
                  </div>
                </div>
              </div>

              <div className="aspect-square h-auto w-full max-w-[300px] grow-0 rounded-md bg-white p-2">
                <QRCode
                  value={`${data?._id};${person}`}
                  className="h-full w-full"
                />
              </div>
            </div>
          ))}
          <div className="mx-auto w-fit py-6">
            <Button color="white" onClick={hapusTiket}>
              <p className="px-2 shadow-black drop-shadow-md hover:text-red-500">
                Batalkan Tiket
              </p>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex grow flex-col items-center py-10">
          <p className="z-[2] font-inknutAntiqua text-white">
            Belum ada tiket yang dipesan, pesan sekarang?
          </p>
          <div
            className="flex h-auto w-[80%] max-w-[30rem] flex-col items-center justify-center"
            data-aos="fade-up"
          >
            <Image src="/home/karakter/Creli.webp" />
          </div>
          <div>
            <Button>
              <Link to="/reservasi/daftar/1">
                <p className="px-2 py-4 text-2xl shadow-black drop-shadow-md">
                  Pesan
                </p>
              </Link>
            </Button>
          </div>
        </div>
      )}
      <div className="flex w-full justify-center py-6">
        <Button color="white">
          <Link to="/reservasi">
            <p className="px-4 py-2">Kembali</p>
          </Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default TiketSaya;
