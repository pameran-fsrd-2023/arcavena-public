import axios from "axios";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BACKEND_URL } from "../../lib/constant";
import "react-toastify/dist/ReactToastify.css";

const AdminAbsenPage = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function onScanSuccess(
      decodedText: string,
      decodedResult: Html5QrcodeResult,
    ) {
      const temp = decodedText.split(";");
      const TicketId = temp?.[0];
      const namaPengunjung = temp?.[1];

      if (!TicketId || !namaPengunjung) {
        setMsg(`Wrong QR`);
        return;
      }

      setMsg(`Menngisi: ${TicketId}-${namaPengunjung}`);

      await axios.post(
        BACKEND_URL + "/attend",
        { TicketId, namaPengunjung },
        { headers: { access_token: localStorage.getItem("access_token") } },
      );

      toast(`Sukses ${namaPengunjung}`);
      console.log(decodedResult);
    }

    const qrboxFunction = (
      viewfinderWidth: number,
      viewfinderHeight: number,
    ) => {
      return {
        width: viewfinderWidth,
        height: viewfinderHeight,
      };
    };

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 5,
        qrbox: qrboxFunction,
        videoConstraints: {
          facingMode: { exact: "environment" },
        },
      },
      /* verbose= */ false,
    );
    //2nd param for logger on no QR
    html5QrcodeScanner.render(onScanSuccess, () => {
      setMsg("No qr scanned");
    });

    // Change the text of the camera permission button to Indonesian
    const updateElementText = (id: string, text: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = text;
      }
    };
    const updateTexts = () => {
      updateElementText(
        "html5-qrcode-button-camera-permission",
        "Izinkan kamera",
      );
    };

    setTimeout(updateTexts, 700);

    return () => {
      html5QrcodeScanner.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-0 min-h-fit w-screen grow px-2">
      <ToastContainer />
      <p className="w-full bg-white/30 py-6 text-center text-white">
        Info: {msg}
      </p>
      <div
        id="reader"
        className="flex h-fit max-h-fit w-full flex-col items-center justify-center"
      ></div>
    </div>
  );
};

export default AdminAbsenPage;
