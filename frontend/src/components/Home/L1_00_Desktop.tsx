import Image from "../Image";

const L1_00_Desktop = () => {
  return (
    <div className="relative h-full w-full">
      <Image
        alt="Lyaer 1-0 Desktop"
        src="/home/L1_00.webp"
        className="h-full w-full place-content-center object-cover"
      />
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-[#0b004b] via-[rgba(11,0,75,0.4)] to-white/0" />
    </div>
  );
};

export default L1_00_Desktop;
