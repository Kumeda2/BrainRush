import { Link, useNavigate } from "react-router";
import User from "./User";
import { paths } from "../router/paths";
import Button from "../UI/Button/Button";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/middlewareActions";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate(paths.ENTRY);
  };

  return (
    <nav className="sidebar">
      <User />
      <div className="container">
        <Link to={paths.MY_GAMES}>
          <Button variant={"classic2"} size={{ width: "95%" }}>
            My games
          </Button>
        </Link>
        <Link to={paths.GAMES_CREATION}>
          <Button variant={"classic2"} size={{ width: "95%" }}>
            Create game
          </Button>
        </Link>

        <Button
          variant={"classic2"}
          size={{ width: "95%" }}
          clickHandler={logoutHandler}
        >
          Log out
        </Button>
      </div>
    </nav>
  );
}
