import { Icons } from '../../Icons/Icons';
import './Password.scss';

const PasswordWraper = ({ children, goBack, heading }) => {
  return (
    <div className='center-container-div passwords-screen'>
      <div className='verification-container pass-container'>
        <div className='logo-div'>
          <div className='logo'>{Icons.redLogo}</div>
          <h2 className='form-heading'>{heading}</h2>
        </div>
        {children}
        <div className='resend-and-back'>
          <button onClick={goBack} className='go-back-btn'>
            {Icons.backIcon} Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordWraper;
