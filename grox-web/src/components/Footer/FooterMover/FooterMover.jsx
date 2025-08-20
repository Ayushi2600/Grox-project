import './FooterMover.scss';
import Mover from './footer-mover.svg';

const FooterMover = () => {
  return (
    <div className='footer-mover'>
      <div className='footer-mover__group'>
        {[...Array(5)].map((_, index) => (
          <div className='footer-mover__item' key={index}>
            <img src={Mover} alt='Decorative moving element' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterMover;
