import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Nirmana from "../../components/Nirmana";
import Button from "../../components/Button";
import {
  colorPalette,
  defaultNirmana5x5,
  defaultNirmana10x10,
  BACKEND_URL,
} from "../../lib/constant";
import Footer from "../../components/Footer";
import RightButton from "../../assets/Game/Button.svg";

type NirmanaSize = "small" | "medium";

const EditNirmana: React.FC = () => {
  const [size, setSize] = useState<NirmanaSize>("small");
  const [colors, setColors] = useState<string[][]>(defaultNirmana5x5);
  const [pickedColor, setPickedColor] = useState<string>("#FFFFFF");
  const [colorPaletteIdx, setColorPaletteIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSize = localStorage.getItem("nirmana-size") as NirmanaSize;
    const storedColors = localStorage.getItem(`nirmana-colors-${storedSize}`);

    if (storedSize) {
      setSize(storedSize);
    }

    if (storedColors) {
      setColors(JSON.parse(storedColors));
    } else if (storedSize === "medium") {
      setColors(defaultNirmana10x10);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nirmana-size", size);
    localStorage.setItem(`nirmana-colors-${size}`, JSON.stringify(colors));
  }, [size, colors]);

  const handleColorClick = (color: string) => {
    setPickedColor(color);
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const newColors = colors.map((row, rIdx) =>
      row.map((col, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? pickedColor : col,
      ),
    );
    setColors(newColors);
  };

  const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSize = event.target.value as NirmanaSize;
    setSize(newSize);
    const storedColors = localStorage.getItem(`nirmana-colors-${newSize}`);
    if (storedColors) {
      setColors(JSON.parse(storedColors));
    } else {
      setColors(newSize === "small" ? defaultNirmana5x5 : defaultNirmana10x10);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${BACKEND_URL}/nirmanas/mine`,
        {
          data: { size, colors },
        },
        { headers: { access_token: localStorage.getItem("access_token") } },
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Nirmana saved successfully!",
      }).then(() => {
        navigate("/game");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save Nirmana.",
      });
    }
  };

  const handleCancel = () => {
    navigate("/game");
  };

  const handleLeftClick = () => {
    setColorPaletteIdx((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : colorPalette.length - 1,
    );
  };

  const handleRightClick = () => {
    setColorPaletteIdx((prevIndex) =>
      prevIndex < colorPalette.length - 1 ? prevIndex + 1 : 0,
    );
  };

  return (
    <>
      <section
        className="hidden h-0 min-h-fit w-screen grow flex-col lg:flex"
        key="mark"
      >
        <div className="hidden h-full w-full flex-col bg-gradient-to-t from-[#50239d] via-[#0b004b] to-[#0b004b] lg:flex">
          <div className="flex h-fit w-full grow items-center justify-center">
            <div className="flex h-fit w-full max-w-[800px] flex-col-reverse items-center justify-center gap-8 py-20 text-white md:flex-row">
              <div className="max-w-[400px] space-y-4">
                <p className="font-vollkorn text-3xl">
                  Gunakan SmartPhone untuk memainkan game.
                </p>
                <p className="font-lato">
                  Maaf minigame ini tidak tersedia untuk perangkat desktop,
                  silakan ganti perangkat anda ke smartphone.
                </p>
              </div>
              <img src="/assets/games/smartphone.svg" alt="smartphone" />
            </div>
          </div>
          <Footer />
        </div>
      </section>
      <section
        className="flex h-fit w-screen grow flex-col px-2 text-white lg:hidden"
        key="mark"
      >
        <div className="flex h-fit min-h-full w-full flex-col items-center rounded-md bg-gradient-to-t from-[#7246E5]/30 to-[#7246E5]/30 p-4">
          <div className="aspect-square h-[80vw] max-h-[280px] w-[80vw] max-w-[280px] p-4 xs:h-[80vw] xs:w-[80vw]">
            <Nirmana size={size} data={colors} onCellClick={handleCellClick} />
          </div>
          <section className="flex items-center gap-2 py-2">
            <label htmlFor="nirmana-size" className="font-lato">
              Size:
            </label>
            <select
              id="nirmana-size"
              name="size"
              value={size}
              onChange={handleSizeChange}
              className="rounded border bg-white p-2 text-black"
            >
              <option value="small">5x5</option>
              <option value="medium">10x10</option>
            </select>
          </section>
          <section className="flex h-fit w-full flex-col">
            <div className="flex items-center justify-center gap-2">
              <div
                className={`h-6 w-6`}
                style={{ backgroundColor: pickedColor }}
              />
              <h1 className="py-2 text-center font-lato">
                Warna (*tekan untuk pilih)
              </h1>
            </div>
            <div className="my-4 flex h-fit w-full flex-wrap justify-center gap-4 overflow-y-auto bg-black/50 px-1 py-2">
              <button onClick={handleLeftClick}>
                <img
                  src={RightButton}
                  alt=""
                  className="h-auto w-6 scale-x-[-1]"
                />
              </button>
              <div className="flex grow flex-wrap justify-between gap-[1.5px]">
                {colorPalette?.[colorPaletteIdx]?.map((color, index) => (
                  <div
                    key={index}
                    className={`aspect-square h-auto cursor-pointer border-2 ${
                      pickedColor === color
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    style={{
                      backgroundColor: color,
                      width: `${190 / colorPalette[colorPaletteIdx].length}%`,
                    }}
                    onClick={() => handleColorClick(color)}
                  />
                ))}
              </div>
              <button onClick={handleRightClick}>
                <img src={RightButton} alt="" className="h-auto w-6" />
              </button>
            </div>
          </section>
          <div className="flex justify-center gap-8 py-4">
            <Button onClick={handleSave}>Save</Button>
            <Button color="white" onClick={handleCancel}>
              Kembali
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditNirmana;
