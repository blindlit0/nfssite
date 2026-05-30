import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const quotes = [
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Success is not final, failure is not fatal.",
  "The best way to predict the future is to create it.",
  "Don't watch the clock; do what it does. Keep going.",
  "I believe in you.",
  "Make each day your masterpiece.",
  "The only limit to tomorrow is today's doubts.",
  "Be kind to yourself today.",
  "Small progress is still progress.",
  "Go and learn."
];

const GoodCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const handleCardClick = () => {
    if (!isFlipped) {
      const nextQuote =
        quotes[Math.floor(Math.random() * quotes.length)];

      setCurrentQuote(nextQuote);
      setIsFlipped(true);
    }
  };

  useEffect(() => {
    if (isFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isFlipped]);

  return (
    <StyledWrapper onClick={handleCardClick}>
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-inner">

          {/* FRONT */}
          <div className="front">
            <div>
              <p className="small-text">Tap To Reveal</p>
            </div>
          </div>

          {/* BACK */}
          <div className="back">
            <p>{currentQuote}</p>
          </div>

        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`

  perspective: 1200px;

  .card {
    width: 280px;
    height: 400px;
    cursor: pointer;
  }

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.7s ease;
    transform-style: preserve-3d;
  }

  .card.flipped .card-inner {
    transform: rotateY(180deg);
  }

  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 28px;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.25);
  }

  /* FRONT SIDE */
  .front {
    background:
      linear-gradient(
        145deg,
        #ffffff,
        #d9e6b3
      );

    color: #111;
    border: 1px solid rgba(0,0,0,0.08);
  }

  .front h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 0.5rem;
  }

  .small-text {
    font-size: 0.85rem;
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  /* BACK SIDE */
  .back {
    background:
      linear-gradient(
        145deg,
        #111111,
        #2f3d08
      );

    color: white;
    transform: rotateY(180deg);

    font-size: 1.15rem;
    line-height: 1.7;
    font-weight: 500;
  }

  .back p {
    max-width: 220px;
  }

  @media (max-width: 640px) {

    .card {
      width: 240px;
      height: 340px;
    }

    .front h2 {
      font-size: 1.6rem;
    }

    .back {
      font-size: 1rem;
    }
  }
`;

export default GoodCard;