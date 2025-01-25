export default function Game({ title, questions }) {
  return (
    <div className="questions">
      <h1>{title}</h1>
      <div className="questions-container">
        {questions.map((item, idx) => {
          return (
            <div className="question" key={idx}>
              <h3>{item.question}</h3>
              {item.answers.map((answer, idx) => {
                return (
                  <p
                    key={idx}
                    className={answer.is_correct ? "correct" : "incorrect"}
                  >
                    {answer.answer}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
