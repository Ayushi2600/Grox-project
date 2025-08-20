import React from 'react';
import { ArrowDown, ArrowRight } from '@phosphor-icons/react';
import Button from '../Button/Button';
import ExchangeContainer from '../ExchangeContainer/ExchangeContainer';
import HeroMover from './HeroMover/HeroMover';
import GlowingStars from './GlowingStars/GlowingStars';
import CoinStack from './CoinStack/CoinStack';
import { useRotatingText } from './useRotatingText';
import RotatingText from './RotatingText';
import './HeroSection.scss';

const HeroSection = ({ onJoinWaitlist }) => {
  const { currentText, isTransitioning } = useRotatingText();

  const handleScrollDown = () => {
    const nextSection = document.querySelector('#about-grox');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    // TODO: Implement learn more functionality
    console.log('Learn more clicked');
  };

  return (
    <section className='hero-section' id='hero'>
      {/* Background Elements */}
      <HeroMover />
      <GlowingStars />
      <CoinStack />

      <div className='hero-section__container'>
        <div className='hero-section__content'>
          {/* Text content */}
          <div className='hero-section__text'>
            <div className='hero-section__badge'>
              <p>🥇</p>
              <p>Africa's #1 trusted digital currency</p>
            </div>

            <h1 className='hero-section__top-title'>
              A new kind of Money... <br />
              You can{' '}
              <RotatingText
                text={currentText}
                isTransitioning={isTransitioning}
              />
            </h1>

            <p className='hero-section__subtitle'>
              Backed by a real mix of cash and low risk assets.
            </p>

            {/* CTA section */}
            <div className='cta-group'>
              <Button
                className='hero-section__cta'
                variant='secondary'
                size='lg'
                onClick={onJoinWaitlist}
              >
                Join Waitlist
              </Button>

              <p>
                Be among our first users & Get a 10% cash-back, and a chance to
                win $1000
              </p>
            </div>
          </div>

          {/* Exchange Container */}
          <div className='hero-section__visual'>
            <ExchangeContainer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
