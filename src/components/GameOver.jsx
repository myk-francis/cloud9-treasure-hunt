import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { client } from "../client";

const colors = [
  "text-green-300",
  "text-yellow-300",
  "text-orange-300",
  "text-pink-300",
  "text-cyan-300",
  "text-orange-300",
  "text-coral-300",
];

function GameOver({ playerName }) {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [winners, setWinners] = React.useState(null);

  function getHoursAndMinutes(date = new Date()) {
    return (
      padTo2Digits(date.getHours()) + ":" + padTo2Digits(date.getMinutes())
    );
  }

  function padTo2Digits(num) {
    return String(num).padStart(2, "0");
  }

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  useEffect(() => {
    fetchWinners();

    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const fetchWinners = async () => {
    let winners_query = `*[_type == 'game']`;

    await client.fetch(winners_query).then((data) => {
      setWinners(
        data[0].winners
          .sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.completedAt) - new Date(a.completedAt);
          })
          .reverse()
      );
    });
  };

  return (
    <>
      <Confetti width={windowSize.innerWidth} height={windowSize.innerHeight} />
      <div className="absolute h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500">
        <motion.div
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{
            scale: 0.8,
            rotate: -90,
            borderRadius: "100%",
          }}
        >
          <div className=" flex flex-col gap-2 items-center justify-center">
            <h1 className="text-2xl text-green-900 cursor-pointer font-bold">
              GAME OVER
            </h1>
            <p>Congratulations, You Completed the Treasure Hunt</p>
          </div>
        </motion.div>
        <div className="flex flex-col items-center justify-center overflow-y-scroll">
          <h1 className="underline text-black text-lg cursor-pointer">
            Winners List
          </h1>
          <ul className="list-disc">
            {winners?.map((winner, index) => (
              <li
                className={`${
                  colors[Math.floor(Math.random() * 6) + 0]
                } font-bold italic text-sm`}
                key={winner._key}
              >
                {winner.name}
                {winner.completedAt !== undefined
                  ? " - " + getHoursAndMinutes(new Date(winner.completedAt))
                  : ""}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default GameOver;
