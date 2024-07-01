import Swal from "sweetalert2";

import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFetch from "../../lib/hooks/useFetch";
import axios from "axios";
import { BACKEND_URL, defaultNirmana5x5 } from "../../lib/constant";
import Nirmana from "../../components/Nirmana";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const NirmanaPage = () => {
  const { user } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const {
    data: nirmanaData,
    loading: nirmanaLoading,
    error: nirmanaError,
  } = useFetch(() =>
    axios.get(`${BACKEND_URL}/nirmanas/mine`, {
      headers: { access_token: localStorage.getItem("access_token") },
    }),
  );

  // State to hold Nirmana data
  const [currentUserNirmana, setCurrentUserNirmana] =
    useState<string[][]>(defaultNirmana5x5);

  // Update Nirmana data from backend when fetched
  useEffect(() => {
    if (!nirmanaLoading && nirmanaData) {
      setCurrentUserNirmana(nirmanaData.data.colors); // Update Nirmana grid
    }
  }, [nirmanaData, nirmanaLoading]);

  useEffect(() => {
    if (nirmanaError) {
      Swal.fire({
        icon: "error",
        text: "Mohon maaf ada kesalahan dalam mengambil data",
      });
    }
  }, [nirmanaError]);

  return (
    <section className="flex h-[80vh] w-full grow flex-col items-center justify-center p-4">
      <div className="flex h-full w-full flex-col items-center rounded-md bg-gradient-to-t from-[#7246E5]/30 to-[#7246E5]/30 p-4">
        <h1 className="font-lato text-xl font-bold">
          Nirmana{" "}
          {user?.displayName.split(" ")[0].length > 10
            ? user.displayName.slice(0, 10) + "..."
            : user.displayName.split(" ")[0]}
        </h1>
        <div className="aspect-square h-0 w-auto grow p-4">
          {!nirmanaLoading && nirmanaData && (
            <Nirmana size={nirmanaData?.data?.size} data={currentUserNirmana} />
          )}
          {nirmanaLoading && (
            <div className="h-full w-full animate-pulse">
              <Nirmana size="small" data={defaultNirmana5x5} />
            </div>
          )}{" "}
          {!nirmanaLoading && !nirmanaData && (
            <div className="flex h-full w-full animate-pulse items-center">
              <p>Belum membuat nirmana</p>
            </div>
          )}
        </div>
        <Button onClick={() => navigate("/game/nirmana")}>
          <p className="shadow-orange-800 text-shadow">Edit</p>
        </Button>
      </div>
    </section>
  );
};

export default NirmanaPage;
