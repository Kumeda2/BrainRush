import Button from "../UI/Button/Button";
import { Link } from "react-router";
import { paths } from "../router/paths";

export function EntryButtonGroup({ join }) {
  return (
    <>
      <div className="button-group">
        <Link to={paths.AUTH}>
          <Button
            variant={"classic2"}
            size={{ width: "210px", height: "58px" }}
            animated={true}
          >
            <p>Create game</p>
          </Button>
        </Link>
        <Button
          variant={"classic"}
          clickHandler={join}
          size={{ width: "210px", height: "58px" }}
          animated={true}
        >
          <p>Join game</p>
        </Button>
      </div>
    </>
  );
}
