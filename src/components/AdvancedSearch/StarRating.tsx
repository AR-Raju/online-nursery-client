import { Star } from "lucide-react";
import React from "react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
  console.log({ value });
  return (
    <div className="star-rating">
      {[5, 4, 3, 2, 1].map((row) => (
        <div key={row} className="flex mb-1">
          {Array.from({ length: row }, (_, index) => (
            <span
              key={index}
              onClick={() => onChange(row)}
              className="cursor-pointer mr-1"
            >
              <Star
                size={20}
                color={value >= row ? "#22C55E" : "#D1D5DB"}
                fill={value >= row ? "#22C55E" : "none"}
                strokeWidth={2}
              />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
