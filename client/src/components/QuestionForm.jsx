import { IoMdInformationCircleOutline } from "react-icons/io";
import TextArea from "../UI/TextArea/TextArea";
import Button from "../UI/Button/Button";
import { memo, useCallback } from "react";
import CreatingSettings from "../modules/CreatingSettings";
import Answer from "../modules/Answer";

const MemoizedQuestionForm = memo(function QuestionForm({
  question,
  questionsModifier,
}) {
  const removeQuestion = useCallback((id) => {
    questionsModifier((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      const index = newQuestions.findIndex((question) => question.id === id);
      newQuestions.splice(index, 1);
      return newQuestions;
    });
  }, []);

  const changeQuestionHandler = useCallback((value, questionId, param) => {
    questionsModifier((prevQuestions) => {
      return prevQuestions.map((question) => {
        if (question.id === questionId) {
          if (param === "question") {
            return { ...question, question: value };
          } else if (param === "time") {
            return { ...question, time: value };
          } else if (param === "maxPoints") {
            return { ...question, maxPoints: value };
          }
        }
        return question;
      });
    });
  }, []);

  const changeAnswer = useCallback((value, questionId, answerId, param) => {
    questionsModifier((prevQuestions) => {
      return prevQuestions.map((question) => {
        if (question.id === questionId) {
          const newAnswers = question.answers.map((answer) => {
            if (answer.id === answerId) {
              if (param === "text") {
                return { ...answer, answer: value };
              } else {
                return { ...answer, is_correct: value };
              }
            }
            return answer;
          });
          return { ...question, answers: newAnswers };
        }
        return question;
      });
    });
  }, []);

  return (
    <div className="question-shared" onSubmit={(e) => e.preventDefault()}>
      <TextArea
        value={question.question || ""}
        placeholder={"Type your question"}
        width={"100%"}
        border={"solid rgb(231, 231, 231) 1px"}
        changeHandler={(value) =>
          changeQuestionHandler(value, question.id, "question")
        }
      />
      {question.answers.map((answer) => (
        <Answer
          key={answer.id}
          answer={answer}
          question={question}
          changeHandler={changeAnswer}
        />
      ))}
      <div className="tip">
        <p>Tag correct answers</p>
        <IoMdInformationCircleOutline color="rgb(255, 136, 136)" />
      </div>
      <CreatingSettings
        changeHandler={changeQuestionHandler}
        question={question}
      />
      <Button
        variant={"classic"}
        size={{ width: "200px" }}
        clickHandler={() => removeQuestion(question.id)}
      >
        Remove question
      </Button>
    </div>
  );
});

export default MemoizedQuestionForm;
