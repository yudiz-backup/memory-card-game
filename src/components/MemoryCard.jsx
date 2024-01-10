import React, { useState, useEffect } from "react";
import SingleCard from "./SingleCard";
import { cardsImg } from "./Images";
import "./MemoryCard.css";

export default function MemoryCard() {
  const [cards, setCards] = useState([]);
  const [playerOnefilp, setPlayerOneFilp] = useState(0);
  const [playerTwofilp, setPlayerTwoFilp] = useState(0);
  const [filpCount, setFilpCount] = useState(0);
  const [fristChoise, setFristChoise] = useState(null);
  const [secondChoise, setSecondChoise] = useState(null);
  const [disable, setDisable] = useState(false);

  const randomCards = () => {
    const randomedCards = [...cardsImg, ...cardsImg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setFristChoise(null);
    setSecondChoise(null);
    setCards(randomedCards);
    setFilpCount(0);
  };

  const handleChoise = (card) => {
    // if (fristChoise) {
    //   setSecondChoise(card);
    // } else {
    //   setFristChoise(card);
    // }
    fristChoise ? setSecondChoise(card) : setFristChoise(card);
  };

  useEffect(() => {
    if (fristChoise && secondChoise) {
      setDisable(true);

      if (fristChoise.src === secondChoise.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === fristChoise.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [fristChoise, secondChoise]);

  useEffect(() => {
    if (fristChoise && secondChoise) {
      if (fristChoise.src === secondChoise.src) {
        if (filpCount % 2 === 1) {
          setPlayerTwoFilp((prevFilp) => prevFilp + 1);
        } else {
          setPlayerOneFilp((prevFilp) => prevFilp + 1);
        }
      }
    }
  }, [fristChoise, secondChoise, filpCount]);

  const resetTurn = () => {
    setFristChoise(null);
    setSecondChoise(null);
    setFilpCount((prevFilp) => prevFilp + 1);
    setDisable(false);
  };

  return (
    <div>
      <div className="title">
        <h1>Memory Card Game</h1>
        <button onClick={randomCards}>New Game</button>
      </div>
      <div className=" player">
        <h2>Filps: {filpCount}</h2>
        <h2>Player One : {playerOnefilp}</h2>
        <h2>Player Two : {playerTwofilp}</h2>
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoise={handleChoise}
            filpped={
              card === fristChoise || card === secondChoise || card.matched
            }
            disable={disable}
          />
        ))}
      </div>
    </div>
  );
}
