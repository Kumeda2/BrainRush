import Games from "../components/Games";
import Sidebar from "../modules/Sidebar";
import GameInfo from "../components/GameInfo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPopularGames } from "../store/actions/asyncGamesActions";
import { Link, useNavigate } from "react-router";
import User from "../modules/User";
import Menu from "../modules/Menu";
import Button from "../UI/Button/Button";
import { logout } from "../store/actions/middlewareActions";
import { paths } from "../router/paths";

export default function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate(paths.ENTRY);
  };

  useEffect(() => {
    dispatch(getPopularGames());
  }, []);

  return (
    <div className="main">
      <Sidebar>
        <div className="container">
          <User />
          <Menu>
            <Link to={paths.MY_GAMES}>
              <Button variant={"classic2"} size={{ width: "100%" }}>
                My games
              </Button>
            </Link>
            <Link to={paths.GAMES_CREATION}>
              <Button variant={"classic2"} size={{ width: "100%" }}>
                Create game
              </Button>
            </Link>
            <Button variant={"classic2"} size={{ width: "100%" }}>
              Something
            </Button>
          </Menu>
        </div>

        <div className="logout-btn">
          <Button
            variant={"classic2"}
            size={{ width: "70%" }}
            clickHandler={logoutHandler}
          >
            Log out
          </Button>
        </div>
      </Sidebar>
      <div className="wrapper">
        <GameInfo />
        <Games />
      </div>
    </div>
  );
}
