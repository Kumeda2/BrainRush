import Menu from "../modules/Menu";
import User from "../modules/User";
import Button from "../UI/Button/Button";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="container">
        <User />
        <Menu />
      </div>

      <div className="logout-btn">
        <Button variant={"classic2"} size={"70%"}>
          Log out
        </Button>
      </div>
    </div>
  );
}
