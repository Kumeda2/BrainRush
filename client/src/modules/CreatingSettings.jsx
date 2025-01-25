import Input from "../UI/Input/Input";

export default function CreatingSettings({ changeHandler, question }) {
  return (
    <div className="settings">
      <label htmlFor="timer">Timer</label>
      <Input
        value={question.time || ""}
        id={"timer"}
        width={"50%"}
        border={"solid rgb(231, 231, 231) 1px"}
        placeholder={"MM:SS"}
        pushEnter={(value) => {
          const isValid = /^([0-5]?[0-9]):([0-5]?[0-9])$/.test(value);
          if (isValid) {
            console.log("Valid timer:", value);
          } else {
            console.error("Invalid timer format. Use MM:SS.");
          }
        }} /////////this is the part that needs to be changed
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
