import React from "react";
import { motion } from "framer-motion";
import { navVariants } from "../motion";
import TypeMe, { Delete } from "react-typeme";

function Login({ LoginPlayer, playerName, setPlayerName }) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <motion.div
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className="w-1/2 h-1/2 flex flex-col gap-1"
      >
        <h1 className="text-lg sm:text-4xl font-bold text-[#8892b0]">
          <TypeMe
            typingSpeed={150}
            deleteSpeed={150}
            strings={[
              "  Welcome to Mbalamwezi Miwaleni.",
              <Delete characters={20} />,
              "Game Experience.",
              <Delete characters={16} />,
              "Treasure Hunt.",
            ]}
          />
        </h1>
        <p className="text-white">Hi, Player Please Provide your name</p>
        <input
          type="text"
          defaultValue={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Name..."
          className="p-2 bg-white rounded-lg"
        />
        <button
          onClick={() => LoginPlayer(playerName)}
          className="border border-black bg-pink-700 rounded-lg animate-bounce mt-4 h-10"
        >
          LETS GOO
        </button>
      </motion.div>
    </div>
  );
}

export default Login;
