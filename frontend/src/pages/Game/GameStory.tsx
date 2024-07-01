import axios from "axios";
import useFetch from "../../lib/hooks/useFetch";
import { BACKEND_URL } from "../../lib/constant";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const GameStory = () => {
  const { data: exploreData } = useFetch(() =>
    axios.get(`${BACKEND_URL}/explore/mine`, {
      headers: { access_token: localStorage.getItem("access_token") },
    }),
  );

  const [exploredCounts, setExploredCounts] = useState(0);

  useEffect(() => {
    if (exploreData) {
      let tempCount = 0;
      if (exploreData?.progress?.locationA) {
        tempCount += 1;
      }
      if (exploreData?.progress?.locationB) {
        tempCount += 1;
      }
      if (exploreData?.progress?.locationC) {
        tempCount += 1;
      }
      if (exploreData?.progress?.locationD) {
        tempCount += 1;
      }
      if (exploreData?.progress?.locationE) {
        tempCount += 1;
      }
      if (exploreData?.progress?.locationF) {
        tempCount += 1;
      }
      setExploredCounts(tempCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exploreData]);

  return (
    <section
      className="flex w-full grow items-center justify-center p-4"
      key="mark"
    >
      <div className="flex h-fit w-full flex-col gap-5 px-4 pb-20 pt-10">
        <NavLink
          to="/story/chapter/1"
          className={`w-full rounded-lg px-4 py-3 shadow-lg ${exploredCounts >= 1 ? "bg-[#D9D9D9] text-black shadow-gray-300 drop-shadow-lg" : "bg-[#656565]"}`}
        >
          <p className="text-2xl">Chapter 1</p>
        </NavLink>
        <NavLink
          to="/story/chapter/2"
          className={`w-full rounded-lg px-4 py-3 shadow-lg ${exploredCounts >= 2 ? "bg-[#D9D9D9] text-black shadow-gray-300 drop-shadow-lg" : "bg-[#656565]"}`}
        >
          <p className="text-2xl">Chapter 2</p>
        </NavLink>
        <NavLink
          to="/story/chapter/3"
          className={`w-full rounded-lg px-4 py-3 shadow-lg ${exploredCounts >= 3 ? "bg-[#D9D9D9] text-black shadow-gray-300 drop-shadow-lg" : "bg-[#656565]"}`}
        >
          <p className="text-2xl">Chapter 3</p>
        </NavLink>

        <NavLink
          to="/story/chapter/4"
          className={`w-full rounded-lg px-4 py-3 shadow-lg ${exploredCounts >= 4 ? "bg-[#D9D9D9] text-black shadow-gray-300 drop-shadow-lg" : "bg-[#656565]"}`}
        >
          <p className="text-2xl">Chapter 4</p>
        </NavLink>
        <NavLink
          to="/story/chapter/5"
          className={`w-full rounded-lg px-4 py-3 shadow-lg ${exploredCounts >= 5 ? "bg-[#D9D9D9] text-black shadow-gray-300 drop-shadow-lg" : "bg-[#656565]"}`}
        >
          <p className="text-2xl">Chapter 5</p>
        </NavLink>
        <NavLink
          to="/story/chapter/6"
          className={`w-full rounded-lg px-4 py-3 shadow-lg ${exploredCounts >= 6 ? "bg-[#D9D9D9] text-black shadow-gray-300 drop-shadow-lg" : "bg-[#656565]"}`}
        >
          <p className="text-2xl">Chapter 6</p>
        </NavLink>
        <h1 className="pt-4 text-center font-yrsa text-3xl text-white">
          Cari kristal untuk membuka chapter
        </h1>
      </div>
    </section>
  );
};

export default GameStory;
