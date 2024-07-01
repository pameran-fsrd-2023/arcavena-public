import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import { FiMapPin } from "react-icons/fi";

export default function Peta() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#0B004B] to-[#5626A5]">
      <div className="mt-5 w-screen p-5 text-center font-vollkorn text-4xl font-bold text-white [text-shadow:_5px_5px_50px_white] sm:text-6xl lg:text-7xl">
        <h1>GSG ITB Jatinangor</h1>
      </div>
      <div className="flex flex-wrap justify-center xl:justify-start">
        <img
          className="mx-auto h-auto min-h-[20rem] w-full max-w-[1240px] object-cover py-4 md:px-10"
          src="\assets\gsg.webp"
        />
      </div>
      <div className="max-width-screen flex w-full max-w-[1240px] grow flex-col content-center justify-center px-4 md:px-10 lg:flex-row">
        <div className="hidden content-center justify-center xl:block">
          <div className="flex flex-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5601.277096406713!2d107.76350160804016!3d-6.9262970103483195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c5ce0b591e1d%3A0xf549f3df92660e9d!2sGSG%20ITB%20Jatinangor!5e0!3m2!1sen!2sid!4v1717581135219!5m2!1sen!2sid"
              width="600"
              height="500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="mt-10 hidden content-center justify-center sm:flex xl:hidden">
          <div className="flex flex-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5601.277096406713!2d107.76350160804016!3d-6.9262970103483195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c5ce0b591e1d%3A0xf549f3df92660e9d!2sGSG%20ITB%20Jatinangor!5e0!3m2!1sen!2sid!4v1717581135219!5m2!1sen!2sid"
              width="500"
              height="500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="mt-10 flex content-center justify-center sm:hidden xl:hidden">
          <div className="flex flex-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5601.277096406713!2d107.76350160804016!3d-6.9262970103483195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c5ce0b591e1d%3A0xf549f3df92660e9d!2sGSG%20ITB%20Jatinangor!5e0!3m2!1sen!2sid!4v1717581135219!5m2!1sen!2sid"
              width="300"
              height="350"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="flex flex-col flex-wrap content-center pt-10 lg:pt-0">
          <div className="mb-5 px-10 py-4 font-lato text-base text-white sm:text-base xl:text-lg">
            <h2 className="text-base uppercase tracking-wide text-purple-100">
              Lokasi
            </h2>
            <h3 className="text-3xl">Gedung GSG ITB Jatinangor</h3>

            <div className="py-4">
              <NavLink
                to="https://maps.app.goo.gl/Z6HQngveaN62gCKA9"
                target="_blank"
              >
                <button className="flex gap-[1px] overflow-hidden rounded-md bg-slate-500 hover:shadow-md hover:shadow-blue-200 hover:brightness-105">
                  <div className="flex items-center self-stretch bg-blue-600 px-2">
                    <FiMapPin size={25} />
                  </div>
                  <p className="0 w-fit bg-slate-200 px-4 py-2 text-gray-800 hover:shadow-sm ">
                    Buka di Google Maps
                  </p>
                </button>
              </NavLink>
            </div>

            <p className="py-4">
              3QF9+CRW, Jl. Raya Cirebon - Bandung, Sayang, <br />
              Kec. Jatinangor, Kabupaten Sumedang, Jawa Barat 45363
              <br /> <br />
              Terletak di: Institut Teknologi Bandung (ITB) - Kampus Jatinangor
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
