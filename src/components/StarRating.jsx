import { useState } from "react";

export default function StarRating({ maxRating = 5 }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            filled={rating > i}
            tempFilled={tempRating > i}
            onMouseIn={() => setTempRating(i + 1)}
            onMouseOut={() => setTempRating(0)}
          />
        ))}
      </div>

      <p className="m-0">{tempRating || ""}</p>
    </div>
  );
}

function Star({ onRate, filled, tempFilled, onMouseIn, onMouseOut }) {
  return (
    <span
      role="button"
      className="inline-flex w-5 h-4 cursor-pointer"
      onClick={onRate}
      onMouseEnter={onMouseIn}
      onMouseLeave={onMouseOut}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={filled || tempFilled ? "#FFD700" : "none"}
        aria-hidden="true"
        stroke="#FFD700"
        strokeWidth="2"
        className="w-full h-full"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
      </svg>
    </span>
  );
}
