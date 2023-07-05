import React, { useEffect, useRef } from "react";

function RatingRow({ item }) {
  const rowRef = useRef(null);

  useEffect(() => {
    if (rowRef.current) {
      rowRef.current.style.setProperty("--position", item.position);
    }
  }, [item.position]);

  return (
    <div ref={rowRef} className="rating-row">
      <div className="rating-row-team">
        <p>{item.teamName}</p>
        <div className="rating-row-team-color"></div>
      </div>
      <p>{item.games}</p>
      <p>{item.points}</p>
    </div>
  );
}

export default RatingRow;