import { FC } from "react";

import StarEmpty from "../../assets/images/StarEmpty";
import StarFull from "../../assets/images/StarFull";

import cls from "./starRating.module.css";

interface StarRatingProps {
  count?: number;
  rating: number;
}

const StarRating: FC<StarRatingProps> = ({ count = 5, rating }) => {
  const stars = Array(count).fill(0);

  return (
    <div className={cls.starRating}>
      {stars.map((_, index) => (
        <div key={index}>
          {index <= rating - 1 ? <StarFull /> : <StarEmpty />}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
