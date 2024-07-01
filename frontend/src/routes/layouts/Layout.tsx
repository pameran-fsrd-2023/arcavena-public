import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

const Layout = () => {
  return (
    <div className="flex h-full min-h-screen w-full max-w-[100vw] flex-col bg-[#0B004B]">
      <Helmet>
        <meta
          name="description"
          content="Pameran tahunan dari Fakultas Seni Rupa dan Desain ITB (FSRD-ITB) yang diresmikan pada tahun 1984."
        />
        <meta
          name="keywords"
          content="Arcavena, Pameran, Fakultas Seni Rupa dan Desain, FSRD, ITB, 2024, Institut Teknologi Bandung"
        />
        <meta name="author" content="FSRD ITB" />
        <title>ARCAVENA - Pameran FSRD ITB Tahun 2024</title>
        {/* <!-- Favicon and Apple Touch Icons --> */}
        <link
          rel="icon"
          type="image/x-icon"
          sizes="192x192"
          href="/favicon.ico"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="128x128"
          href="/favicon.ico"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        {/* <!-- Open Graph and Schema.org --> */}
        <meta
          property="og:title"
          content="ARCAVENA - Pameran FSRD ITB Tahun 2024"
        />
        <meta
          property="og:description"
          content="Pameran tahunan dari Fakultas Seni Rupa dan Desain ITB (FSRD-ITB) yang diresmikan pada tahun 1984."
        />
        <meta property="og:image" content="https://arcavena.com/favicon.ico" />
        <meta
          property="og:site_name"
          content="ARCAVENA - Pameran FSRD ITB Tahun 2024"
        />
        <meta property="og:url" content="https://arcavena.com" />
        <meta property="og:type" content="Organization" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="ARCAVENA - Pameran FSRD ITB Tahun 2024"
        />
        <meta
          name="twitter:description"
          content="Pameran tahunan dari Fakultas Seni Rupa dan Desain ITB (FSRD-ITB) yang diresmikan pada tahun 1984."
        />
        <meta name="twitter:image" content="https://arcavena.com/favicon.ico" />
      </Helmet>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
