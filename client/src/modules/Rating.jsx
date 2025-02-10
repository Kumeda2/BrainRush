import { memo } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const MemoizedRating = memo(function Rating({ rating, ratingArray, rate }) {
  return (
    <div className="rating-container">
      <h3>Rate this game</h3>
      <div className="rating">
        <p>{rating}</p>
        {ratingArray.map((point, idx) => {
          switch (point) {
            case 1:
              return (
                <FaStar className="star" key={idx} onClick={() => rate(idx)} />
              );
            case 0.5:
              return (
                <FaStarHalfAlt
                  className="star"
                  key={idx}
                  onClick={() => rate(idx)}
                />
              );
            case 0:
              return (
                <FaRegStar
                  className="star"
                  key={idx}
                  onClick={() => rate(idx)}
                />
              );
            default:
              return;
          }
        })}
      </div>
    </div>
  );
});

export default MemoizedRating;
