import React from 'react';
import './HeroMover.scss';
import MovingGalaxy from './Moving Galaxy.svg';

const HeroMover = () => {
  return (
    <div className='hero-mover'>
      <div className='hero-mover__group'>
        {[...Array(3)].map((_, index) => (
          <div className='hero-mover__item' key={index}>
            <img src={MovingGalaxy} alt='Decorative moving galaxy element' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroMover;
