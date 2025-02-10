import Button from "../UI/Button/Button";

export default function GameController({ start, terminate }) {
  return (
    <div className="controller">
      <Button variant={"classic"} clickHandler={start}>
        Start game
      </Button>
      <Button variant={"classic"} clickHandler={terminate}>
        Terminate game
      </Button>
    </div>
  );
}
