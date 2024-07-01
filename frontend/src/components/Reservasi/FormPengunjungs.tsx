import { useEffect, useState } from "react";
import Button from "../Button";
import Footer from "../Footer";
import Image from "../Image";
import Swal from "sweetalert2";

const FormPengunjungs = ({
  jumlahPengunjung,
  value,
  onChange,
  onBack,
  onSubmit,
}: {
  jumlahPengunjung: number;
  value: string[];
  onChange: (pengunjungs: string[]) => void;
  onBack: () => void;
  onSubmit: () => void;
}) => {
  const [emptyIndexes, setEmptyIndexes] = useState<number[]>([]);

  // Ensure the value array has the correct length
  useEffect(() => {
    if (value.length !== jumlahPengunjung) {
      onChange(Array(jumlahPengunjung).fill(""));
    }
    setEmptyIndexes(Array(jumlahPengunjung).fill(false));
  }, [jumlahPengunjung, onChange, value.length]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emptyIndexes: number[] = [];
    value.forEach((val, idx) => {
      if (!val.trim()) {
        emptyIndexes.push(idx);
      }
    });

    if (emptyIndexes.length > 0) {
      setEmptyIndexes(emptyIndexes);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Harap isi semua kolom pengunjung!",
      });
      return;
    }

    onSubmit();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const newValue = [...value];
    const inputValue = e.target.value.slice(0, 50);

    // Check if the input consists only of numbers (0-9)
    if (!/^([^0-9]*)$/.test(inputValue) && inputValue !== "") {
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: "Mohon maaf tidak bisa memasukkan angka ke dalam nama",
      });
      return; // Do not update the value if it contains non-numeric characters
    }

    newValue[idx] = inputValue;
    onChange(newValue);

    setEmptyIndexes((prevIndexes) =>
      prevIndexes.filter((index) => index !== idx),
    );
  };

  return (
    <div className="flex min-h-screen w-full flex-col justify-between font-jomolhari">
      <form
        className="mx-auto flex h-fit w-full max-w-[800px] grow flex-col items-center justify-center p-4 text-white"
        onSubmit={handleSubmit}
      >
        <div
          className="flex h-auto w-[80%] max-w-[20rem] flex-col items-center justify-center"
          data-aos="fade-up"
        >
          <Image src="/home/karakter/Narici.webp" />
        </div>
        <h2
          className="text-balance pb-8 text-center text-2xl"
          data-aos="zoom-in-up"
        >
          Siapa saja nih yang akan datang?
        </h2>
        <div className="flex w-full max-w-[600px] flex-col gap-2 py-4">
          {Array.from({ length: jumlahPengunjung }, (_, idx) => (
            <div
              key={idx}
              className="flex items-end gap-2"
              data-aos="zoom-in-up"
            >
              <p className="text-xl">{idx + 1}.</p>
              <input
                type="text"
                name={`${idx}`}
                className={`w-full grow border-b-[1px] pl-1 text-xl text-white focus:outline-none ${
                  emptyIndexes.includes(idx) ? "bg-red-200" : "bg-transparent"
                }`}
                value={value[idx] || ""}
                maxLength={50} // Set max length to 50
                onChange={(e) => handleInputChange(e, idx)}
              />
            </div>
          ))}
        </div>
        <div
          className="flex flex-col-reverse items-center justify-center gap-12 pt-8 sm:flex-row"
          data-aos="zoom-in-up"
        >
          <Button type="button" color="white" onClick={onBack}>
            <p className="px-4 text-black shadow-black drop-shadow-md">
              Kembali
            </p>
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

export default FormPengunjungs;
