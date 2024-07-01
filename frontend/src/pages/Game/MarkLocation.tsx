import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { BACKEND_URL } from "../../lib/constant";
import delay from "../../lib/delay";

const MarkLocationPage = () => {
  const { location } = useParams(); // Use useParams to get URL parameters
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const markLocation = async () => {
      try {
        setIsLoading(true);
        await delay(2000);
        await axios.put(
          `${BACKEND_URL}/explore/mine`,
          {
            progress: { [location as string]: true },
          },
          { headers: { access_token: localStorage.getItem("access_token") } },
        );
      } catch (error) {
        await Swal.fire({
          icon: "error",
          titleText: "Oops..",
          text: "Gagal mendapatkan lokasi, harap scan kembali",
        });
      } finally {
        setIsLoading(false);
        navigate("/game/story");
      }
    };
    markLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="flex h-[80vh] min-h-fit w-full grow items-center justify-center p-4"
      key="mark"
    >
      {isLoading ? <div>loading</div> : <div>Done</div>}
    </section>
  );
};

export default MarkLocationPage;
