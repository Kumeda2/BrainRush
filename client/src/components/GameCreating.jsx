import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { useEffect, useState, useCallback } from "react";
import Modal from "../UI/Modal/Modal";
import FileUploader from "../UI/FileUploader/FileUploader";
import defaultPreview from "../assets/images/default.jpg";
import UserService from "../services/UserService";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { CiUnlock, CiLock } from "react-icons/ci";
import QuestionForm from "./QuestionForm";
import CreationRemote from "../modules/CreationRomote";
import { v4 as uuidv4 } from "uuid";

export default function GameCreation() {
  const [questions, setQuestions] = useState([]);
  const [gameName, setGameName] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [preview, setPreview] = useState();
  const [isPrivate, setIsPrivate] = useState(false);
  const [formData, setFormData] = useState();
  const { user } = useSelector((state) => state.user);

  const addQuestion = useCallback(() => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: uuidv4(),
        question: "",
        maxPoints: null,
        time: null,
        answers: [
          { answer_id: uuidv4(), text: null, isCorrect: false },
          { answer_id: uuidv4(), text: null, isCorrect: false },
          { answer_id: uuidv4(), text: null, isCorrect: false },
          { answer_id: uuidv4(), text: null, isCorrect: false },
        ],
      },
    ]);
  }, []);

  const uploadPreview = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      const newFormData = new FormData(formData);
      newFormData.append("preview", file);
      setFormData(newFormData);
    }
  };

  const saveGame = () => {
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
        if (!questions[i].answers[j].text) {
          toast.error("Answer must contain some text!");
          return;
        }

        if (questions[i].answers[j].isCorrect) {
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
      marks: 0,
      rating: 0,
      isPrivate: isPrivate,
      questions: questions,
    };

    const newFormData = new FormData(formData);
    newFormData.append("game", JSON.stringify(newGame));
    setFormData(newFormData);
  };

  useEffect(() => {
    if (formData && formData.has("game")) {
      UserService.createGame(formData, user.username);
      setGameName("");
      setQuestions([]);
      setFormData(new FormData());
      setPreview();
      setShowConfirmationModal(false);
    }
  }, [formData]);

  return (
    <>
      <Toaster />
      <div className="creation-page">
        {showConfirmationModal && (
          <Modal onClose={() => setShowConfirmationModal(false)}>
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
                  clickHandler={() => saveGame()}
                >
                  Create game
                </Button>
              </div>
            </div>
          </Modal>
        )}
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
            {questions.map((question) => (
              <QuestionForm
                key={question.id}
                question={question}
                questionsModifier={setQuestions}
              />
            ))}
          </div>
          <CreationRemote
            questionsCreator={addQuestion}
            confirmationRemote={setShowConfirmationModal}
          />
        </section>
      </div>
    </>
  );
}
