import React from "react";
import "./SingleCard.css";

export default function SingleCard({ card, handleChoise, filpped, disable }) {
  const handleClick = () => {
    if (!disable) {
      handleChoise(card);
    }
  };

  return (
    <div className="card">
      <div className={filpped ? "filpped" : ""}>
        <img className="front" src={card.src} alt="front" />
        <img
          className="back"
          onClick={handleClick}
          src="/img/cover.png"
          alt="back"
        />
      </div>
    </div>
  );
}
