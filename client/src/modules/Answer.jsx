import Input from "../UI/Input/Input";

export default function Answer({ answer, question, changeHandler }) {
  return (
    <div className="answer" key={answer.id}>
      <Input
        placeholder={"Answer"}
        width={"80%"}
        border={"solid rgb(231, 231, 231) 1px"}
        value={answer.answer || ""}
        changeHandler={(value) =>
          changeHandler(value, question.id, answer.id, "text")
        }
      />
      <Input
        type={"checkbox"}
        value={answer.is_correct}
        changeHandler={(value) =>
          changeHandler(value, question.id, answer.id, "isCorrect")
        }
      />
    </div>
  );
}
