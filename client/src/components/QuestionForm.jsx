import { IoMdInformationCircleOutline } from "react-icons/io";
import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";
import Button from "../UI/Button/Button";
import { useCallback } from "react";
import CreatingSettings from "../modules/CreatingSettings";
import Answer from "../modules/Answer";

export default function QuestionForm({ question, questionsModifier }) {
  const removeQuestion = (id) => {
    console.log("Removing question at index:", id);
    questionsModifier((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      const index = newQuestions.findIndex((question) => question.id === id);
      newQuestions.splice(index, 1);
      return newQuestions;
    });
  };

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
            if (answer.answer_id === answerId) {
              if (param === "text") {
                return { ...answer, text: value };
              } else {
                return { ...answer, isCorrect: value };
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
    <form
      className="question"
      key={question.id}
      onSubmit={(e) => e.preventDefault()}
    >
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
          key={answer.answer_id}
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
    </form>
  );
}
