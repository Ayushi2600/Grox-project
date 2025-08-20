import React from 'react';
import './GlowingStars.scss';
import GlowingStar from './Glowing Star.svg';

const GlowingStars = () => {
  return (
    <div className='glowing-stars'>
      {/* Star 1: left 176, bottom: 235 */}
      <div className='glowing-stars__star glowing-stars__star--1'>
        <img src={GlowingStar} alt='Decorative glowing star' />
      </div>

      {/* Star 2: centered, bottom: 125 */}
      <div className='glowing-stars__star glowing-stars__star--2'>
        <img src={GlowingStar} alt='Decorative glowing star' />
      </div>

      {/* Star 3: right: 580, top: 340 */}
      <div className='glowing-stars__star glowing-stars__star--3'>
        <img src={GlowingStar} alt='Decorative glowing star' />
      </div>
    </div>
  );
};

export default GlowingStars;
