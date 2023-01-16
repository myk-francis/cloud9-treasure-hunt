import React from "react";
import { motion } from "framer-motion";
import { slideIn } from "../motion";

function StageThree({
  StageThreeFinish,
  stageThreeCode,
  setStageThreeCode,
  playerName,
  hint,
}) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-red-200 to-red-600">
      <motion.div
        variants={slideIn("up", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        className="flex flex-col gap-1 w-1/2"
      >
        <p>Hi {playerName}, Welcome to Stage Three...</p>
        <p className="text-blue-900">HINT: {hint}</p>
        <input
          type="text"
          defaultValue={stageThreeCode}
          onChange={(e) => setStageThreeCode(e.target.value)}
          placeholder="Code..."
          className="p-2 bg-white rounded-lg"
        />
        <button
          onClick={() => StageThreeFinish(stageThreeCode)}
          className="border border-black bg-pink-700 rounded-lg animate-bounce mt-4 h-10"
        >
          Play
        </button>
      </motion.div>
    </div>
  );
}

export default StageThree;
