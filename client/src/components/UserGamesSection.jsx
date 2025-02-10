import { useDispatch, useSelector } from "react-redux";
import Card from "../modules/Card";
import { useCallback, useEffect, useState } from "react";
import { getUserGames } from "../store/actions/asyncGamesActions";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import { resetUserGames } from "../store/slices/gamesSlice";
import img from "../assets/images/default_game_banner.jpg";

export default function UserGamesSection() {
  const { user } = useSelector((state) => state.user);
  const { userGames, hasMoreUserGames } = useSelector((state) => state.games);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetUserGames());
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getUserGames(user.username, offset));
  }, [offset]);

  useEffect(() => {
    if (!hasMoreUserGames) {
      setShowLoadMore(false);
    }
  }, [hasMoreUserGames]);

  const gameSelector = useCallback((id) => {
    navigate(`/game/${user.username}/${id}`);
  }, []);

  return (
    <section className="user-games-section">
      <h1>Hi {user.username}! Here are your games.</h1>
      <div className="user-games-container">
        {userGames.map((game) => {
          return (
            <Card
              click={() => gameSelector(game.id)}
              title={game.game_name}
              img={img}
              key={game.id}
            />
          );
        })}
      </div>
      {showLoadMore && (
        <Button
          variant={"classic"}
          size={{ width: "200px" }}
          animated={true}
          clickHandler={() => setOffset((prevOffset) => prevOffset + 12)}
        >
          Load more
        </Button>
      )}
    </section>
  );
}
