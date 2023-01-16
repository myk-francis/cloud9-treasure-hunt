import React from "react";

function Navbar({ background, showPlayers, setShowPlayers }) {
  return (
    <div
      className={`fixed w-screen h-[80px] flex justify-between items-center px-4 ${background}`}
    >
      <span className="px-10 font-extrabold text-pink-700 md:text-4xl sm:text-1xl">
        Cloud9
      </span>
      <span
        onClick={() => setShowPlayers(!showPlayers)}
        className="cursor-pointer border border-black rounded-lg px-10 font-extrabold text-pink-700 md:text-4xl sm:text-1xl"
      >
        {showPlayers === true ? "Hide Players" : "Show players"}
      </span>
    </div>
  );
}

export default Navbar;
