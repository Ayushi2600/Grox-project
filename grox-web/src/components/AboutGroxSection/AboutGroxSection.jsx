import React, { useEffect, useRef, useState } from 'react';
import { reasons } from './reasons';
import './AboutGroxSection.scss';
import aboutGroxDesktop from './about-grox-desktop.png';
import mobileaboutGroxDesktop from './about-grox-mobile.png';
import linearoverlay from './linear-overlay.png';
import ReasonItem from './ReasonItem';

const AboutGroxSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id='about-grox' className='about-grox-section'>
      {/* Background Images */}
      <div className='about-grox-section__background'>
        <img
          src={aboutGroxDesktop}
          alt='About Grox Desktop Background'
          className='about-grox-section__bg-desktop'
        />
        <img
          src={mobileaboutGroxDesktop}
          alt='About Grox Mobile Background'
          className='about-grox-section__bg-mobile'
        />

        {/* Linear Overlay */}
        <div className='about-grox-section__overlay'>
          <img
            src={linearoverlay}
            alt='Linear Overlay'
            className='about-grox-section__overlay-image'
          />
        </div>
      </div>

      {/* Content Container */}
      <div className='about-grox-section__container'>
        {/* Header Group */}
        <div className='about-grox-section__header'>
          <h3 className='about-grox-section__title'>Why Choose Grox?</h3>
          <p className='about-grox-section__subtitle'>
            Grox is your new kind of money, rooted in African strength, designed
            for global impact.
          </p>
        </div>

        {/* Reasons Items Group */}
        <div className='about-grox-section__reasons'>
          {reasons.map((reason, index) => (
            <ReasonItem
              key={reason.text.subHeader}
              icon={reason.icon}
              text={reason.text}
              isVisible={isVisible}
              delay={index * 0.8} // 0.8 second delay between each reason (longer than steps)
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutGroxSection;
