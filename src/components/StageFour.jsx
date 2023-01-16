import React from "react";
import { motion } from "framer-motion";
import { slideIn } from "../motion";

function StageFour({
  StageFourFinish,
  stageFourCode,
  setStageFourCode,
  playerName,
  hint,
}) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-200 to-green-500">
      <motion.div
        variants={slideIn("down", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        className="flex flex-col gap-1 w-1/2"
      >
        <p>Hi {playerName}, Welcome to Stage Four...</p>
        <p className="text-blue-900">HINT: {hint}</p>
        <input
          type="text"
          defaultValue={stageFourCode}
          onChange={(e) => setStageFourCode(e.target.value)}
          placeholder="Code..."
          className="p-2 bg-white rounded-lg"
        />
        <button
          onClick={() => StageFourFinish(stageFourCode)}
          className="border border-black bg-pink-700 rounded-lg animate-bounce mt-4 h-10"
        >
          Play
        </button>
      </motion.div>
    </div>
  );
}

export default StageFour;
