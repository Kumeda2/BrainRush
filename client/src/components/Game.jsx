import Answers from "../modules/Answers";
import Question from "../modules/Question";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../socket/socket";
import { useNavigate, useParams } from "react-router";
import { updatePlayers } from "../store/slices/playersSlice";
import { toast } from "react-hot-toast";
import useReconnect from "../hooks/useReconnect";

export default function Game() {
  const [question, setQuestion] = useState({});
  const { gameCode } = useParams();
  const { role } = useParams();
  const [isAnswered, setIsAnswered] = useState(false);
  const [passedTime, setPassedTime] = useState();
  const [answers, setAnswers] = useState(0);
  const userRole = role.slice(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { player } = useSelector((state) => state.players);
  const { players } = useSelector((state) => state.players);

  const questionRender = (questionDetails) => {
    console.log(questionDetails);
    setAnswers(0);
    let deltaTime = 0;
    const storedData = localStorage.getItem("questionDetails");
    const prevQuestionDetails = storedData ? JSON.parse(storedData) : null;
    console.log(prevQuestionDetails);

    if (
      prevQuestionDetails &&
      prevQuestionDetails.currentQuestion.id ===
        questionDetails.currentQuestion.id
    ) {
      deltaTime =
        (questionDetails.questionSendTime -
          prevQuestionDetails.questionSendTime) /
        1000;
    }
    setPassedTime(deltaTime);
    setQuestion(questionDetails.currentQuestion);
    localStorage.setItem("questionDetails", JSON.stringify(questionDetails));
    setIsAnswered(false);
  };

  const checkIsAnswerCorrect = (answerData) => {
    answerData.correct
      ? toast.success(`Correct + ${answerData.points}`)
      : toast.error(`Nice try`);
    setIsAnswered(true);
  };

  const fetchResults = (players) => {
    if (userRole === "admin") {
      socket.emit("terminate", { gameCode });
    }
    dispatch(updatePlayers(Object.values(players)));
    navigate(`/results/${gameCode}`);
  };

  useReconnect(gameCode, player, socket, connectSocket);

  useEffect(() => {
    socket.on("next-question", questionRender);
    socket.on("answer-feedback", checkIsAnswerCorrect);
    socket.on("stats", ({ answers }) => setAnswers(answers));
    socket.on("game-over", fetchResults);
    if (userRole === "admin") {
      socket.emit("start-game", { gameCode });
    }

    return () => {
      socket.off("next-question", questionRender);
      socket.off("answer-feedback", checkIsAnswerCorrect);
      socket.off("stats");
      socket.off("game-over", fetchResults);
    };
  }, []);

  const userAnswer = useCallback(
    (answer) => {
      if (!isAnswered) {
        socket.emit("answer", { gameCode, answer });
      }
    },
    [isAnswered]
  );

  return (
    <>
      {question.id && (
        <>
          <Question question={question} passedTime={passedTime} />
          {userRole === "admin" ? (
            <div className="answer-counter">
              <p>
                {answers}/{players.length} answered
              </p>
            </div>
          ) : (
            <Answers question={question} onAnswer={userAnswer} />
          )}
        </>
      )}
    </>
  );
}
