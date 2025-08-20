import React, { useState, useEffect } from 'react';
import './CoinStack.scss';
import Coin1 from './Coin 1.svg';
import Coin2 from './Coin 2.svg';
import Coin3 from './Coin 3.svg';

const CoinStack = () => {
  const [currentCoin, setCurrentCoin] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const animationSequence = () => {
      // Coin 1: From top to center (2 seconds)
      setCurrentCoin(1);
      setIsTransitioning(false);

      setTimeout(() => {
        // Transition to Coin 2 in center
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentCoin(2);
          setIsTransitioning(false);

          // Coin 2: From center to bottom (2 seconds)
          setTimeout(() => {
            // Transition to Coin 3 at bottom - no delay, immediate transition
            setCurrentCoin(3);
            setIsTransitioning(false);

            // Coin 3: Wait at bottom for 4-5 seconds
            setTimeout(() => {
              // Loop back to Coin 1
              setIsTransitioning(true);
              setTimeout(() => {
                animationSequence(); // Restart the sequence
              }, 500);
            }, 4000); // 4 second pause
          }, 2000); // 2 seconds for Coin 2
        }, 500);
      }, 2000); // 2 seconds for Coin 1
    };

    // Start the animation sequence
    animationSequence();
  }, []);

  const getCoinSrc = coinNumber => {
    switch (coinNumber) {
      case 1:
        return Coin1;
      case 2:
        return Coin2;
      case 3:
        return Coin3;
      default:
        return Coin1;
    }
  };

  const getCoinClass = () => {
    switch (currentCoin) {
      case 1:
        return 'coin-stack__coin--coin1';
      case 2:
        return 'coin-stack__coin--coin2';
      case 3:
        return 'coin-stack__coin--coin3';
      default:
        return 'coin-stack__coin--coin1';
    }
  };

  return (
    <div className='coin-stack'>
      <div
        className={`coin-stack__container ${isTransitioning ? 'coin-stack__container--transitioning' : ''}`}
      >
        <img
          src={getCoinSrc(currentCoin)}
          alt={`Coin ${currentCoin}`}
          className={`coin-stack__coin ${getCoinClass()}`}
        />
      </div>
    </div>
  );
};

export default CoinStack;
