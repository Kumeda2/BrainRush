import Button from "../UI/Button/Button";
import { Link } from "react-router";
import { paths } from "../router/paths";

export function EntryButtonGroup({ join }) {
  return (
    <>
      <div className="button-group">
        <Button
          variant={"classic"}
          clickHandler={join}
          size={{ width: "170px" }}
          animated={true}
        >
          Join game
        </Button>
        <Link to={paths.AUTH}>
          <Button
            variant={"classic2"}
            size={{ width: "170px" }}
            animated={true}
          >
            Create game
          </Button>
        </Link>
      </div>
    </>
  );
}
