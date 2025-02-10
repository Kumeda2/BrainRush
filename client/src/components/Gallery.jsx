import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGame, getPopularGames } from "../store/actions/asyncGamesActions";
import Card from "../modules/Card";
import img from "../assets/images/default_game_banner.jpg";

export default function Gallery() {
  const { popularGames, hasMorePublicGames } = useSelector(
    (state) => state.games
  );

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(
    popularGames.length !== 0
  );
  const [offset, setOffset] = useState(0);
  const scrollRef = useRef(null);

  const arrowClickHandler = (direction) => {
    direction === "left"
      ? (scrollRef.current.scrollLeft -= 500)
      : (scrollRef.current.scrollLeft += 500);
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const scrollWidth = scrollRef.current.scrollWidth;
    const clientWidth = scrollRef.current.clientWidth;

    updateArrowsVisibility(scrollLeft, scrollWidth, clientWidth);

    window.addEventListener("resize", handleScroll);

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("resize", handleScroll);
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const loadGames = (offset) => {
    dispatch(getPopularGames(user.username, offset));
  };

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const scrollWidth = scrollRef.current.scrollWidth;
    const clientWidth = scrollRef.current.clientWidth;

    updateArrowsVisibility(scrollLeft, scrollWidth, clientWidth);

    if (hasMorePublicGames && !(scrollLeft + clientWidth < scrollWidth)) {
      setOffset((prevOffset) => prevOffset + 12);
    }
  }, [hasMorePublicGames]);

  useEffect(() => {
    if (offset !== 0 && hasMorePublicGames) {
      loadGames(offset);
      setShowRightArrow(true);
    }
  }, [offset]);

  const updateArrowsVisibility = useCallback(
    (scrollLeft, scrollWidth, clientWidth) => {
      if (scrollRef.current) {
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
      }
    },
    []
  );

  const cardClickHandler = (id) => {
    dispatch(getGame(id));
  };

  return (
    <div className="gallery-wrapper">
      <div className="games" ref={scrollRef}>
        {showLeftArrow && (
          <div className="left-arrow" onClick={() => arrowClickHandler("left")}>
            <IoIosArrowBack />
          </div>
        )}
        {popularGames &&
          popularGames.map((game) => {
            return (
              <Card
                key={game.id}
                title={game.game_name}
                img={img}
                click={() => cardClickHandler(game.id)}
              />
            );
          })}
        {popularGames.length === 0 && <h3>There is no public games yet</h3>}
        {showRightArrow && (
          <div
            className="right-arrow"
            onClick={() => arrowClickHandler("right")}
          >
            <IoIosArrowForward />
          </div>
        )}
      </div>
    </div>
  );
}
