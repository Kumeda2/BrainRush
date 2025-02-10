import Input from "../UI/Input/Input";

export default function CreatingSettings({ changeHandler, question }) {
  return (
    <div className="settings">
      <label htmlFor="timer">Timer</label>
      <Input
        type={"number"}
        value={question.time || ""}
        id={"timer"}
        width={"50%"}
        border={"solid rgb(231, 231, 231) 1px"}
        placeholder={"Set question time in seconds"}
        changeHandler={(value) => changeHandler(value, question.id, "time")}
      />
      <label htmlFor="points">Points</label>
      <Input
        value={question.maxPoints || ""}
        id={"points"}
        width={"50%"}
        type={"number"}
        border={"solid rgb(231, 231, 231) 1px"}
        changeHandler={(value) =>
          changeHandler(value, question.id, "maxPoints")
        }
      />
    </div>
  );
}
