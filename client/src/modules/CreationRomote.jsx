import Button from "../UI/Button/Button";

export default function CreationRemote({
  questionsCreator,
  confirmationRemote,
}) {
  return (
    <div className="game-creation-container">
      <Button
        variant={"classic"}
        animated={true}
        size={{ width: "200px" }}
        clickHandler={questionsCreator}
      >
        + Add question
      </Button>
      <Button
        variant={"classic"}
        animated={true}
        size={{ width: "200px" }}
        clickHandler={() => confirmationRemote((prev) => !prev)}
      >
        Create game
      </Button>
    </div>
  );
}
