import React, { useState, useEffect } from 'react';
import { testimonials } from './data';
import groxFrame from './grox-frame.svg';
import TestimonialMover from './TestimonialMover/TestimonialMover';
import './Testimonials.scss';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate testimonials every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleIndicatorClick = index => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    
    <section className='testimonials'>
      {/* Background mover */}
      <TestimonialMover />

      <div className='testimonials__content'>
        <h2 className='testimonials__title'>Real People, Real Experiences</h2>

        <div className='testimonials__row'>
          {/* Left side - Mask Group */}
          <div className='testimonials__mask-group'>
            <div className='testimonials__frame-background'>
              <img src={groxFrame} alt='' className='testimonials__frame-bg' />
            </div>
            <div className='testimonials__frame-mask'>
              <svg
                width='100%'
                height='100%'
                viewBox='0 0 480 440'
                className='testimonials__frame-mask-svg'
              >
                <defs>
                  <mask id='portrait-mask'>
                    <rect width='100%' height='100%' fill='black' />
                    <path
                      d='M239.997 38.349C266.944 0.400685 318.871 -11.4977 359.998 12.2377C401.125 35.9728 416.778 86.872 397.375 129.173C443.727 133.526 480 172.527 480 219.998C480 267.47 443.727 306.47 397.375 310.823C416.782 353.125 401.13 404.027 360.001 427.763C318.873 451.499 266.946 439.599 239.999 401.649C213.052 439.596 161.127 451.495 120 427.76C78.8725 404.025 63.2186 353.124 82.623 310.823C36.2716 306.47 6.9964e-05 267.469 0 219.998C0 172.528 36.2705 133.527 82.6211 129.173C63.2203 86.8727 78.8749 35.976 120.001 12.2416C161.127 -11.4927 213.049 0.404139 239.997 38.349Z'
                      fill='white'
                    />
                  </mask>
                </defs>
                <image
                  href={currentTestimonial.image}
                  width='100%'
                  height='100%'
                  preserveAspectRatio='xMidYMid slice'
                  mask='url(#portrait-mask)'
                />
              </svg>
            </div>
          </div>

          {/* Right side - Content */}
          <div className='testimonials__content-holder'>
            <div className='testimonials__testimonial-content'>
              <h4 className='testimonials__main-testimonial'>
                "{currentTestimonial.content}"
              </h4>

              <div className='testimonials__person-details'>
                <p className='testimonials__name'>
                  — {currentTestimonial.name}
                </p>
                <p className='testimonials__position'>
                  {currentTestimonial.position}, {currentTestimonial.company}
                </p>
              </div>

              <div className='testimonials__indicators'>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`testimonials__indicator ${
                      index === currentIndex
                        ? 'testimonials__indicator--active'
                        : ''
                    }`}
                    onClick={() => handleIndicatorClick(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
