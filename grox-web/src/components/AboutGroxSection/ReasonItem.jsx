import React from 'react';

const ReasonItem = ({ icon, text, isVisible, delay }) => {
  return (
    <div
      className={`about-grox-section__reason-item ${isVisible ? 'about-grox-section__reason-item--visible' : ''}`}
      style={{
        transitionDelay: isVisible ? `${delay}s` : '0s',
      }}
    >
      <div className='about-grox-section__reason-icon'>
        <img
          src={icon}
          alt={`${text.subHeader} icon`}
          className='about-grox-section__icon-image'
        />
      </div>
      <div className='about-grox-section__reason-content'>
        <h4 className='about-grox-section__reason-subheader'>
          {text.subHeader}
        </h4>
        <p className='about-grox-section__reason-body'>{text.body}</p>
      </div>
    </div>
  );
};

export default ReasonItem;
