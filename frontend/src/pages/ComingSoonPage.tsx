import { TypeAnimation } from "react-type-animation";
import Image from "../components/Image";

const ComingSoonPage = () => {
  return (
    <main className="flex min-h-[100vh] w-full flex-col items-center justify-center bg-gradient-to-b from-white/0 to-white/40">
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-white">
        <Image
          src="/home/logo.svg"
          alt="logo arcavena"
          width={200}
          height={400}
          className="h-[30svh] w-auto"
        />
        <TypeAnimation
          sequence={[
            "Coming Soon",
            1000,
            "Coming Soon.",
            1000,
            "Coming Soon..",
            1000,
            "Coming Soon...",
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: "2em", display: "inline-block" }}
          repeat={Infinity}
        />
      </div>
    </main>
  );
};

export default ComingSoonPage;
