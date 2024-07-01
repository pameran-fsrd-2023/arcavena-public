import React from "react";
import Swal from "sweetalert2";
import Button from "../Button";
import Footer from "../Footer";
import Image from "../Image";

interface Session {
  id: number;
  label: string;
  endTime: string;
}

interface FormSesiProps {
  day1Value: string;
  day2Value: string;
  onDay1Change: (updatedValue: string) => void;
  onDay2Change: (updatedValue: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const FormSesi: React.FC<FormSesiProps> = ({
  day1Value,
  day2Value,
  onDay1Change,
  onDay2Change,
  onBack,
  onSubmit,
}) => {
  const sessions: Session[] = [
    { id: 1, label: "08.00-11.00", endTime: "11:00" },
    { id: 2, label: "11.00-14.30", endTime: "14:30" },
    { id: 3, label: "14.30-17.30", endTime: "17:30" },
  ];

  const session1: Session[] = [
    { id: 1, label: "12.15-15.00", endTime: "15:00" },
    { id: 2, label: "15.00-17.55", endTime: "17:55" },
  ];

  const handleDay1RadioChange = (sessionLabel: string) => {
    onDay1Change(sessionLabel);
  };

  const handleDay2RadioChange = (sessionLabel: string) => {
    onDay2Change(sessionLabel);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isDay1Selected = day1Value !== "";
    const isDay2Selected = day2Value !== "";

    if (!isDay1Selected && !isDay2Selected) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Harap pilih setidaknya satu sesi antara Day 1 atau Day 2!",
      });
      return;
    }

    onSubmit();
  };

  const getCurrentTime = (): number => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  const currentTime = getCurrentTime();

  const filterSessions = (sessions: Session[], day: number): Session[] => {
    const currentDay = new Date().getDate();
    if (currentDay > day) return []; // If the session day has passed, return an empty array

    return sessions.filter((session) => {
      const [endHour, endMinute] = session.endTime.split(":").map(Number);
      const sessionEndTime = endHour * 60 + endMinute;
      return (
        currentDay < day || (currentDay === day && currentTime < sessionEndTime)
      );
    });
  };

  const filteredSession1 = filterSessions(session1, 22); // 22nd June
  const filteredSessions = filterSessions(sessions, 23); // 23rd June

  return (
    <div className="flex min-h-screen flex-col justify-between font-jomolhari">
      <form
        className="mx-auto flex h-fit w-full max-w-[800px] grow flex-col items-center justify-center p-4 text-white"
        onSubmit={handleSubmit}
      >
        <div
          className="flex h-auto w-[80%] max-w-[20rem] flex-col items-center justify-center"
          data-aos="fade-up"
        >
          <Image src="/home/karakter/Atelius.webp" />
        </div>
        <p className="max-w-[600px] text-balance py-2 text-center text-xl">
          Halo, kamu ingin reservasi untuk Day 1 atau Day 2? atau dua-duanya?
        </p>
        <div className="flex w-full max-w-[400px] flex-col gap-8 py-8 sm:max-w-[800px] sm:flex-row">
          <section className="flex w-full flex-col items-start rounded-md bg-white/10 p-4 px-8">
            <h2 className="font-lato text-xl uppercase">
              Day 1 (22 Juni 2024)
            </h2>
            {filteredSession1.length > 0 ? (
              filteredSession1.map((session) => (
                <div
                  key={session.id}
                  className="flex w-full items-center gap-1 py-1 pl-[0.7rem] text-base hover:bg-purple-800/40"
                >
                  <input
                    type="radio"
                    name="day1-session"
                    id={`day1-session-${session.id}`}
                    value={session.label}
                    checked={day1Value === session.label}
                    onChange={() => handleDay1RadioChange(session.label)}
                  />
                  <label
                    htmlFor={`day1-session-${session.id}`}
                    className="cursor-pointer font-sans tracking-wider"
                  >
                    {session.label}
                  </label>
                </div>
              ))
            ) : (
              <p className="font-lato text-base">
                Sesi pada hari ini sudah selesai
              </p>
            )}
          </section>
          <section className="flex w-full flex-col items-start rounded-md bg-white/10 p-4 px-8">
            <h2 className="font-lato text-xl uppercase">
              Day 2 (23 Juni 2024)
            </h2>
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex w-full items-center gap-1 py-1 pl-[0.7rem] text-base hover:bg-purple-800/40"
                >
                  <input
                    type="radio"
                    name="day2-session"
                    id={`day2-session-${session.id}`}
                    value={session.label}
                    checked={day2Value === session.label}
                    onChange={() => handleDay2RadioChange(session.label)}
                  />
                  <label
                    htmlFor={`day2-session-${session.id}`}
                    className="cursor-pointer font-sans tracking-wider"
                  >
                    {session.label}
                  </label>
                </div>
              ))
            ) : (
              <p className="font-lato text-base">
                Sesi pada hari ini sudah selesai
              </p>
            )}
          </section>
        </div>
        <div className="flex flex-col-reverse items-center justify-center gap-12 pt-8 sm:flex-row">
          <Button type="button" color="white" onClick={onBack}>
            <p className="px-4 text-black shadow-black drop-shadow-md">
              Kembali
            </p>
          </Button>
          <Button type="submit">
            <p className="px-2 font-bold text-white shadow-black drop-shadow-md">
              Lanjut
            </p>
          </Button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default FormSesi;
