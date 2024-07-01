import { Link } from "react-router-dom";
import Button from "../Button";
import Footer from "../Footer";
import Image from "../Image";

const FormJumlahPengunjung = ({
  value,
  onChange,
  onSubmit,
}: {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: () => void;
}) => {
  return (
    <div className="flex min-h-screen flex-col justify-between font-jomolhari">
      <form
        className="mx-auto flex h-fit w-full max-w-[800px] grow flex-col items-center justify-center p-4 text-white"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <h2 className="text-balance text-center text-xl" data-aos="fade-up">
          Halo, selamat datang di reservasi tiket pameran ARCAVENA
        </h2>
        <div
          className="flex h-auto w-[80%] max-w-[20rem] flex-col items-center justify-center"
          data-aos="fade-up"
        >
          <Image src="/home/karakter/Creli.webp" />
        </div>
        <p
          className="text-balance py-4 text-center text-2xl"
          data-aos="zoom-in-up"
        >
          Boleh tau pesan tiket untuk berapa orang?
        </p>
        <div
          className="flex items-center gap-2 py-4 text-xl"
          data-aos="zoom-in-up"
        >
          <p>Jumlah Orang: </p>
          <select
            name="jumlahPengunjung"
            id=""
            value={value}
            onChange={onChange}
            className="rounded-md px-2 text-black"
          >
            <option className="p-1 ">1</option>
            <option className="p-1 ">2</option>
            <option className="p-1 ">3</option>
            <option className="p-1 ">4</option>
          </select>
        </div>
        <div className="flex flex-col-reverse items-center justify-center gap-12 pt-8 sm:flex-row">
          <Button type="button" color="white">
            <Link to="/reservasi">
              <p className="px-4 text-black shadow-black drop-shadow-md">
                Kembali
              </p>
            </Link>
          </Button>
          <Button type="submit">
            <p className="px-2 font-bold text-white shadow-black drop-shadow-md">
              Lanjut
            </p>
          </Button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default FormJumlahPengunjung;
