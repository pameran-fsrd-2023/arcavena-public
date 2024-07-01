import yellowButtonBG from "../assets/yellowButtonBG.svg";
import whiteButtonBG from "../assets/whiteButtonBG.svg";
import yellowButtonBGCoin from "../assets/yellowButtonBGCoin.svg";
import Image from "./Image";

const Button = ({
  children,
  type = "button",
  isCoin = false,
  color = "yellow",
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  isCoin?: boolean;
  color?: "yellow" | "white";
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const getImg = () => {
    if (isCoin) return yellowButtonBGCoin;
    if (color == "yellow") {
      return yellowButtonBG;
    }
    return whiteButtonBG;
  };
  return (
    <button
      type={type}
      className={`h-fit w-fit ${disabled ? "brightness-75" : "hover:brightness-95"}`}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute left-0 top-0 flex h-full w-full grow items-center justify-center self-stretch">
          <Image src={getImg()} alt="Button Image" />
        </div>
        <div
          className={`z-[2] px-6 font-yrsa text-xl font-bold ${color !== "white" ? "text-white" : "text-[#0B004B]"}`}
        >
          {children}
        </div>
      </div>
    </button>
  );
};

export default Button;
