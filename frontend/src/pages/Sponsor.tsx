import Footer from "../components/Footer";

export default function Sponsor() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0B004B] to-[#5626A5]">
      <div className="mt-5 w-screen p-5 text-center font-vollkorn text-4xl font-bold text-white [text-shadow:_5px_5px_50px_white] sm:text-6xl lg:text-7xl">
        <h1>Sponsors</h1>
      </div>
      <div className="max-width-screen mx-20 mt-20 flex grow flex-wrap items-center justify-center">
        <div className="flerounded-xl bg-white px-5 py-5">
          <div className="flex flex-wrap items-center justify-center ">
            <img
              className="h-auto w-[500px] sm:h-auto sm:w-[500px] xl:h-auto xl:w-[1000px]"
              src="\assets\LOGO-BANK-INDONESIA (1).webp"
            />
          </div>
          <div className="flex flex-row items-center justify-center mb-10 mt-10">
            <div className="flex flex-wrap justify-center items-center">
              <img
                className="h-auto w-[150px] sm:h-auto sm:w-[225px] xl:h-auto xl:w-[550px]"
                src="\assets\mteraTv.png"
              />
            </div>
            <div className="flex flex-wrap justify-center ">
              <img
                className="h-auto w-[100px] sm:h-auto sm:w-[150px] xl:h-auto xl:w-[300px]"
                src="\assets\LogoArtemedia.webp"
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-evenly">
            <div className="flex flex-wrap justify-center ">
              <img
                className="h-auto w-[87px] sm:h-auto sm:w-[175px] xl:h-auto xl:w-[350px]"
                src="\assets\PHOTO-2024-06-13-16-03-31 1 (1).webp"
              />
            </div>
            <div className="flex flex-wrap justify-center ">
              <img
                className="h-auto w-[50px] sm:h-auto sm:w-[100px] xl:h-auto xl:w-[200px]"
                src="\assets\Logo Ready Meal 2.webp"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
