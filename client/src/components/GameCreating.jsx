import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { useEffect, useState, useCallback } from "react";
import FileUploader from "../UI/FileUploader/FileUploader";
import defaultPreview from "../assets/images/default.jpg";
import UserService from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CiUnlock, CiLock } from "react-icons/ci";
import QuestionForm from "./QuestionForm";
import CreationRemote from "../modules/CreationRomote";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getGame } from "../store/actions/asyncGamesActions";
import { paths } from "../router/paths";
import { connectSocket, socket } from "../socket/socket";
import Modal from "../UI/Modal/Modal";

export default function GameCreation() {
  const [questions, setQuestions] = useState([]);
  const [gameName, setGameName] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [preview, setPreview] = useState();
  const [isPrivate, setIsPrivate] = useState(false);
  const [newGame, setNewGame] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { gameId } = useParams();
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { game } = useSelector((state) => state.games);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameId) {
      try {
        dispatch(getGame(gameId));
      } catch (error) {
        toast.error(responseError.response.data.message);
      }
    }
  }, [gameId]);

  useEffect(() => {
    if (!game || !gameId) return;
    console.log(game);
    setGameName(game.game_name);
    setQuestions(game.questions);
    setPreview(game.preview);
    setIsPrivate(game.is_private);
    setRating(game.rating);
  }, [game]);

  useEffect(() => {
    if (newGame) {
      if (gameId) {
        UserService.updateGame(gameId, newGame)
          .then(() => {
            toast.success("Game updated!");
          })
          .catch((responseError) => {
            toast.error(responseError.response.data.message);
          });
      } else {
        UserService.createGame(newGame, user.username)
          .then(() => {
            toast.success("Game created successfully!");
            setNewGame(null);
            setGameName("");
            setQuestions([]);
            setPreview(null);
            setIsPrivate(false);
          })
          .catch((responseError) => {
            toast.error(responseError.response.data.message);
          });
      }
    }
  }, [newGame]);

  const addQuestion = useCallback(() => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: uuidv4(),
        question: "",
        maxPoints: null,
        time: null,
        answers: [
          { id: uuidv4(), answer: null, is_correct: false },
          { id: uuidv4(), answer: null, is_correct: false },
          { id: uuidv4(), answer: null, is_correct: false },
          { id: uuidv4(), answer: null, is_correct: false },
        ],
      },
    ]);
  }, []);

  const uploadPreview = useCallback((event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }

    //TODO: to finish this
  }, []);

  const saveGame = useCallback(() => {
    setShowConfirmationModal(false);
    if (gameName === "") {
      toast.error("Set game name!");
      return;
    } else if (questions.length === 0) {
      toast.error("Create at least one question!");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].question === "") {
        toast.error("Questions must contain some text!");
        return;
      } else if (!questions[i].maxPoints) {
        toast.error("Set maximum points");
        return;
      } else if (!questions[i].time) {
        toast.error("Allocate time for questions");
        return;
      }

      let hasCorrectAnswer = false;
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].answer) {
          toast.error("Answer must contain some text!");
          return;
        }

        if (questions[i].answers[j].is_correct) {
          hasCorrectAnswer = true;
        }
      }

      if (!hasCorrectAnswer) {
        toast.error("Question must contain at least one correct answer");
        return;
      }
    }

    const newGame = {
      game_name: gameName,
      rating,
      isPrivate,
      questions,
    };

    setNewGame(newGame);
  }, [gameName, questions]);

  const deleteGame = useCallback(() => {
    UserService.deleteGame(gameId)
      .then(setIsDeleted(true), toast.success("Game deleted successfully!"))
      .catch((responseError) => {
        toast.error(responseError.response.data.message);
      });
  }, [gameId]);

  const useGame = useCallback(() => {
    connectSocket();
    const gameCode = generateCode();
    socket.emit("initialize-game", { gameCode, quizData: game });
    navigate(`/pre-game-room/${gameCode}`);
  }, []);

  const generateCode = useCallback(() => {
    const code = Math.random().toString(36).substring(2, 10);
    return code;
  }, []);

  return (
    <>
      <div className="creation-page">
        {showConfirmationModal && (
          <Modal
            onClose={() => setShowConfirmationModal(false)}
            showClose={true}
          >
            <div className="confirmation-wrapper">
              <div className="preview-container">
                {preview && <img src={preview} alt="preview" />}
                {!preview && <img src={defaultPreview} alt="preview" />}
              </div>
              <div className="preview-uploader">
                <FileUploader
                  placeholder={"Upload preview"}
                  handleFileUpload={uploadPreview}
                  width={"200px"}
                />
              </div>
              <div className="creation-container">
                <div>
                  <Input
                    type={"checkbox"}
                    id={"private-flag"}
                    changeHandler={() => setIsPrivate((prev) => !prev)}
                  />
                  {!isPrivate && (
                    <label htmlFor="private-flag">
                      Public <CiUnlock />
                    </label>
                  )}
                  {isPrivate && (
                    <label htmlFor="private-flag">
                      Private <CiLock />
                    </label>
                  )}
                </div>
                <Button
                  variant={"classic"}
                  size={{ width: "200px" }}
                  clickHandler={saveGame}
                >
                  {gameId ? "Edit game" : "Create game"}
                </Button>
              </div>
            </div>
          </Modal>
        )}
        {!isDeleted && (
          <section className="game-creation-section">
            <div className="game-title">
              <Input
                placeholder={"Game name"}
                width={"100%"}
                value={gameName || ""}
                changeHandler={setGameName}
              />
            </div>
            <div className="question-wrapper">
              {questions.map((question) => {
                if (question.id)
                  return (
                    <QuestionForm
                      key={question.id}
                      question={question}
                      questionsModifier={setQuestions}
                    />
                  );
              })}
            </div>
            <CreationRemote
              type={gameId ? "edit" : "create"}
              questionsCreator={addQuestion}
              confirmationRemote={setShowConfirmationModal}
              removalController={deleteGame}
              useGameController={useGame}
            />
          </section>
        )}
        {isDeleted && (
          <Modal showClose={false}>
            <Link to={paths.MY_GAMES}>
              <h3>Return to your games</h3>
              <Button variant={"classic"} size={{ width: "200px" }}>
                Return
              </Button>
            </Link>
          </Modal>
        )}
      </div>
    </>
  );
}
