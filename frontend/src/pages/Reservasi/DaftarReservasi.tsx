import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate and useParams from react-router-dom
import FormJumlahPengunjung from "../../components/Reservasi/FormJumlahPengunjung";
import FormPengunjungs from "../../components/Reservasi/FormPengunjungs";
import FormSesi from "../../components/Reservasi/FormSesi";
import FormKonfirmasiRSVP from "../../components/Reservasi/FormKonfirmasiRSVP";
import Swal from "sweetalert2";
import axios from "axios";
import { BACKEND_URL } from "../../lib/constant";
import useFetch from "../../lib/hooks/useFetch";

interface IFormData {
  jumlahPengunjung: number;
  pengunjungs: string[];
  sesiDay1: string;
  sesiDay2: string;
}
interface ITiket {
  _id: string;
  jumlahPengunjung: number;
  pengunjungs: string[];
  sesiDay1: string;
  sesiDay2: string;
}

const DaftarReservasi = () => {
  const [formData, setFormData] = useState<IFormData>({
    jumlahPengunjung: 1,
    pengunjungs: [],
    sesiDay1: "",
    sesiDay2: "",
  });
  const [step, setStep] = useState(1);
  const navigate = useNavigate(); // Use useNavigate from react-router-dom
  const params = useParams(); // Use useParams to get URL parameters
  const { data, loading } = useFetch<ITiket>(
    async () =>
      await axios.get(BACKEND_URL + "/tickets/mine", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      }),
  );

  useEffect(() => {
    if (!loading && data) {
      Swal.fire({
        icon: "info",
        title: "Anda sudah mempunyai tiket",
        text: "Jika ingin merubah, mohon hapus tiket dan pesan kembali",
        footer: "BATALKAN TIKET ada di bagian bawah",
      });
      navigate("/reservasi/tiket-saya");
    }
  }, [data, loading, navigate]);

  useEffect(() => {
    const stepFromParams = parseInt(params.step || "1", 10);

    if (stepFromParams > 2) {
      if (formData.pengunjungs.length === 0) {
        navigate("/reservasi/daftar/1");
        return;
      }

      if (formData.pengunjungs.length !== formData.jumlahPengunjung) {
        navigate("/reservasi/daftar/1");
        return;
      }
    }

    setStep(stepFromParams);
  }, [params, formData, navigate]);

  const goToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
    navigate(`/reservasi/daftar/${step + 1}`); // Update URL
  };

  const onChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((oldFD) => ({
      ...oldFD,
      [name]: name === "jumlahPengunjung" ? +value : value,
    }));
  };

  const getForm = (step: number) => {
    if (step === 1) {
      return (
        <FormJumlahPengunjung
          value={formData.jumlahPengunjung}
          onChange={onChange}
          onSubmit={goToNextStep}
        />
      );
    }
    if (step === 2) {
      return (
        <FormPengunjungs
          jumlahPengunjung={formData.jumlahPengunjung}
          value={formData.pengunjungs}
          onBack={() => navigate("/reservasi/daftar/1")} // Go back to step 1
          onChange={(pengunjungs) => {
            setFormData((oldData) => ({
              ...oldData,
              pengunjungs: pengunjungs,
            }));
          }}
          onSubmit={goToNextStep}
        />
      );
    }
    if (step === 3) {
      return (
        <FormSesi
          day1Value={formData.sesiDay1}
          day2Value={formData.sesiDay2}
          onBack={() => navigate("/reservasi/daftar/2")} // Go back to step 2
          onDay1Change={(sesiDay1) => {
            setFormData((oldData) => ({
              ...oldData,
              sesiDay1: sesiDay1,
            }));
          }}
          onDay2Change={(sesiDay2) => {
            setFormData((oldData) => ({
              ...oldData,
              sesiDay2: sesiDay2,
            }));
          }}
          onSubmit={goToNextStep}
        />
      );
    }
    if (step === 4) {
      return (
        <FormKonfirmasiRSVP
          formData={formData}
          onSubmit={onSubmit}
          onBack={() => navigate("/reservasi/daftar/3")}
        />
      );
    }
    return <></>;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const result = await Swal.fire({
        icon: "warning",
        title: "Konfirmasi",
        text: "Apakah Anda yakin ingin melanjutkan?",
        footer: "Pastikan data anda sudah benar",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });

      if (!result.isConfirmed) {
        return;
      }

      await axios.post(BACKEND_URL + "/tickets", formData, {
        headers: { access_token: localStorage.getItem("access_token") },
      });
      navigate("/reservasi");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Mohon maaf, gagal untuk reservasi, mohon kontak admin)",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-20">
      <h1 className="w-fit max-w-[24rem] px-4 text-center font-vollkorn text-[38px] font-semibold tracking-wider text-white shadow-white text-shadow-lg xxs:text-[32px] xs:text-[40px]">
        Reservasi Acara
      </h1>
      {getForm(step)}
    </div>
  );
};

export default DaftarReservasi;
