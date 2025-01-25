import Input from "../UI/Input/Input";

export default function Answer({ answer, question, changeHandler }) {
  return (
    <div className="answer" key={answer.answer_id}>
      <Input
        placeholder={"Answer"}
        width={"80%"}
        border={"solid rgb(231, 231, 231) 1px"}
        value={answer.text || ""}
        changeHandler={(value) =>
          changeHandler(value, question.id, answer.answer_id, "text")
        }
      />
      <Input
        type={"checkbox"}
        value={answer.isCorrect}
        changeHandler={(value) =>
          changeHandler(value, question.id, answer.answer_id, "isCorrect")
        }
      />
    </div>
  );
}
