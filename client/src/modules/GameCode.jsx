import { Toaster } from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";

export default function GameCode({ gameCode, copy }) {
  return (
    <div className="game-code-container">
      <h3>Game code: {gameCode}</h3>
      <MdContentCopy onClick={copy} style={{ cursor: "pointer" }} />
    </div>
  );
}
