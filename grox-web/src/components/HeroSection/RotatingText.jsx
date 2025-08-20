import React from 'react';
import './HeroSection.scss'; 

const RotatingText = ({ text, isTransitioning }) => {
  return (
    <span
      className={`hero-section__rotating-text ${
        isTransitioning ? 'hero-section__rotating-text--transitioning' : ''
      }`}
    >
      {text}
    </span>
  );
};

export default RotatingText;
