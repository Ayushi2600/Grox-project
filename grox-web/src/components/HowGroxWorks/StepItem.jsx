import React from 'react';

const StepItem = ({
  icon,
  title,
  description,
  lineColor,
  isLast,
  isVisible,
  delay,
}) => {
  return (
    <div
      className={`how-it-works__step ${isVisible ? 'how-it-works__step--visible' : ''}`}
      style={{
        transitionDelay: isVisible ? `${delay}s` : '0s',
      }}
    >
      <div className='how-it-works__step-icon-column'>
        <div className='how-it-works__step-icon'>
          <img src={icon} alt={title} />
        </div>
        {!isLast && (
          <div
            className='how-it-works__step-line'
            style={{ backgroundColor: lineColor }}
          ></div>
        )}
      </div>

      <div className='how-it-works__step-text'>
        <h3 className='how-it-works__step-title'>{title}</h3>
        <p className='how-it-works__step-description'>{description}</p>
      </div>
    </div>
  );
};

export default StepItem;
