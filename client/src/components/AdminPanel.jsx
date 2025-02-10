import GameCode from "../modules/GameCode";
import GameController from "../modules/GameController";
import PlayersPanel from "../modules/PlayersPanel";
import { useNavigate, useParams } from "react-router";
import { connectSocket, socket } from "../socket/socket";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayer, updatePlayers } from "../store/slices/playersSlice";
import toast from "react-hot-toast";
import { paths } from "../router/paths";
import { setIsStarted } from "../store/slices/socketSlice";
import { generateAvatar } from "../utils/generateAvatar";
import useReconnect from "../hooks/useReconnect";

export default function AdminPanel() {
  const { gameCode } = useParams();
  const dispatch = useDispatch();
  const { players } = useSelector((state) => state.players);
  const { player } = useSelector((state) => state.players);
  const navigate = useNavigate();

  const handlePlayersChanged = (players) => {
    console.log(players);
    if (!players) return;
    dispatch(
      updatePlayers(
        Object.values(players).filter((player) => player.user !== "host")
      )
    );
  };

  const kickHandler = (leftPlayer) => {
    toast.success(`Player ${leftPlayer.user} was kicked`);

    dispatch(
      updatePlayers(players.filter((player) => player.id !== leftPlayer.id))
    );
  };

  const handleTermination = () => {
    dispatch(updatePlayers([]));
    navigate(paths.MAIN);
  };

  useEffect(() => {
    socket.emit("get-players", { gameCode });

    socket.on("send-players", handlePlayersChanged);
    socket.on("player-joined", handlePlayersChanged);
    socket.on("player-left", handlePlayersChanged);
    socket.on("player-kicked", ({ leftPlayer }) => kickHandler(leftPlayer));
    socket.on("game-terminated", handleTermination);
    socket.on("game-initialized", ({ socketId }) => {
      dispatch(setPlayer({ username: "host", socket: socketId }));
    });

    return () => {
      socket.off("send-players", handlePlayersChanged);
      socket.off("player-joined", handlePlayersChanged);
      socket.off("player-left", handlePlayersChanged);
      socket.off("player-kicked", kickHandler);
      socket.off("game-terminated", handleTermination);
      socket.off("game-initialized");
    };
  }, [gameCode]);

  useReconnect(gameCode, player, socket, connectSocket);

  const kickPlayer = (playerId) => {
    socket.emit("kick", { playerId });
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(gameCode)
      .then(() => toast.success("Game code copied!"))
      .catch((err) => toast.error("Failed to copy: ", err));
  };

  const startGame = () => {
    if (players.length === 0) {
      toast.dismiss();
      return toast.error("room is empty");
    }
    dispatch(setIsStarted(true));
    navigate(`/game-room/${gameCode}/:admin`);
  };

  const terminateGame = () => {
    socket.emit("terminate", { gameCode });
    navigate(paths.MAIN);
  };

  return (
    <>
      <GameCode copy={copyToClipboard} gameCode={gameCode} />
      <PlayersPanel
        players={players}
        getAvatar={generateAvatar}
        removePlayer={kickPlayer}
      />
      <GameController start={startGame} terminate={terminateGame} />
    </>
  );
}
