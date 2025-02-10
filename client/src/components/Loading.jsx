import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Button from "../UI/Button/Button";
import { connectSocket, disconnectSocket, socket } from "../socket/socket";
import { useNavigate, useParams } from "react-router";
import { paths } from "../router/paths";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Loading() {
  const navigate = useNavigate();
  const { gameCode } = useParams();
  const { player } = useSelector((state) => state.players);

  useEffect(() => {
    const handleLeave = () => leaveRoom();

    if (!socket.connected) {
      connectSocket();

      const username = player.username;
      const prevSocketId = player.socket;

      socket.emit("join-game", { gameCode, username, prevSocketId });

      socket.on("error", (message) => {
        toast.error(message);
      });
    }

    socket.on("kicked", handleLeave);
    socket.on("game-terminated", handleLeave);
    socket.on("game-started", remoteRoom);

    return () => {
      socket.off("kicked", handleLeave);
      socket.off("game-terminated", handleLeave);
      socket.off("game-started", remoteRoom);
    };
  }, []);

  const leaveRoom = () => {
    disconnectSocket();
    navigate(paths.ENTRY);
  };

  const remoteRoom = () => {
    navigate(`/game-room/${gameCode}/:player`);
  };

  return (
    <>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 50,
            }}
            spin
          />
        }
      />
      <div>
        <p>Waiting for the host to start the game...</p>
      </div>
      <Button variant={"classic"} animated={true} clickHandler={leaveRoom}>
        Leave room
      </Button>
    </>
  );
}
