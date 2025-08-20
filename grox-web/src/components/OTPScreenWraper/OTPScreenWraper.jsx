import './OTPScreenWraper.scss';
import { Icons } from '../../Icons/Icons.jsx';

const OTPScreenWraper = ({
  children,
  heading,
  classes,
  bckImg,
  goBack,
  canResend,
  handleResend,
  resendTimer,
}) => {
  return (
    <div
      className={`center-container-div OTPScreenWraper ${classes}`}
      style={{
        ...(bckImg && { backgroundImage: `url(${bckImg})` }),
      }}
    >
      <div className='verification-container'>
        <div className='logo-div'>
          <div className='logo'>{Icons.redLogo}</div>
          <h2 className='form-heading'>{heading}</h2>
        </div>
        {children}
        <div className='resend-and-back'>
          <button onClick={() => goBack()} className='go-back-btn'>
            {Icons.backIcon} Go back
          </button>
          {canResend ? (
            <span className='resend btn' onClick={handleResend}>
              Resend Code
            </span>
          ) : (
            <span className='resend'>
              Resend code in <span className='seconds'>{resendTimer}s</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPScreenWraper;
