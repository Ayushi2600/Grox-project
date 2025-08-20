import React from 'react';
import './CTASection.scss';
import SendImage from './Send.svg';

const CTASection = ({ onJoinWaitlist }) => {
  return (
    <section className='cta'>
      <div className='cta__content'>
        <h3 className='cta__title'>
          Ready to Transform your financial experience?{' '}
        </h3>
        <button
          className='cta__button cta__button--primary'
          onClick={onJoinWaitlist}
        >
          Register Now
        </button>
      </div>
      <img src={SendImage} alt='Send' className='cta__image' />
    </section>
  );
};

export default CTASection;
