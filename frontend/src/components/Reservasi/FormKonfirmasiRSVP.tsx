import Button from "../Button";
import Footer from "../Footer";
import Image from "../Image";

interface IFormData {
  jumlahPengunjung: number;
  pengunjungs: string[];
  sesiDay1: string;
  sesiDay2: string;
}

const FormKonfirmasiRSVP = ({
  formData,
  onSubmit,
  onBack,
}: {
  formData: IFormData;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}) => {
  return (
    <div className="flex min-h-screen flex-col justify-between font-jomolhari">
      <form
        className="mx-auto flex h-fit w-full max-w-[800px] grow flex-col items-center justify-center p-4 text-white"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        <h2 className="text-balance text-center text-xl" data-aos="fade-up">
          Pastikan Datamu sudah benar!
        </h2>
        <div
          className="flex h-auto w-[80%] max-w-[20rem] flex-col items-center justify-center"
          data-aos="fade-up"
        >
          <Image src="/home/karakter/Creli.webp" />
        </div>

        <div
          className="mx-auto w-full max-w-[600px] font-openSans"
          data-aos="zoom-in-up"
        >
          <table className="w-full table-auto border">
            <thead>
              <tr>
                <th className="w-[5rem] max-w-[5rem] border-b-2 border-r-2 px-4 py-2 text-left">
                  No.
                </th>
                <th className="border-b-2 px-4 py-2 text-left">
                  Nama Pengunjung
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.pengunjungs.map((pengunjung, index) => (
                <tr key={index}>
                  <td className="border-r-2 px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{pengunjung}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="my-4 text-left">
            Jumlah Pengunjung: {formData.jumlahPengunjung}
          </p>
          <div className="grid grid-cols-2 gap-4 py-8">
            <div>
              <h3 className="text-md mb-2 uppercase">Sesi Day 1:</h3>
              <p className="pl-2 font-sans tracking-wider">
                {formData?.sesiDay1}
              </p>
            </div>
            <div>
              <h3 className="text-md mb-2 uppercase">Sesi Day 2:</h3>
              <p className="pl-2 font-sans tracking-wider">
                {formData?.sesiDay2}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-center gap-12 pt-8 sm:flex-row">
          <Button type="button" color="white" onClick={onBack}>
            <p className="px-4 text-black shadow-black drop-shadow-md">
              Kembali
            </p>
          </Button>
          <Button type="submit">
            <p className="px-2 font-bold text-white shadow-black drop-shadow-md">
              Submit
            </p>
          </Button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default FormKonfirmasiRSVP;
