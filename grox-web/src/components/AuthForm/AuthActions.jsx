import React from 'react';
import Button from '../../components/Button/Button';
import googleIcon from '../../images/Google-Icon.png';
import { Icons } from '../../Icons/Icons';
import { Link } from 'react-router-dom';

const AuthActions = ({
  step,
  isLoading,
  formData,
  type,
  onGoogleLogin,
  onRequestEmailCode,
  showRequestEmailCode,
  linkText,
  linkTo,
  linkLabel,
}) => (
  <>
    <div className='auth-form__actions'>
      <Button
        type='submit'
        variant='primary'
        size='lg'
        loading={isLoading}
        disabled={isLoading || (step === 1 && !formData.email.trim())}
        className='auth-form-submit-btn'
      >
        {isLoading ? 'Loading...' : 'Continue'}
      </Button>
    </div>

    <div className='divider'>
      <span>OR</span>
    </div>

    {step === 1 && (
      <button type='button' onClick={onGoogleLogin} className='blank-btn'>
        <img src={googleIcon} alt='Google Icon' /> Continue with Google
      </button>
    )}

    {step === 2 && showRequestEmailCode && (
      <button type='button' onClick={onRequestEmailCode} className='blank-btn'>
        {Icons.emailIcon} Request for email code
      </button>
    )}

    {(step === 1 || type === 'signup') && linkText && (
      <p className='link-text'>
        {linkText} <Link to={linkTo}>{linkLabel}</Link>
      </p>
    )}
  </>
);

export default AuthActions;
