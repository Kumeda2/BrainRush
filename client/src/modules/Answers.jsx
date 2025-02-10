import { memo } from "react";

const MemoizedAnswers = memo(function Answers({ question, onAnswer }) {
  return (
    <div className="answers">
      {question.answers.map((answer) => {
        return (
          <div
            key={answer.id}
            className="answer"
            onClick={() => onAnswer(answer)}
          >
            <p>{answer.answer}</p>
          </div>
        );
      })}
    </div>
  );
});

export default MemoizedAnswers;
