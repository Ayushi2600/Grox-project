import './TestimonialMover.scss';
import Mover from './testimonial-mover.svg';

const TestimonialMover = () => {
  return (
    <div className='testimonial-mover'>
      <div className='testimonial-mover__group'>
        {[...Array(5)].map((_, index) => (
          <div className='testimonial-mover__item' key={index}>
            <img src={Mover} alt='Decorative moving element' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialMover;
