import React, { useEffect, useRef, useState } from 'react';
import { steps } from './data';
import groxPattern from './Grox Pattern.svg';
import howItWorksImage from './how-it-works-image.png';
import bgSpinner from './bg-Spinner.svg';
import './HowGroxWorks.scss';
import StepItem from './StepItem';

const HowGroxWorks = () => {
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
    <section ref={sectionRef} id='how-it-works' className='how-it-works'>
      <div className='how-it-works__background'>
        <img src={groxPattern} alt='' className='how-it-works__pattern' />
        <img src={bgSpinner} alt='' className='how-it-works__spinner' />
      </div>

      <div className='how-it-works__content'>
        <h2 className='how-it-works__title'>HOW GROX WORKS</h2>

        <div className='how-it-works__container'>
          <div className='how-it-works__steps'>
            {steps.map((step, index) => (
              <StepItem
                key={step.title}
                icon={step.icon}
                title={step.title}
                description={step.description}
                lineColor={step.lineColor}
                isLast={index === steps.length - 1}
                isVisible={isVisible}
                delay={index * 0.5} // 0.5 second delay between each step
              />
            ))}
          </div>

          <div className='how-it-works__image'>
            <img
              src={howItWorksImage}
              alt='How Grox Works illustration'
              className='how-it-works__image-desktop'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowGroxWorks;
