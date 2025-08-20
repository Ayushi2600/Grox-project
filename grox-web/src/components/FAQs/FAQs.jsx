import React, { useState } from 'react';
import { faqs } from './data';
import './FAQs.scss';
import FAQIcon from './grox-shapes.svg';
import FAQAsset from './faq-asset.png';
import LooperGroup from './looper-group.svg';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0); // Set first question as default

  const handleToggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id='faqs' className='faqs'>
      <img
        src={LooperGroup}
        alt='Background decoration'
        className='faqs__background-looper'
      />
      <img src={FAQAsset} alt='FAQ asset' className='faq__asset' />
      <div className='faqs__content'>
        {/* Header Section - 3 columns with 16px gap */}
        <div className='faqs__header'>
          <div className='faqs__header-text'>
            <h5 className='faqs__subtitle'>FAQs</h5>
            <h3 className='faqs__title'>
              You've got questions? We've got answers!
            </h3>
            <p className='faqs__description'>
              Get the answers to your questions about Grox.
            </p>
          </div>
        </div>

        {/* FAQ Holder - Row with 24px spacing, column on mobile */}
        <div className='faqs__holder'>
          {/* Question Button Holder - Max height 520px desktop, 320px mobile */}
          <div className='faqs__question-holder'>
            {faqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => handleToggleFAQ(index)}
                className={`faqs__question-btn ${openIndex === index ? 'faqs__question-btn--active' : ''}`}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className='faqs__question-content'>
                  {openIndex === index && (
                    <img
                      src={FAQIcon}
                      alt='FAQ icon'
                      className='faqs__question-icon'
                    />
                  )}
                  <span className='faqs__question-text'>{faq.question}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Answer Container */}
          <div className='faqs__answer-container'>
            {openIndex !== null && (
              <div className='faqs__answer-content'>
                <p className='faqs__answer-text'>{faqs[openIndex].answer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
