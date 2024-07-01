import axios from "axios";
import useFetch from "../../lib/hooks/useFetch";
import { BACKEND_URL } from "../../lib/constant";
import ProgressMap from "../../assets/Game/ProgressMap.webp";
import IconVisited from "../../assets/Game/iconVisited.svg";
import IconNotVisited from "../../assets/Game/IconNotVisited.svg";
import { useNavigate } from "react-router-dom";

const Progress = () => {
  const navigate = useNavigate();

  // Fetch explore and Nirmana data
  const {
    data: exploreData,
    loading: exploreLoading,
    error: exploreError,
  } = useFetch(() =>
    axios.get(`${BACKEND_URL}/explore/mine`, {
      headers: { access_token: localStorage.getItem("access_token") },
    }),
  );

  // Function to render icons based on location data
  const renderIcon = (location: boolean, position: string, i: number) => (
    <img
      key={i}
      src={location ? IconVisited : IconNotVisited}
      alt={location ? "visited" : "not visited"}
      className={`absolute h-auto w-[12%] ${position} -translate-x-1/2 -translate-y-1/2 transform cursor-pointer ${location && "shadow-white drop-shadow-sm"}`}
      // style={{ width: `${location ? "22%" : "12%"}` }}
      onClick={() => navigate(location ? "/game/story" : "/game/scan")}
    />
  );

  // Function to render progress map and icons
  const getViewPanel = () => {
    if (exploreLoading || (!exploreLoading && !exploreData)) {
      const locations = [
        {
          position: "left-[45%] top-[24%]",
          location: false,
        },
        {
          position: "left-[53%] top-[57%]",
          location: false,
        },
        {
          position: "left-[4%] top-[60%]",
          location: false,
        },
        {
          position: "right-[18%] top-[38%]",
          location: false,
        },
        {
          position: "left-[27%] top-[50%]",
          location: false,
        },
        {
          position: "right-[18%] top-[66%]",
          location: false,
        },
      ];
      return (
        <div className="relative flex h-full min-h-fit w-full items-center justify-center">
          <div className="relative h-fit max-h-fit w-full max-w-fit">
            <img
              src={ProgressMap}
              alt="Progress Map"
              className="h-auto max-h-[60rem] w-full"
            />
            <div className="absolute left-0 top-0 h-full w-full">
              <div className="relative h-full w-full">
                {locations.map(({ position, location }, i) =>
                  renderIcon(location, position, i),
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (exploreData) {
      const locations = [
        {
          position: "left-[45%] top-[24%]",
          location: exploreData.progress.locationA,
        },
        {
          position: "left-[53%] top-[57%]",
          location: exploreData.progress.locationB,
        },
        {
          position: "left-[4%] top-[60%]",
          location: exploreData.progress.locationC,
        },
        {
          position: "right-[18%] top-[38%]",
          location: exploreData.progress.locationD,
        },
        {
          position: "left-[27%] top-[50%]",
          location: exploreData.progress.locationE,
        },
        {
          position: "right-[18%] top-[66%]",
          location: exploreData.progress.locationF,
        },
      ];

      return (
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="relative h-fit max-h-fit w-full max-w-fit">
            <img
              src={ProgressMap}
              alt="Progress Map"
              className="h-auto w-full"
            />
            <div className="absolute left-0 top-0 h-full w-full">
              <div className="relative h-full w-full">
                {locations.map(({ position, location }, i) =>
                  renderIcon(location, position, i),
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div className="h-full w-full">{JSON.stringify(exploreError)}</div>;
  };

  return (
    <section className="flex h-[80vh] w-full grow flex-col items-center justify-center p-4">
      <div className="h-full w-full">{getViewPanel()}</div>
    </section>
  );
};

export default Progress;
