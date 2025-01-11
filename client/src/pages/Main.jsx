import Games from "../components/Games";
import Sidebar from "../components/Sidebar";
import GameInfo from "../components/GameInfo";

export default function Main() {
  return (
    <div className="main">
      <Sidebar />
      <div className="wrapper">
        <GameInfo />
        <Games />
      </div>
    </div>
  );
}
