import { EntryButtonGroup } from "../modules/EntryButtonGroup";
import { useState } from "react";
import Input from "../UI/Input/Input";

export default function EntryForm() {
  const [isJoin, setIsJoin] = useState(false);
  const [isValidGameCode, setIsValidGameCode] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const joinHandler = (value) => {
    if (value !== "qwerty") {
      setIsValidGameCode(false);
    } else {
      setIsValidGameCode(true);
    }

    //TODO: Add logic to join game
  };

  return (
    <>
      <EntryButtonGroup join={() => setIsJoin((prev) => !prev)} />

      {isJoin && (
        <>
          <div className="input-group">
            <Input
              placeholder={"Enter game code"}
              label={"Join"}
              width={"100%"}
              changeHandler={setInputValue}
              pushEnter={joinHandler}
            />
            <p className="join" onClick={() => joinHandler(inputValue)}>
              Join
            </p>
          </div>
          {!isValidGameCode && (
            <p className="Code-error">*Room doesn't exists</p>
          )}
        </>
      )}
    </>
  );
}
