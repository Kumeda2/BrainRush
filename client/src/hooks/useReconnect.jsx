import { useEffect } from "react";
import toast from "react-hot-toast";

const useReconnect = (gameCode, player, socket, connectSocket) => {
  useEffect(() => {
    if (!socket.connected) {
      console.log("reconnecting");
      connectSocket();

      const username = player.username;
      const prevSocketId = player.socket;

      socket.emit("join-game", { gameCode, username, prevSocketId });
      socket.emit("current-question", gameCode);

      socket.on("error", (message) => {
        toast.error(message);
      });
    }

    return () => {
      socket.off("error");
    };
  }, [gameCode, player, socket, connectSocket, socket.connected]);
};

export default useReconnect;
