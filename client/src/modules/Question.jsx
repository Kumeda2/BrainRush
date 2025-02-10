import ProgressBar from "./ProgressBar";

export default function Question({ question, passedTime }) {
  return (
    <div className="question-container">
      <ProgressBar key={question.id} duration={question.time - passedTime} />
      <h3>{question.question}</h3>
    </div>
  );
}
