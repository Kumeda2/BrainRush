import { useSelector } from "react-redux";

export default function GameInfo() {
  const currentGame = useSelector((state) => state.currentGame.game);
  return (
    <div className="main-section">
      <div className="background-preview">
        <img src={currentGame.preview} className="preview" />
      </div>
      <h1>{currentGame.title}</h1>
    </div>
  );
}
