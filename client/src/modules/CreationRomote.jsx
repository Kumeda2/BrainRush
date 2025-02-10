import { memo } from "react";
import Button from "../UI/Button/Button";

const MemoizedCreationRemote = memo(function CreationRemote({
  questionsCreator,
  confirmationRemote,
  removalController,
  useGameController,
  type,
}) {
  return (
    <>
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
          {type === "edit" && "Edit game"}
          {type === "create" && "Create game"}
        </Button>
        {type === "edit" && (
          <>
            <Button
              variant={"classic2"}
              animated={true}
              size={{ width: "200px" }}
              clickHandler={useGameController}
            >
              Use Game
            </Button>
            <Button
              variant={"classic2"}
              animated={true}
              size={{ width: "200px" }}
              clickHandler={() => removalController((prev) => !prev)}
            >
              Delete game
            </Button>
          </>
        )}
      </div>
    </>
  );
});

export default MemoizedCreationRemote;
