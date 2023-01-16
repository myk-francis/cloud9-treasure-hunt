import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import Login from "./components/Login";
import StageOne from "./components/StageOne";
import StageTwo from "./components/StageTwo";
import StageThree from "./components/StageThree";
import StageFour from "./components/StageFour";
import GameOver from "./components/GameOver";
import PlayersList from "./components/PlayersList";
import { client } from "./client";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loading, setLoading] = React.useState(false);
  const [stage, setStage] = React.useState("0");
  const [playerName, setPlayerName] = React.useState("");
  const [stageOneCode, setStageOneCode] = React.useState("");
  const [stageTwoCode, setStageTwoCode] = React.useState("");
  const [stageThreeCode, setStageThreeCode] = React.useState("");
  const [stageFourCode, setStageFourCode] = React.useState("");
  const [player, setPlayer] = React.useState("");
  const [players, setPlayers] = React.useState(null);
  const [game, setGame] = React.useState(null);
  const [hints, setHints] = React.useState(null);
  const [showPlayers, setShowPlayers] = React.useState(false);

  useEffect(() => {
    const Player =
      localStorage.getItem("player") !== "undefined"
        ? JSON.parse(localStorage.getItem("player"))
        : localStorage.clear();

    if (Player) {
      setPlayer(Player);
      setStage(Player?.stage);
    } else {
      setStage(0);
    }

    fetchPlayers();
    fetchHints();
  }, []);

  const fetchHints = async () => {
    let hints_query = `*[_type == 'stage'] | order(_createdAt desc) {
      stage,
      hint,
    }`;

    await client.fetch(hints_query).then((data) => {
      setHints(data);
    });
  };

  const fetchPlayers = async () => {
    let players_query = `*[_type == 'player'] | order(_createdAt asc)`;
    let game_query = `*[_type == 'game'][0]`;

    await client.fetch(players_query).then((data) => {
      setPlayers(data);
    });

    await client.fetch(game_query).then((data) => {
      setGame(data);
    });
  };

  const LoginPlayer = async (name) => {
    setLoading(true);

    let result = null;

    if (name !== undefined || name !== null || name.trim() !== "") {
      const doc = {
        _type: "player",
        name: name,
        stage: 1,
      };

      if (players) {
        result = players.findIndex((item) => item.name === name.trim());
      }

      if (result > 0) {
        toast.warning("Name Already Taken!!!");
        setLoading(false);
        return;
      }

      await client
        .create(doc)
        .then(() => {
          setStage(1);
        })
        .catch((response) => {
          console.log(response);
          setLoading(false);
        });
    } else {
      toast.warning("Please provide name!!!");
    }

    let player_query = `*[_type == 'player' && name == '${name}'][0]`;

    await client.fetch(player_query).then((data) => {
      setPlayer(data);
      localStorage.setItem("player", JSON.stringify(data));
    });

    setLoading(false);
  };

  const StageOneFinish = async (code) => {
    setLoading(true);

    let passedStage = false;

    let Player =
      localStorage.getItem("player") !== "undefined"
        ? JSON.parse(localStorage.getItem("player"))
        : localStorage.clear();

    const query = `*[_type == 'stage' && stage == 'one'][0]`;

    if (code !== undefined && code !== null && code.trim() !== "") {
      await client.fetch(query).then((data) => {
        if (data.Answer === code) {
          toast.success("PASSED STAGE ONE!!");

          passedStage = true;
          setStage(2);

          localStorage.setItem(
            "player",
            JSON.stringify({ ...Player, stage: 2 })
          );
        } else {
          toast.error("Wrong Code!!! Try again");
        }
      });

      if (passedStage) {
        await client.patch(player._id).set({ stage: 2 }).commit();
      }
    } else {
      toast.error("Please provide Stage One Code!!!");
    }

    setLoading(false);
  };

  const StageTwoFinish = async (code) => {
    setLoading(true);
    let passedStage = false;

    let Player =
      localStorage.getItem("player") !== "undefined"
        ? JSON.parse(localStorage.getItem("player"))
        : localStorage.clear();

    const query = `*[_type == 'stage' && stage == 'two'][0]`;

    if (code !== undefined && code !== null && code.trim() !== "") {
      await client.fetch(query).then((data) => {
        if (data.Answer === code) {
          toast.success("PASSED STAGE TWO!!");
          passedStage = true;
          setStage(3);

          localStorage.setItem(
            "player",
            JSON.stringify({ ...Player, stage: 3 })
          );
        } else {
          toast.error("Wrong Code!!! Try again");
        }
      });

      if (passedStage) {
        await client.patch(player._id).set({ stage: 3 }).commit();
      }
    } else {
      toast.error("Please provide Stage Two Code!!!");
    }

    setLoading(false);
  };

  const StageThreeFinish = async (code) => {
    setLoading(true);

    let passedStage = false;

    let Player =
      localStorage.getItem("player") !== "undefined"
        ? JSON.parse(localStorage.getItem("player"))
        : localStorage.clear();

    const query = `*[_type == 'stage' && stage == 'three'][0]`;

    if (code !== undefined && code !== null && code.trim() !== "") {
      await client.fetch(query).then((data) => {
        if (data.Answer === code) {
          toast.success("PASSED STAGE THREE!!");
          passedStage = true;
          setStage(4);

          localStorage.setItem(
            "player",
            JSON.stringify({ ...Player, stage: 4 })
          );
        } else {
          toast.error("Wrong Code!!! Try again");
        }
      });

      if (passedStage) {
        await client.patch(player._id).set({ stage: 4 }).commit();
      }
    } else {
      toast.error("Please provide Stage Three Code!!!");
    }

    setLoading(false);
  };

  const StageFourFinish = async (code) => {
    setLoading(true);

    let passedStage = false;

    let Player =
      localStorage.getItem("player") !== "undefined"
        ? JSON.parse(localStorage.getItem("player"))
        : localStorage.clear();

    const query = `*[_type == 'stage' && stage == 'four'][0]`;

    if (code !== undefined && code !== null && code.trim() !== "") {
      await client.fetch(query).then((data) => {
        if (data.Answer === code) {
          toast.success("CONGRATULATIONS!!");
          passedStage = true;
          setStage(5);

          localStorage.setItem(
            "player",
            JSON.stringify({ ...Player, stage: 5 })
          );
        } else {
          toast.error("Wrong Code!!! Try again");
        }
      });

      if (passedStage) {
        await client
          .patch(player._id)
          .set({ stage: 5, completedAt: new Date().toISOString() })
          .commit();

        await client
          .patch(game._id)
          .set({ completed: true })
          .commit()
          .catch((err) => {
            console.error("Oh no, the update failed: ", err.message);
          });

        await client
          .patch(game?._id)
          .setIfMissing({ winners: [] })
          .insert("after", "winners[-1]", [
            {
              name: player.name,
              stage: 5,
              completedAt: new Date().toISOString(),
            },
          ])
          .commit({ autoGenerateArrayKeys: true })
          .catch((err) => {
            console.error("Oh no, the update failed: ", err.message);
          });
      }
    } else {
      toast.error("Please provide Stage Four Code!!!");
    }

    setLoading(false);
  };

  if (loading) {
    return <Spinner message={"Please Wait ..."} />;
  }

  if (showPlayers) {
    return (
      <>
        <Navbar
          showPlayers={showPlayers}
          setShowPlayers={setShowPlayers}
          background={"bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900"}
        />
        <PlayersList players={players} />
      </>
    );
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {stage === 0 ? (
        <>
          <Navbar
            showPlayers={showPlayers}
            setShowPlayers={setShowPlayers}
            background={"bg-gradient-to-r from-gray-700 via-gray-900 to-black"}
          />
          <Login
            LoginPlayer={LoginPlayer}
            playerName={playerName}
            setPlayerName={setPlayerName}
          />
        </>
      ) : null}

      {stage === 1 ? (
        <>
          <Navbar
            showPlayers={showPlayers}
            setShowPlayers={setShowPlayers}
            background={
              "bg-gradient-to-r from-yellow-200 via-green-200 to-green-500"
            }
          />
          <StageOne
            playerName={player?.name}
            StageOneFinish={StageOneFinish}
            stageOneCode={stageOneCode}
            setStageOneCode={setStageOneCode}
          />
        </>
      ) : null}

      {stage === 2 ? (
        hints !== null ? (
          <>
            <Navbar
              showPlayers={showPlayers}
              setShowPlayers={setShowPlayers}
              background={
                "bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700"
              }
            />
            <StageTwo
              hint={hints[2]?.hint}
              playerName={player?.name}
              StageTwoFinish={StageTwoFinish}
              stageTwoCode={stageTwoCode}
              setStageTwoCode={setStageTwoCode}
            />
          </>
        ) : null
      ) : null}

      {stage === 3 ? (
        hints !== null ? (
          <>
            <Navbar
              showPlayers={showPlayers}
              setShowPlayers={setShowPlayers}
              background={"bg-gradient-to-r from-red-200 to-red-600"}
            />
            <StageThree
              hint={hints[1]?.hint}
              playerName={player?.name}
              StageThreeFinish={StageThreeFinish}
              stageThreeCode={stageThreeCode}
              setStageThreeCode={setStageThreeCode}
            />
          </>
        ) : null
      ) : null}

      {stage === 4 ? (
        hints !== null ? (
          <>
            <Navbar
              showPlayers={showPlayers}
              setShowPlayers={setShowPlayers}
              background={"bg-gradient-to-r from-green-200 to-green-500"}
            />
            <StageFour
              hint={hints[0]?.hint}
              playerName={player?.name}
              StageFourFinish={StageFourFinish}
              stageFourCode={stageFourCode}
              setStageFourCode={setStageFourCode}
            />
          </>
        ) : null
      ) : null}

      {stage === 5 ? <GameOver playerName={player?.name} /> : null}
    </div>
  );
}

export default App;
