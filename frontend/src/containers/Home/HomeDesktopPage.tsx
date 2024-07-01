import { ParallaxBanner } from "react-scroll-parallax";

import L1_00_Desktop from "../../components/Home/L1_00_Desktop";
import L1_01_Desktop from "../../components/Home/L1_01_Desktop";
import L1_02_Desktop from "../../components/Home/L1_02_Desktop";
import L1_03_Desktop from "../../components/Home/L1_03_Desktop";
import L2_00 from "../../components/Home/L2_00";
import L3_00 from "../../components/Home/L3_00";

import Countdown from "react-countdown";
import CountdownBgDesktop from "../../components/Home/CountdownBgDesktop";
import Image from "../../components/Image";

import ScrollShiny from "../../components/ScrollShiny";

// import Merch from "../../assets/Merch.svg";

import { countdownDeadline } from "../../lib/constant";
// import Nirmana from "../../components/Nirmana";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import { Link, NavLink } from "react-router-dom";

const HomeDesktopPage = () => {
  return (
    <div className="w-full bg-[#d1a8e6]">
      <ParallaxBanner
        className="aspect-[8/61] max-h-[calc(min(470svw+84rem,386rem))] w-full"
        layers={[
          {
            speed: -240,
            style: { zIndex: 0 },
            children: (
              <div className="flex translate-y-[-42rem] flex-col">
                <div className="mx-auto max-w-[1280px]">
                  <L3_00 />
                </div>
                <div className="mx-auto max-w-[1280px] scale-[101%]">
                  <L3_00 />
                </div>
                <div className="mx-auto max-w-[1280px] scale-[101%]">
                  <L3_00 />
                </div>
                <div className="mx-auto max-w-[1280px] scale-[101%]">
                  <L3_00 />
                </div>
                <div className="mx-auto max-w-[1280px] scale-[101%]">
                  <L3_00 />
                </div>
                <div className="mx-auto max-w-[1280px] scale-[101%]">
                  <L3_00 />
                </div>
                <div className="mx-auto max-w-[1280px] scale-[101%]">
                  <L3_00 />
                </div>
              </div>
            ),
          },
          {
            speed: -180,
            style: { zIndex: 2 },
            children: (
              <div className="flex w-full translate-y-[-28rem] flex-col">
                <div className="mx-auto max-w-[1280px] scale-[101%]">
                  <L2_00 />
                </div>
                <div className="mx-auto max-w-[1280px] scale-[101%]">
                  <L2_00 />
                </div>
                <div className="mx-auto max-w-[1280px] scale-[101%]">
                  <L2_00 />
                </div>
                <div className="mx-auto max-w-[1280px] scale-[101%]">
                  <L2_00 />
                </div>
              </div>
            ),
            expanded: false,
          },
          {
            speed: 0,
            style: { zIndex: 4 },
            children: (
              <div className="flex w-full flex-col">
                <div className="relative scale-[101%]">
                  <div
                    className="h-[45rem] w-full bg-gradient-to-t from-[#0b004b] to-[#520088]"
                    data-aos="fade-up"
                  >
                    <L1_00_Desktop />
                  </div>
                  <div className="h-[25rem] w-full scale-[1.01] bg-[#0b004b]" />

                  <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center">
                    <div className="flex h-[35rem] flex-col items-center justify-center">
                      <Image
                        src="/home/logo.svg"
                        alt="logo arcavena"
                        width={200}
                        height={400}
                        className="h-auto w-[30vw] max-w-[20rem] pr-[6%]"
                      />
                    </div>
                    <div className="flex h-[30rem] flex-col items-center justify-center">
                      <Countdown
                        date={countdownDeadline}
                        renderer={({
                          hours,
                          minutes,
                          seconds,
                          completed,
                          days,
                        }) => (
                          <div className="relative h-[48%] w-[100vw]">
                            <div className="mx-auto flex h-[18rem] w-[45%] items-center justify-center">
                              <div className="h-[13rem]">
                                <CountdownBgDesktop />
                              </div>
                            </div>
                            <div className="absolute inset-x-0 top-[4%] mx-auto flex h-[18rem] w-full max-w-[65%] items-center justify-center lg:max-w-[50%] xl:max-w-[700px]">
                              <div className="mx-auto flex w-fit min-w-[48%] xl:min-w-[40%]">
                                <div className="flex grow flex-col items-center justify-center">
                                  <p className="font-serif text-2xl font-bold text-[#F5893A] xxs:text-3xl xs:text-4xl">
                                    {completed ? 0 : days}
                                  </p>
                                  <p className="font-jomolhari text-[11px] text-white">
                                    Hari
                                  </p>
                                </div>
                                <div className="flex grow flex-col items-center justify-center">
                                  <p className="font-serif text-2xl font-bold text-[#F5893A] xxs:text-3xl xs:text-4xl">
                                    {completed ? 0 : hours}
                                  </p>
                                  <p className="font-jomolhari text-[11px] text-white">
                                    Jam
                                  </p>
                                </div>
                                <div className="flex grow flex-col items-center justify-center">
                                  <p className="font-serif text-2xl font-bold text-[#F5893A] xxs:text-3xl xs:text-4xl">
                                    {completed ? 0 : minutes}
                                  </p>
                                  <p className="font-jomolhari text-[11px] text-white">
                                    Menit
                                  </p>
                                </div>
                                <div className="flex grow flex-col items-center justify-center">
                                  <p className="font-serif text-2xl font-bold text-[#F5893A] xxs:text-3xl xs:text-4xl">
                                    {completed ? 0 : seconds}
                                  </p>
                                  <p className="font-jomolhari text-[11px] text-white">
                                    Detik
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      />
                      <div className="space-y-2 px-4 py-8 text-center text-white">
                        <h2 className="font-yrsa text-[24px] font-semibold duration-75 ease-in xs:text-[32px]">
                          Tentang Acara
                        </h2>
                        <p
                          className="max-w-[600px] text-center font-lato text-sm duration-75 ease-in"
                          data-aos="fade-up"
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
                <div className="relative scale-[101%] bg-gradient-to-b from-black/0 to-[#0b004b]/40">
                  <div className="flex w-full">
                    <div className="grow bg-[#0b004b]" />
                    <div className="mx-auto max-w-[1000px] scale-[101%]">
                      <L1_01_Desktop />
                    </div>
                    <div className="grow bg-[#0b004b]" />
                  </div>
                  <div className="absolute left-0 top-0 h-full w-full">
                    <div className="relative mx-auto flex h-full w-full max-w-[1000px] flex-col items-center justify-center gap-8 px-16">
                      <section className="flex h-fit flex-col items-center justify-center gap-4 px-20 pt-[20%]">
                        <h2 className="w-fit max-w-[24rem] text-center font-vollkorn text-[30px] font-semibold tracking-wider text-white shadow-gray-400 text-shadow md:text-[38px] lg:text-[40px] ">
                          Ayo mulai Perjalananmu!
                        </h2>
                        <div className="flex h-fit flex-row items-center gap-4 py-8">
                          <Link to="/daftar">
                            <Button>
                              <p className="px-4 py-2 text-3xl">Daftar</p>
                            </Button>
                          </Link>
                          <Link to="/game">
                            <Button>
                              <p className="px-4 py-2 text-3xl">Mulai</p>
                            </Button>
                          </Link>
                        </div>
                        <div className="flex h-fit flex-row items-center gap-4">
                          <Link to="/pameran">
                            <Button color="white">
                              <p className="px-4">Pameran</p>
                            </Button>
                          </Link>

                          <Button color="white" disabled>
                            <p className="px-4">E-Katalog</p>
                          </Button>
                        </div>
                      </section>

                      <section
                        className="flex h-fit w-full grow flex-col items-center justify-center gap-4"
                        data-aos="fade-up"
                      >
                        <h2 className="font-yrsa text-[32px] font-bold text-white">
                          Merchandise
                        </h2>
                        <div className="flex h-auto w-[60%] justify-evenly overflow-hidden rounded-lg bg-gradient-to-b from-[#0C004C] to-[#351F74] py-4 opacity-75">
                          <img
                            src="/assets/merch/merch 3.webp"
                            alt=" merchandise 3"
                            className="h-auto w-[30%]"
                          />
                          <img
                            src="/assets/merch/merch 1.webp"
                            alt="merchandise 1"
                            className="h-auto w-[30%]"
                          />
                          <img
                            src="/assets/merch/merch 2.webp"
                            alt="merchandise 2"
                            className="h-auto w-[30%]"
                          />
                        </div>

                        <Button isCoin>
                          <NavLink
                            to="https://shopee.co.id/fundyfundyuang?uls_trackid=4vvb7gt300rn&utm_content=17ryQk2igsPbSePMGGCn2KC4QCX"
                            target="_blank"
                          >
                            <p className="p-2 text-3xl md:p-4 xl:p-8">Beli</p>
                          </NavLink>
                        </Button>
                      </section>

                      <section className="h-1/4 grow" data-aos="fade-up">
                        <div className="mr-auto flex h-full w-[60%] flex-col items-end justify-start">
                          <div className="flex w-full flex-col items-start pl-28">
                            <p className="text-left font-yrsa text-xl font-semibold text-white shadow-black text-shadow">
                              Creli
                            </p>
                            <p className="font-yrsa text-xl text-white shadow-black text-shadow-lg">
                              Ia ceria, optimis, dan terampil. Sifatnya yang
                              kekananak-kanakan membuatnya gegabah dan cenderung
                              tidak serius.
                            </p>
                          </div>
                        </div>
                      </section>

                      <div
                        className="absolute bottom-0 right-[15%] flex h-auto w-[30%] flex-col items-center justify-center"
                        data-aos="fade-up"
                      >
                        <Image
                          src="/home/karakter/Creli.webp"
                          alt="Character Creli"
                          className="h-auto w-full"
                        />
                      </div>

                      <div className="absolute bottom-[32.5%] right-[10%] flex h-auto w-[15%] rotate-[-34deg] flex-col items-center justify-center">
                        <ScrollShiny>
                          <Image
                            alt="kristal"
                            src="/home/kristal/Kristal 1.webp"
                            className="scale-105"
                          />
                        </ScrollShiny>
                      </div>
                      <div className="absolute bottom-[19%] left-[12%] flex h-auto w-[15%] rotate-[0deg] flex-col items-center justify-center">
                        <ScrollShiny>
                          <Image
                            src="/home/kristal/Kristal 8.webp"
                            className="scale-[1.3]"
                          />
                        </ScrollShiny>
                      </div>
                      <div className="absolute right-[4%] top-[11%] flex h-auto w-[15%] rotate-[-10deg] flex-col items-center justify-center">
                        <ScrollShiny>
                          <Image
                            src="/home/kristal/Kristal 12.webp"
                            className="scale-100"
                          />
                        </ScrollShiny>
                      </div>
                      <div className="absolute right-[-1%] top-[36%] flex h-auto w-[15%] rotate-[-5deg] flex-col items-center justify-center">
                        <ScrollShiny>
                          <Image
                            src="/home/kristal/Kristal 10.webp"
                            className="scale-[0.8]"
                          />
                        </ScrollShiny>
                      </div>
                      <div className="absolute left-[5%] top-[30.5%] flex h-auto w-[15%] rotate-[20deg] scale-x-[-1] flex-col items-center justify-center">
                        <ScrollShiny>
                          <Image
                            src="/home/kristal/Kristal 2.webp"
                            className="scale-[0.6]"
                          />
                        </ScrollShiny>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative scale-[101%] bg-gradient-to-b from-[#0b004b]/40 to-[#0b004b]/60">
                  <div className="flex w-full">
                    <div className="grow bg-[#0b004b]" />
                    <div className="mx-auto max-w-[1000px] scale-[101%]">
                      <L1_02_Desktop />
                    </div>
                    <div className="grow scale-[101%] bg-[#0b004b]" />
                  </div>

                  <div className="absolute left-0 top-0 z-[2] flex h-full w-full flex-col items-center justify-center">
                    <div className="relative mx-auto h-full w-full max-w-[1000px]">
                      <section className="relative h-1/2 w-full">
                        <div
                          className="ml-auto flex h-full max-w-[90%] flex-col justify-center"
                          data-aos="fade-up"
                        >
                          <p className="ml-[40%] font-yrsa text-2xl font-semibold text-white shadow-black text-shadow">
                            Atelius
                          </p>
                          <p className="ml-[40%] w-[30%] max-w-[39rem] font-yrsa text-xl text-white shadow-black text-shadow-lg">
                            Ia ambisius, cermat, cerdik dan tidak gegabah.
                            Namun, sifatnya terkadang menjadikannya pribadi yang
                            judgemental.
                          </p>
                        </div>

                        <div
                          className="absolute bottom-[5%] left-0 flex h-[80%] w-fit max-w-fit flex-col items-start justify-center"
                          data-aos="fade-up"
                        >
                          <Image
                            src="/home/karakter/Atelius.webp"
                            alt="Character Atelius"
                            className="h-full w-auto scale-[0.8]"
                          />
                        </div>
                      </section>

                      <section className="relative h-1/2 w-full">
                        <div
                          className="ml-auto flex h-full w-[60%] flex-col justify-center pb-[30%] pr-[20%]"
                          data-aos="fade-up"
                        >
                          <p className="font-yrsa text-2xl font-semibold text-white shadow-black text-shadow">
                            Narici
                          </p>
                          <p className="font-yrsa text-xl text-white shadow-black text-shadow-lg">
                            Ia memiliki tekad yang kuat. Sifatnya yang outgoing
                            dan bold cenderung membuatnya impulsif.
                          </p>
                        </div>
                        <div
                          className="absolute bottom-[-5%] right-[20%] flex h-[60%] max-h-[27rem] w-auto flex-col items-center justify-center"
                          data-aos="fade-up"
                        >
                          <Image
                            src="/home/karakter/Narici.webp"
                            alt="Character Narici"
                            className="h-full w-auto rotate-[-23deg]"
                          />
                        </div>
                      </section>

                      <div className="absolute left-[5%] top-[10.8%] flex h-auto w-[15%] rotate-[20deg] scale-x-[-1] flex-col items-center justify-center">
                        <ScrollShiny>
                          <Image
                            src="/home/kristal/Kristal 2.webp"
                            className="scale-[0.6]"
                          />
                        </ScrollShiny>
                      </div>
                      <div className="absolute right-[13%] top-[17.8%] flex h-auto w-[15%] rotate-[-10deg] flex-col items-center justify-center">
                        <ScrollShiny>
                          <Image
                            src="/home/kristal/Kristal 6.webp"
                            className="scale-[0.8]"
                          />
                        </ScrollShiny>
                      </div>
                      <div className="absolute left-[7%] top-[46.8%] flex h-auto w-[15%] rotate-[-10deg] scale-x-[-1] flex-col items-center justify-center">
                        <ScrollShiny>
                          <Image
                            src="/home/kristal/Kristal 1.webp"
                            className="scale-[0.6]"
                          />
                        </ScrollShiny>
                      </div>
                      <div className="absolute bottom-[19%] left-[5%] flex h-auto w-[15%] rotate-[-10deg] flex-col items-center justify-center">
                        <ScrollShiny>
                          <Image
                            src="/home/kristal/Kristal 4.webp"
                            className="scale-100"
                          />
                        </ScrollShiny>
                      </div>
                      <div className="absolute bottom-[39%] right-[8%] flex h-auto w-[20%] rotate-[0deg] flex-col items-center justify-center">
                        <ScrollShiny>
                          <Image
                            src="/home/jamur/Jamur 2.webp"
                            className="scale-100"
                          />
                        </ScrollShiny>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative scale-[101%] bg-gradient-to-b from-[#0b004b]/60 to-[#0b004b]/95">
                  <div className="flex w-full">
                    <div className="grow bg-[#0b004b]" />
                    <div className="relative mx-auto w-full max-w-[1100px] scale-[101%]">
                      <L1_03_Desktop />
                      <div className="absolute bottom-[56%] right-[15%] flex h-auto w-[12%] max-w-[10rem] -rotate-[40deg] flex-col items-center justify-center">
                        <ScrollShiny>
                          <Image
                            src="/home/kristal/Kristal 2.webp"
                            className="scale-105"
                          />
                        </ScrollShiny>
                      </div>
                      <div className="absolute right-[11%] top-[6.2%] flex h-auto w-[12%] max-w-[10rem] -rotate-[10deg] flex-col items-center justify-center">
                        <ScrollShiny>
                          <Image
                            src="/home/kristal/Kristal 3.webp"
                            className="scale-[1.4]"
                          />
                        </ScrollShiny>
                      </div>
                      <div className="absolute bottom-[35%] left-[7%] flex h-auto w-[23%] flex-col items-center justify-center">
                        <ScrollShiny>
                          <Image
                            src="/home/kristal/Kristal 1.webp"
                            className="scale-105"
                          />
                        </ScrollShiny>
                      </div>
                      <div className="absolute bottom-[61%] left-[3%] flex h-auto w-[19%] flex-col items-center justify-center">
                        <ScrollShiny>
                          <Image
                            src="/home/jamur/Jamur 1.webp"
                            className="scale-105"
                          />
                        </ScrollShiny>
                      </div>
                    </div>
                    <div className="grow bg-[#0b004b]" />
                  </div>
                  <section className="absolute inset-0 z-[10] flex h-full w-full flex-col items-center justify-center">
                    <div className="flex max-w-[80%] flex-col items-center space-y-4 xs:max-w-[70%]">
                      <p
                        className="w-fit max-w-[24rem] text-center font-vollkorn text-[38px] font-semibold tracking-wider text-white shadow-gray-400 text-shadow xxs:text-[32px] xs:text-[40px]"
                        data-aos="fade-up"
                      >
                        Ayo buat nirmanamu!
                      </p>
                      <div
                        className="h-[60vw] max-h-[calc(min(20rem,40svw))] w-[60vw] max-w-[calc(min(20rem,40svw))]"
                        data-aos="fade-up"
                      >
                        {/* <Nirmana size="medium" data={sampleDataMedium} /> */}
                        <Image
                          src="/home/nirmana.png"
                          width={400}
                          height={400}
                          className="mx-auto h-full w-full"
                        />
                      </div>
                      <div
                        className="flex w-full max-w-[80%]"
                        data-aos="fade-up"
                      >
                        <div className="grow font-inter text-white">
                          <p className="font-bold">Nirmana by</p>
                          <p>@sayapengunjung</p>
                        </div>
                        <div className="flex grow flex-row-reverse">
                          <Link to="/game">
                            <Button color="white">
                              <p className="p-2">Coba!</p>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="flex max-h-[35rem] min-h-[50vw] w-full translate-y-[-20%] scale-[101%] flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#0b004b] to-[#461b8a] pt-0 lg:min-h-0 lg:translate-y-[-7rem]">
                  <Footer />
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default HomeDesktopPage;
