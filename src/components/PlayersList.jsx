import React from "react";
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

function PlayersList({ players }) {
  const [winners, setWinners] = React.useState(null);
  const [showWinners, setshowWinners] = React.useState(false);

  React.useEffect(() => {
    fetchWinners();
  }, []);

  function getHoursAndMinutes(date = new Date()) {
    return (
      padTo2Digits(date.getHours()) + ":" + padTo2Digits(date.getMinutes())
    );
  }

  function padTo2Digits(num) {
    return String(num).padStart(2, "0");
  }

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

  if (players === null) {
    return (
      <div className="flex flex-col w-screen h-screen items-center justify-center bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
        <h1 className="underline text-white text-lg">Players List : Stage</h1>
        <p className=" text-white">No Players Yet, Get in early...</p>
      </div>
    );
  }

  if (showWinners === true && winners !== null) {
    return (
      <div className="flex flex-col w-screen h-screen items-center justify-center bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
        <h1
          onClick={() => setshowWinners(!showWinners)}
          className="underline text-white text-lg cursor-pointer"
        >
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
    );
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center overflow-y-scroll bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
      <h1
        onClick={() => setshowWinners(!showWinners)}
        className="underline text-white text-lg cursor-pointer"
      >
        Players List : Stage
      </h1>
      <ul className="list-disc">
        {players?.map((player) => (
          <li
            className={`${
              colors[Math.floor(Math.random() * 6) + 0]
            } font-bold italic text-sm`}
            key={player._id}
          >
            {player.name} : {player.stage}
            {player.completedAt !== undefined
              ? " - COMPLETED - " +
                getHoursAndMinutes(new Date(player.completedAt))
              : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayersList;
