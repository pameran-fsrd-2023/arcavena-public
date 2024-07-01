import QRCode from "react-qr-code";
import { BASE_URL } from "../../lib/constant";
import Footer from "../../components/Footer";

const QRGamesPage = () => {
  return (
    <div className="flex h-0 grow flex-col justify-between text-white">
      <h1 className="px-2 py-2 text-center font-lato text-3xl font-bold shadow-white text-shadow-lg">
        Qr codes game
      </h1>
      <h2 className="px-2 text-center">
        Hanya admin (mahasiswa fsrd) yang dapat melihat halaman ini
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        <QRCode
          value={`${BASE_URL}/game/mark/locationA`}
          style={{
            width: "160px",
            height: "160px",
            padding: "4px",
            backgroundColor: "white",
          }}
        />
        <QRCode
          value={`${BASE_URL}/game/mark/locationE`}
          style={{
            width: "160px",
            height: "160px",
            padding: "4px",
            backgroundColor: "white",
          }}
        />
        <QRCode
          value={`${BASE_URL}/game/mark/locationB`}
          style={{
            width: "160px",
            height: "160px",
            padding: "4px",
            backgroundColor: "white",
          }}
        />
        <QRCode
          value={`${BASE_URL}/game/mark/locationC`}
          style={{
            width: "160px",
            height: "160px",
            padding: "4px",
            backgroundColor: "white",
          }}
        />
        <QRCode
          value={`${BASE_URL}/game/mark/locationD`}
          style={{
            width: "160px",
            height: "160px",
            padding: "4px",
            backgroundColor: "white",
          }}
        />
        <QRCode
          value={`${BASE_URL}/game/mark/locationF`}
          style={{
            width: "160px",
            height: "160px",
            padding: "4px",
            backgroundColor: "white",
          }}
        />
      </div>
      <div className="max-h-[20rem] w-full">
        <Footer />
      </div>
    </div>
  );
};

export default QRGamesPage;
