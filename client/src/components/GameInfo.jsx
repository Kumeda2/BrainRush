import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button/Button";
import { useCallback, useEffect, useState } from "react";
import Rating from "../modules/Rating";
import Game from "../modules/Game";
import UserService from "../services/UserService";
import { getGame } from "../store/actions/asyncGamesActions";
import { useNavigate } from "react-router";
import { connectSocket, socket } from "../socket/socket";

export default function GameInfo({ isMobile, width }) {
  const { game } = useSelector((state) => state.games);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [rating, setRating] = useState([]);
  const [userRated, setUserRated] = useState(false);
  const navigate = useNavigate();

  const starFiller = (rating) => {
    let ratingArray = [];
    for (let i = 1; i <= 5; i++) {
      if (rating - i >= 0) {
        ratingArray.push(1);
        setRating(ratingArray);
      } else if (rating - i < 0 && rating - i > -1) {
        ratingArray.push(0.5);
        setRating(ratingArray);
      } else {
        ratingArray.push(0);
        setRating(ratingArray);
      }
    }
  };

  useEffect(() => {
    if (game) {
      starFiller(game.rating);
    }
  }, [game]);

  const rateGame = useCallback(
    async (rating) => {
      const userRating = rating + 1;
      await UserService.updateMark(game.id, user.username, userRating);
      setUserRated(true);
    },
    [game, user]
  );

  useEffect(() => {
    if (userRated) {
      dispatch(getGame(game.id));
    }
    setUserRated(false);
  }, [userRated]);

  const useGame = useCallback(() => {
    const gameCode = generateCode();
    connectSocket();
    socket.emit("initialize-game", { gameCode, quizData: game });
    navigate(`/pre-game-room/${gameCode}`);
  }, [game]);

  const generateCode = useCallback(() => {
    const code = Math.random().toString(36).substring(2, 10);
    return code;
  }, []);

  return (
    <div className="main-section">
      {game.game_name && (
        <>
          {width > 1550 && (
            <Rating ratingArray={rating} rating={game.rating} rate={rateGame} />
          )}

          <Game title={game.game_name} questions={game.questions} />
          <div className="button-container">
            {width <= 1550 ? (
              <>
                {" "}
                <Rating
                  ratingArray={rating}
                  rating={game.rating}
                  rate={rateGame}
                />{" "}
                <Button
                  variant={"classic"}
                  size={{ width: "150px", height: "52px" }}
                  clickHandler={useGame}
                >
                  Use game
                </Button>
              </>
            ) : (
              <Button
                variant={"classic"}
                size={{ width: "150px", height: "52px" }}
                clickHandler={useGame}
              >
                Use game
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
