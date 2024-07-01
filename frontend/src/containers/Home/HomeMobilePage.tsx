import { ParallaxBanner } from "react-scroll-parallax";

import L1_00_Mobile from "../../components/Home/L1_00_Mobile";
import L1_01_Mobile from "../../components/Home/L1_01_Mobile";
import L1_02_Mobile from "../../components/Home/L1_02_Mobile";
import L1_03_Mobile from "../../components/Home/L1_03_Mobile";

import L2_Mobile from "../../components/Home/L2_Mobile";
import L3_Mobile from "../../components/Home/L3_Mobile";

import Countdown from "react-countdown";
import CountdownBg from "../../components/Home/CountdownBg";
// import Image from "../../components/Image";
// import Merch from "../../assets/Merch.svg";

import { countdownDeadline } from "../../lib/constant";
// import Nirmana from "../../components/Nirmana";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
// import ComingSoon from "../../components/ComingSoon";
import { Link, NavLink } from "react-router-dom";
import Image from "../../components/Image";

const HomeMobilePage = () => {
  return (
    <div className="w-full bg-[#d1a8e6]">
      <ParallaxBanner
        className="h-[1280vw] w-full"
        layers={[
          {
            speed: -200,
            style: { zIndex: 0 },
            children: (
              <div className="flex h-auto w-full flex-col">
                <L3_Mobile />
                <div className="scale-[101%]">
                  <L3_Mobile />
                </div>
                <div className="scale-[101%]">
                  <L3_Mobile />
                </div>
                <div className="scale-[101%]">
                  <L3_Mobile />
                </div>
                <div className="scale-[101%]">
                  <L3_Mobile />
                </div>
                <div className="scale-[101%]">
                  <L3_Mobile />
                </div>
                <div className="scale-[101%]">
                  <L3_Mobile />
                </div>
              </div>
            ),
          },
          {
            speed: -130,
            style: { zIndex: 2 },
            children: (
              <div
                className="flex h-auto w-full translate-y-[15rem] flex-col"
                style={{ width: "100vw", height: "auto" }}
              >
                <div className="scale-[101%]">
                  <L2_Mobile />
                </div>
                <div className="scale-[101%]">
                  <L2_Mobile />
                </div>
                <div className="scale-[101%]">
                  <L2_Mobile />
                </div>{" "}
                <div className="scale-[101%]">
                  <L2_Mobile />
                </div>
              </div>
            ),
            expanded: false,
          },
          {
            speed: 0,
            style: { zIndex: 3 },
            children: (
              <div className="flex h-full w-full flex-col">
                <div className="relative h-[320vw] w-full scale-[101%]">
                  <div
                    data-aos="fade-up"
                    className="h-fit w-full bg-gradient-to-t from-[#0b004b] to-[#520088]"
                  >
                    <L1_00_Mobile />
                  </div>
                  <div className="h-[100vw] w-full scale-[1.01] bg-[#0b004b]" />
                  <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center">
                    <div className="flex h-1/2 flex-col items-center justify-center gap-4">
                      <Image
                        src="/home/logo.svg"
                        alt="logo arcavena"
                        width={200}
                        height={400}
                        className="h-auto w-[60vw] pr-[6%]"
                      />
                    </div>
                    <div className="flex h-[42%] flex-col items-center justify-center">
                      <Countdown
                        date={countdownDeadline}
                        renderer={({
                          hours,
                          minutes,
                          seconds,
                          completed,
                          days,
                        }) => (
                          <div className="relative h-auto w-[100vw]">
                            <div className="mx-auto h-auto w-[70vw]">
                              <CountdownBg />
                            </div>
                            <div className="absolute inset-y-0 flex h-auto w-full items-center justify-center font-yrsa">
                              <div className="mx-auto flex h-full w-full max-w-[52%] justify-between pt-[3%]">
                                <div className="flex grow flex-col items-center justify-center">
                                  <p className="text-3xl font-bold text-[#F5893A] xxs:text-3xl xs:text-4xl">
                                    {completed ? 0 : days}
                                  </p>
                                  <p className="font-lato text-[12px] text-white">
                                    Hari
                                  </p>
                                </div>
                                <div className="flex grow flex-col items-center justify-center">
                                  <p className="text-3xl font-bold text-[#F5893A] xxs:text-3xl xs:text-4xl">
                                    {completed ? 0 : hours}
                                  </p>
                                  <p className="font-lato text-[12px] text-white">
                                    Jam
                                  </p>
                                </div>
                                <div className="flex grow flex-col items-center justify-center">
                                  <p className="text-3xl font-bold text-[#F5893A] xxs:text-3xl xs:text-4xl">
                                    {completed ? 0 : minutes}
                                  </p>
                                  <p className="font-lato text-[12px] text-white">
                                    Menit
                                  </p>
                                </div>
                                <div className="flex grow flex-col items-center justify-center">
                                  <p className="text-3xl font-bold text-[#F5893A] xxs:text-3xl xs:text-4xl">
                                    {completed ? 0 : seconds}
                                  </p>
                                  <p className="font-lato text-[12px] text-white">
                                    Detik
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      />
                      <div className="flex grow flex-col items-center justify-center px-4 pt-2 text-center text-white">
                        <h2
                          className="font-yrsa text-[24px] font-bold duration-75 ease-in xs:text-[32px]"
                          // data-aos="fade-zoom-in"
                        >
                          Tentang Acara
                        </h2>
                        <p
                          className="w-full px-2 text-center font-lato text-[13px] duration-75 ease-in xs:text-[15px]"
                          // data-aos="fade-zoom-in"
                        >
                          Arcavena adalah pameran akademik TPB FSRD ITB 2023
                          yang akan memamerkan tugas selama masa TPB dan
                          bertujuan menjadi sarana untuk memaksimalkan potensi
                          dari keberagaman pengetahuan akan ilmu seni, desain,
                          dan kriya serta menjadi wadah kolaborasi baik antar
                          sesama mahasiswa TPB FSRD ITB 2023 kampus Ganesha,
                          Jatinangor, Cirebon maupun dengan pihak eksternal.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative h-fit w-full scale-[101%] bg-gradient-to-b from-black/0 to-[#0b004b]/40">
                  <L1_01_Mobile />
                  <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 pb-20">
                    <section className="flex h-fit grow flex-col items-center justify-center gap-8 pt-10">
                      <h2 className="px-12 text-center font-vollkorn text-[28px] font-bold tracking-wide text-white xxs:text-[32px] xs:text-[40px]">
                        Ayo mulai Perjalanan mu!
                      </h2>
                      <Link to="/daftar">
                        <Button>
                          <p className="px-2 py-2">Daftar</p>
                        </Button>
                      </Link>
                      <Link to="/game">
                        <Button>
                          <p className="px-2 py-2">Mulai</p>
                        </Button>
                      </Link>
                      <Link to="/pameran">
                        <Button color="white">
                          <p>Pameran</p>
                        </Button>
                      </Link>
                      <Button color="white" disabled>
                        <p>E-Katalog</p>
                      </Button>
                    </section>

                    {/* <section
                      className="flex h-fit w-full flex-col items-center justify-center"
                      // data-aos="fade-zoom-in"
                    >
                      <h2 className="px-12 text-center font-vollkorn text-[28px] font-bold tracking-wide text-white xxs:text-[32px] xs:text-[40px]">
                        Teaser
                      </h2>
                      <div className="h-[200px] w-[80%] overflow-hidden rounded-lg shadow-md shadow-white">
                        <iframe
                          width="560"
                          height="315"
                          src="https://www.youtube.com/embed/yqWX86uT5jM?si=FQS8u6LpjXrgogsm"
                          title="YouTube video player"
                          className="max-h-[60vw] w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe> *
                        <ComingSoon />
                      </div>
                    </section> */}

                    <section
                      className="flex h-[120px] min-h-fit w-full grow flex-col items-center justify-start gap-4 px-8"
                      // data-aos="fade-zoom-in"
                    >
                      <h2 className="px-12 text-center font-vollkorn text-[28px] font-bold tracking-wide text-white xxs:text-[32px] xs:text-[40px]">
                        Merchandise
                      </h2>
                      {/* <Image
                        src={Merch}
                        alt="merch"
                        className="max-w-[80%] object-contain"
                      /> */}
                      <div className="flex h-auto w-[82%] justify-evenly overflow-hidden rounded-lg bg-gradient-to-b from-[#0C004C] to-[#351F74] py-4 opacity-75">
                        <img
                          src="/assets/merch/merch 3.webp"
                          alt=" merchandise 3"
                          className="h-auto w-[33%]"
                        />
                        <img
                          src="/assets/merch/merch 1.webp"
                          alt="merchandise 1"
                          className="h-auto w-[33%]"
                        />
                        <img
                          src="/assets/merch/merch 2.webp"
                          alt="merchandise 2"
                          className="h-auto w-[33%]"
                        />
                      </div>

                      <Button isCoin>
                        <NavLink
                          to="https://shopee.co.id/fundyfundyuang?uls_trackid=4vvb7gt300rn&utm_content=17ryQk2igsPbSePMGGCn2KC4QCX"
                          target="_blank"
                        >
                          <p className="p-4 text-3xl xl:p-8">Beli</p>
                        </NavLink>
                      </Button>
                    </section>
                    <section
                      className="flex h-fit min-h-fit grow flex-col items-start justify-start pl-10"
                      // data-aos="fade-zoom-in"
                    >
                      <p className="text-left font-yrsa text-[20px] font-semibold text-white shadow-black text-shadow">
                        Creli
                      </p>
                      <p className="max-w-[73%] font-yrsa text-base text-white shadow-black text-shadow-lg">
                        Ia ceria, optimis, dan terampil. Sifatnya yang
                        kekananak-kanakan membuatnya gegabah dan cenderung tidak
                        serius.
                      </p>
                    </section>
                  </div>

                  <div className="absolute bottom-[9%] left-[10%] flex h-auto w-[30vw] flex-col items-center justify-center">
                    <Image
                      src="/home/kristal/Kristal 8.webp"
                      className="scale-105"
                    />
                  </div>
                  <div className="absolute bottom-[25%] right-[1%] flex h-auto w-[30vw] rotate-[-13deg] flex-col items-center justify-center">
                    <Image
                      src="/home/kristal/Kristal 1.webp"
                      className="scale-105"
                    />
                  </div>
                  <div className="absolute right-[-5%] top-[50vw] flex h-auto w-[30vw] rotate-[-13deg] flex-col items-center justify-center">
                    <Image
                      src="/home/kristal/Kristal 12.webp"
                      className="scale-105"
                    />
                  </div>
                  <div className="absolute left-[-18%] top-[125vw] flex h-auto w-[30vw] rotate-[20deg] scale-x-[-1] flex-col items-center justify-center">
                    <Image
                      src="/home/kristal/Kristal 2.webp"
                      className="scale-105"
                    />
                  </div>
                  <div className="absolute bottom-[35vw] right-[25%] flex h-auto w-[30vw] flex-col items-center justify-center">
                    <Image
                      src="/home/karakter/Creli.webp"
                      className="scale-150"
                    />
                  </div>
                </div>
                <div className="relative h-fit w-full scale-[101%] bg-gradient-to-b from-[#0b004b]/40 to-[#0b004b]/60">
                  <L1_02_Mobile />
                  <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center">
                    <section className="relative h-1/2 w-full">
                      <div
                        className="ml-auto flex h-full max-w-[89%] flex-col justify-end"
                        // data-aos="fade-zoom-in"
                      >
                        <p className="text-left font-yrsa text-[20px] font-semibold text-white shadow-black text-shadow">
                          Atelius
                        </p>
                        <p className="max-w-[60%] font-yrsa text-base text-white shadow-black text-shadow-lg">
                          Ia ambisius, cermat, cerdik dan tidak gegabah. Namun,
                          sifatnya terkadang menjadikannya pribadi yang
                          judgemental.
                        </p>
                        <div className="h-[15%] xs:h-[15%]" />
                        <div className="h-auto w-[30vw] -translate-y-[20%] translate-x-[50%] flex-col items-center justify-center">
                          <Image
                            src="/home/karakter/Atelius.webp"
                            className="scale-[2] xs:scale-[2.5]"
                          />
                        </div>
                        <div className="h-[15%] xs:h-[20%]" />
                      </div>
                      <div className="absolute right-[8.6%] top-[38%] flex h-auto w-[30vw] -rotate-[2deg] flex-col items-center justify-center">
                        <Image
                          src="/home/kristal/Kristal 6.webp"
                          className="scale-105"
                        />
                      </div>
                    </section>

                    <section className="relative h-1/2 w-full">
                      <div
                        className="ml-auto flex  h-full max-w-[80%] flex-col justify-end"
                        // data-aos="fade-zoom-in"
                      >
                        <div className="h-[10%] xs:h-[10%]" />
                        <p className="text-left font-yrsa text-[20px] font-semibold text-white shadow-black text-shadow">
                          Narici
                        </p>
                        <p className="max-w-[60%] font-yrsa text-base text-white shadow-black text-shadow-lg">
                          Ia memiliki tekad yang kuat. Sifatnya yang outgoing
                          dan bold cenderung membuatnya impulsif.
                        </p>
                        <div className="h-[43%] xs:h-[50%]" />
                      </div>
                      <div
                        className="absolute bottom-[5vw] right-0 flex h-[94vw] w-auto flex-col items-center justify-center"
                        // data-aos="fade-zoom-in"
                      ></div>
                      <div className="absolute -top-[6%] left-[0%] flex h-auto w-[30vw]  flex-col items-center justify-center">
                        <Image
                          src="/home/kristal/Kristal 5.webp"
                          className="scale-[0.6]"
                        />
                      </div>
                      <div className="absolute bottom-[54%] right-[4%] flex h-auto w-[30vw] rotate-[0deg] flex-col items-center justify-center">
                        <Image
                          src="/home/jamur/Jamur 2.webp"
                          className="scale-150"
                        />
                      </div>
                      <div className="absolute -left-[8%] bottom-[14%] flex h-auto w-[30vw] rotate-[0deg] flex-col items-center justify-center">
                        <Image
                          src="/home/kristal/Kristal 4.webp"
                          className="scale-90"
                        />
                      </div>
                      <div className="absolute bottom-[12%] right-[35%] flex h-auto w-[30vw] -rotate-[18deg] flex-col items-center justify-center">
                        <Image
                          src="/home/karakter/Narici.webp"
                          className="scale-[2.5]"
                        />
                      </div>
                    </section>
                  </div>
                </div>
                <div className="relative h-fit w-full scale-[101%] bg-gradient-to-b from-[#0b004b]/60 to-[#0b004b]/95">
                  <L1_03_Mobile />
                  <section className="absolute inset-0 flex h-full w-full flex-col items-center justify-center">
                    <div className="max-w-[60%] space-y-4 xs:max-w-[60%]">
                      <div className="flex flex-col">
                        <p
                          className="text-center font-yrsa text-[24px] font-bold tracking-wider text-white"
                          // data-aos="fade-zoom-in"
                        >
                          Ayo buat
                        </p>
                        <p
                          className="text-center font-yrsa text-[24px] font-bold tracking-wider text-white"
                          // data-aos="fade-zoom-in"
                        >
                          nirmanamu!
                        </p>
                      </div>
                      <div
                        className="aspect-square h-[60vw] w-[60vw]"
                        // data-aos="fade-zoom-in"
                      >
                        {/* <Nirmana size="medium" data={sampleDataMedium} /> */}
                        <Image
                          src="/home/nirmana.png"
                          width={400}
                          height={400}
                          className="h-full w-full"
                        />
                      </div>
                      <div
                        className="flex gap-4"
                        data-aos="fade-zoom-in font-lato"
                      >
                        <div className="grow text-white">
                          <p className="text-sm font-normal">Nirmana by</p>
                          <p className="text-sm">@sayapengunjung</p>
                        </div>
                        <div className="flex grow flex-row-reverse">
                          <Link to="/game">
                            <Button color="white">
                              <p>Coba!</p>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </section>
                  <div className="absolute right-[8%] top-[5%] flex h-auto w-[28vw] flex-col items-center justify-center">
                    <Image src="/home/kristal/Kristal 3.webp" />
                  </div>
                  <div className="absolute bottom-[12%] left-[2%] flex h-auto w-[30vw] flex-col items-center justify-center">
                    <Image
                      src="/home/kristal/Kristal 1.webp"
                      className="scale-[1.5]"
                    />
                  </div>
                  <div className="absolute bottom-[37%] right-[0%] flex h-auto w-[30vw] flex-col items-center justify-center">
                    <Image
                      src="/home/kristal/Kristal 2.webp"
                      className="scale-[0.4]"
                    />
                  </div>
                  <div className="absolute -left-[12%] bottom-[42%] flex h-auto w-[30vw] rotate-[10deg] flex-col items-center justify-center">
                    <Image
                      src="/home/jamur/Jamur 1.webp"
                      className="scale-[1]"
                    />
                  </div>
                </div>
                <div className="h-auto w-full scale-[101%] flex-col items-center justify-start gap-2 bg-gradient-to-b from-[#0b004b] to-[#5425a2]">
                  <Footer />
                </div>
              </div>
            ),
            expanded: false,
          },
        ]}
      />
    </div>
  );
};

export default HomeMobilePage;
