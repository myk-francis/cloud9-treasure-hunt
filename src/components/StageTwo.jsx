import React from "react";
import { motion } from "framer-motion";
import { slideIn } from "../motion";

function StageTwo({
  StageTwoFinish,
  stageTwoCode,
  setStageTwoCode,
  playerName,
  hint,
}) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        className="flex flex-col gap-1 w-1/2"
      >
        <p>Hi {playerName}, Welcome to Stage Two...</p>
        <p className="text-green-900">HINT: {hint}</p>
        <input
          type="text"
          defaultValue={stageTwoCode}
          onChange={(e) => setStageTwoCode(e.target.value)}
          placeholder="Code..."
          className="p-2 bg-white rounded-lg"
        />
        <button
          onClick={() => StageTwoFinish(stageTwoCode)}
          className="border border-black bg-pink-700 rounded-lg animate-bounce mt-4 h-10"
        >
          Play
        </button>
      </motion.div>
    </div>
  );
}

export default StageTwo;
