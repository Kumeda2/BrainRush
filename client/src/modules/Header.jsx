import { IoMenu } from "react-icons/io5";
import { Link } from "react-router";
import { paths } from "../router/paths";
import { useState } from "react";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header>
      <IoMenu
        onClick={() => setShowMenu((prev) => !prev)}
        size={"25px"}
        cursor={"pointer"}
      />
      {showMenu && (
        <div className="menu-nav">
          <Link to={paths.MAIN} className="link">
            Main
          </Link>
          <Link to={paths.MY_GAMES} className="link">
            My games
          </Link>
        </div>
      )}
      <h3>DKM-Kahoot</h3>
    </header>
  );
}
