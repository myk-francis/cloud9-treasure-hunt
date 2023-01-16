import React from "react";
import { motion } from "framer-motion";
import { slideIn } from "../motion";
import { toast } from "react-toastify";

function StageOne({
  StageOneFinish,
  stageOneCode,
  setStageOneCode,
  playerName,
}) {
  const [solved, setSolved] = React.useState(false);
  const [puzzle, setPuzzle] = React.useState("");

  const SolvePuzzle = () => {
    if (puzzle.trim().toLowerCase() === "cloud9 treasure hunt") {
      setSolved(true);
    } else {
      toast.warning("Close, Try again");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-200 via-green-200 to-green-500">
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        className="flex flex-col gap-1 w-1/2"
      >
        <p className="text-black">
          Hi {playerName}, Welcome to Stage One. Solve this word puzzle
        </p>

        <p className="text-black font-bold text-lg sm:text-2xl">
          CLO_ _9 T_ _ A_U_E H_ _T
        </p>
        {solved === true ? (
          <>
            <p>
              Here's Your Code: <span className="text-pink-700">mike1</span>
            </p>
            <input
              type="text"
              defaultValue={stageOneCode}
              onChange={(e) => setStageOneCode(e.target.value)}
              placeholder="Code..."
              className="p-2 bg-white rounded-lg"
            />
            <button
              onClick={() => StageOneFinish(stageOneCode)}
              className="border border-black bg-pink-700 rounded-lg animate-bounce mt-4 h-10"
            >
              Play
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              defaultValue={puzzle}
              onChange={(e) => setPuzzle(e.target.value)}
              placeholder="Puzzle..."
              className="p-2 bg-white rounded-lg"
            />
            <button
              onClick={() => SolvePuzzle(stageOneCode)}
              className="border border-black bg-blue-400 rounded-lg mt-2"
            >
              Solve
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default StageOne;
