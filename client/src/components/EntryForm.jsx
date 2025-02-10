import { EntryButtonGroup } from "../modules/EntryButtonGroup";
import { useState } from "react";
import Input from "../UI/Input/Input";
import { socket, connectSocket } from "../socket/socket";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setPlayer } from "../store/slices/playersSlice";

export default function EntryForm() {
  const [isJoin, setIsJoin] = useState(false);
  const [username, setUsername] = useState("");
  const [gameCode, setGameCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const joinHandler = () => {
    toast.dismiss();
    if (username !== "") {
      connectSocket();

      socket.emit("join-game", { gameCode, username });

      socket.on("joined-data", (socketId) => {
        dispatch(setPlayer({ username, socket: socketId }));
        navigate(`/waiting-room/${gameCode}`);
      });

      socket.on("error", (message) => {
        toast.error(message);
      });
    } else {
      toast.error("Enter username!");
    }
  };

  return (
    <div className="entry-form">
      <EntryButtonGroup join={() => setIsJoin((prev) => !prev)} />

      {isJoin && (
        <>
          <div className="container">
            <Input
              placeholder={"Username"}
              width={"100%"}
              changeHandler={setUsername}
            />
            <p className="join" onClick={joinHandler}>
              Join
            </p>
          </div>
          <Input
            placeholder={"Game code"}
            width={"100%"}
            changeHandler={setGameCode}
            pushEnter={joinHandler}
          />
        </>
      )}
    </div>
  );
}
