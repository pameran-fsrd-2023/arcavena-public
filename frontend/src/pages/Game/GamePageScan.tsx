import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../lib/constant";

const GamePageScan = () => {
  const [scanText, setScanText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function onScanSuccess(
      decodedText: string,
      decodedResult: Html5QrcodeResult,
    ) {
      // handle the scanned code as you like, for example:
      setScanText(decodedText);

      // Check if decodedText is a URL pointing to BASE_URL/explore/:location-name
      const urlPattern = new RegExp(`^${BASE_URL}/game/mark/l[a-zA-Z0-9-]+$`);

      console.log(urlPattern);
      if (urlPattern.test(decodedText)) {
        navigate(decodedText.replace(BASE_URL, ""));
      } else {
        console.log("doesnt match");
      }

      //if yes navigate there
      console.log(scanText);
      console.log(`Code matched = ${decodedText}`, decodedResult);
    }

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: {
          width: 220,
          height: 220,
        },
        videoConstraints: {
          facingMode: { exact: "environment" },
        },
      },
      /* verbose= */ false,
    );
    //2nd param for logger on no QR
    html5QrcodeScanner.render(onScanSuccess, () => {});

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
    <section
      className="flex h-[80vh] min-h-fit w-full grow items-center justify-center p-4"
      key="scan"
    >
      <div
        id="reader"
        className="flex h-full max-h-fit w-full flex-col items-center justify-center border-none"
      ></div>
    </section>
  );
};

export default GamePageScan;
