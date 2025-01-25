import Card from "../modules/Card";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGame } from "../store/actions/asyncGamesActions";

export default function Gallery() {
  const dispatch = useDispatch();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollRef = useRef(null);
  const { popularGames } = useSelector((state) => state.games);

  const arrowClickHandler = (direction) => {
    direction === "left"
      ? (scrollRef.current.scrollLeft -= 500)
      : (scrollRef.current.scrollLeft += 500);
  };

  useEffect(() => {
    window.addEventListener("resize", updateArrowsVisibility);

    return () => {
      window.removeEventListener("resize", updateArrowsVisibility);
    };
  }, [window.innerWidth]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", updateArrowsVisibility);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", updateArrowsVisibility);
      }
    };
  }, []);

  const updateArrowsVisibility = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth = scrollRef.current.scrollWidth;
      const clientWidth = scrollRef.current.clientWidth;

      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const cardClickHandler = (index) => {
    dispatch(getGame(popularGames[index].id));
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
          popularGames.map((game, idx) => {
            return (
              <Card
                key={idx}
                title={game.game_name}
                // img={game.preview}
                click={() => cardClickHandler(idx)}
              />
            );
          })}
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
