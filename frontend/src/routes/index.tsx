import { createBrowserRouter, redirect } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProfileFSRDEditPage from "../pages/Profile/ProfileFSRDEditPage";
import Layout from "./layouts/Layout";
import DaftarPage from "../pages/DaftarPage";
import MediaSosialPage from "../pages/MediaSosialPage";
import TentangPage from "../pages/TentangPage";
import Custom404 from "../pages/Custom404";
import ReservasiAcara from "../pages/Reservasi/ReservasiAcara";
import DaftarReservasi from "../pages/Reservasi/DaftarReservasi";
import TiketSaya from "../pages/Reservasi/TiketSaya";
import Swal from "sweetalert2";
import Peta from "../pages/Peta";
import Sponsor from "../pages/Sponsor";
import Undangan from "../pages/Undangan";
import PameranPage from "../pages/Pameran/PameranPage";
import ComingSoonPage from "../pages/ComingSoonPage";
import MarkLocationPage from "../pages/Game/MarkLocation";
import GamePageScan from "../pages/Game/GamePageScan";
import Progress from "../pages/Game/Progress";
import GameStory from "../pages/Game/GameStory";
import ProfileFSRDPageAlt from "../pages/Profile/ProfileFSRDPageAlt";
import checkAdmin from "../lib/checkAdmin";
import AdminAbsenPage from "../pages/admin/AdminAbsenPage";
import QRGamesPage from "../pages/admin/QRGamesPage";
import StoryChapter from "../pages/Game/StoryChapter";
import checkUnlocked from "../lib/checkUnlocked";
import GameLayout from "../pages/Game/GameLayout";
import EditNirmana from "../pages/Nirmana/EditNirmana";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Layout />,
    loader: checkAdmin,
    children: [
      {
        path: "absen",
        element: <AdminAbsenPage />,
      },
      {
        path: "qr-games",
        element: <QRGamesPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/media-sosial",
        element: <MediaSosialPage />,
      },
      {
        path: "/coming-soon",
        element: <ComingSoonPage />,
      },
      {
        path: "/tentang",
        element: <TentangPage />,
      },
      {
        path: "/pameran",
        element: <PameranPage />,
      },
      {
        path: "/auth/sign-in",
        element: <LoginPage />,
      },
      {
        path: "/auth/sign-up",
        element: <RegisterPage />,
      },
      {
        path: "/profile-fsrd/:nim",
        element: <ProfileFSRDPageAlt />,
      },
      {
        path: "/profile-fsrd/:nim/edit",
        element: <ProfileFSRDEditPage />,
      },
      {
        path: "/daftar",
        element: <DaftarPage />,
      },
      {
        path: "/game",
        // element: <ComingSoonPage />,
        element: <GameLayout />,
        loader: () => {
          if (!localStorage.getItem("access_token")) {
            Swal.fire({
              icon: "info",
              title: "Belum login",
              text: "Untuk dapat bermain, masuk menggunakan akun anda terlebih dahulu",
            });
            return redirect("/auth/sign-in");
          }
          return null;
        },
        children: [
          {
            path: "",
            element: <Progress />,
          },
          {
            path: "mark/:location",
            element: <MarkLocationPage />,
          },
          {
            path: "scan",
            element: <GamePageScan />,
          },
          {
            path: "story",
            element: <GameStory />,
          },
        ],
      },
      {
        path: "nirmana",
        // element: <ComingSoonPage />,
        loader: () => {
          if (!localStorage.getItem("access_token")) {
            Swal.fire({
              icon: "info",
              title: "Belum login",
              text: "Untuk dapat bermain, masuk menggunakan akun anda terlebih dahulu",
            });
            return redirect("/auth/sign-in");
          }
          return null;
        },
        element: <EditNirmana />,
      },
      {
        path: "/story/chapter/:chapter",
        loader: checkUnlocked,
        element: <StoryChapter />,
      },
      {
        path: "/alamat",
        element: <Peta />,
      },
      {
        path: "/sponsor",
        element: <Sponsor />,
      },
      {
        path: "/undangan",
        element: <Undangan />,
      },
      {
        path: "/reservasi",
        element: <ReservasiAcara />,
      },
      {
        path: "/profile",
        // loader: () => {
        //   if (!localStorage.getItem("access_token")) {
        //     Swal.fire({
        //       icon: "info",
        //       title: "Belum login",
        //       text: "Untuk dapat melihat tiket anda, masuk menggunakan akun anda terlebih dahulu",
        //     });
        //     return redirect("/auth/sign-in");
        //   }
        //   return null;
        // },
        element: <ComingSoonPage />,
      },
      {
        path: "/reservasi/tiket-saya",
        loader: () => {
          if (!localStorage.getItem("access_token")) {
            Swal.fire({
              icon: "info",
              title: "Belum login",
              text: "Untuk dapat melihat tiket anda, masuk menggunakan akun anda terlebih dahulu",
            });
            return redirect("/auth/sign-in");
          }
          return null;
        },
        element: <TiketSaya />,
      },
      {
        path: "/reservasi/daftar/:step",
        loader: () => {
          if (!localStorage.getItem("access_token")) {
            Swal.fire({
              icon: "info",
              title: "Belum login",
              text: "Untuk dapat mendaftar tolong masuk menggunakan akun anda terlebih dahulu",
            });
            return redirect("/auth/sign-in");
          }
          return null;
        },
        element: <DaftarReservasi />,
      },
      { path: "*", element: <Custom404 /> },
    ],
  },
]);

export default router;
