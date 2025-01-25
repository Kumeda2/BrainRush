import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button/Button";
import { useEffect, useState } from "react";
import Rating from "../modules/Rating";
import Game from "../modules/Game";
import UserService from "../services/UserService";
import { getGame } from "../store/actions/asyncGamesActions";

export default function GameInfo() {
  const { game } = useSelector((state) => state.games);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [rating, setRating] = useState([]);
  const [userRated, setUserRated] = useState(false);

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

  const rateGame = async (rating) => {
    const userRating = rating + 1;
    await UserService.updateMark(game.id, user.username, userRating);
    setUserRated(true);
  };

  useEffect(() => {
    if (userRated) {
      dispatch(getGame(game.id));
    }
    setUserRated(false);
  }, [userRated]);

  const addGame = () => {};

  return (
    <div className="main-section">
      {game.game_name && (
        <>
          <Rating ratingArray={rating} rating={game.rating} rate={rateGame} />
          <Game title={game.game_name} questions={game.questions} />
          <div className="button-container">
            <Button
              variant={"classic"}
              size={{ width: "150px", height: "52px" }}
              clickHandler={addGame}
            >
              Use game
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
