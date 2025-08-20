import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFormData,
  setStep,
  setMethod,
  clearResetState,
} from '../../store/features/resetPassword/resetPasswordSlice';
import {
  sendResetRequest,
  verifyPhoneOtp,
} from '../../store/features/resetPassword/resetPasswordThunks';
import { useNavigate, useLocation } from 'react-router-dom';
import NewPassword from './NewPassword';
import PhoneInput from '../../components/WaitlistModal/PhoneInput/PhoneInput';
import Button from '../../components/Button/Button';
import OTPInput from '../../components/OTPInput/OTPInput';
import OTPScreenWraper from '../../components/OTPScreenWraper/OTPScreenWraper';
import './Password.scss';
import PasswordWraper from './PasswordWraper';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { method, step, email, phoneNumber, countryCode, otp, status, error } =
    useSelector(state => state.reset);

  const [timer, setTimer] = useState(60);
  const [urlToken, setUrlToken] = useState(null);
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);

  // Handle token from URL
  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');

    if (token) {
      setUrlToken(token);
      dispatch(setMethod('email'));
      dispatch(setStep(3));
    } else {
      dispatch(clearResetState());
    }
  }, [location.search, dispatch]);

  useEffect(() => {
    if (status === 'succeeded' && step === 1) {
      if (method === 'email' && !urlToken) {
        console.log('Email reset request sent, user should check email');
      } else if (method === 'phoneNumber') {
        dispatch(setStep(2));
      }
    }
  }, [status, step, method, urlToken, dispatch]);

  useEffect(() => {
    if (step === 2 && method === 'phoneNumber' && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, method, timer]);

  // Sync OTP array with Redux store
  useEffect(() => {
    if (otp && otp !== otpArray.join('')) {
      setOtpArray(otp.split('').slice(0, 6));
    }
  }, [otp]);

  const handleContinue = e => {
    e.preventDefault();

    const payload =
      method === 'email'
        ? { type: 'email', email }
        : { type: 'phoneNumber', phoneNumber, countryCode };
    dispatch(sendResetRequest(payload));
  };

  const handleOtpComplete = completedOtp => {
    dispatch(setFormData({ key: 'otp', value: completedOtp }));
    dispatch(verifyPhoneOtp({ otp: completedOtp }));
  };

  const goBack = () => {
    if (step === 1) {
      dispatch(clearResetState());
      navigate('/login');
    } else {
      dispatch(setStep(step - 1));
    }
  };

  const switchMethod = () => {
    dispatch(setMethod(method === 'email' ? 'phoneNumber' : 'email'));
  };

  const handleResendOtp = () => {
    if (timer === 0) {
      const payload = { type: 'phoneNumber', phoneNumber, countryCode };
      dispatch(sendResetRequest(payload));
      setTimer(60);
      setOtpArray(['', '', '', '', '', '']); // Reset OTP input
      dispatch(setFormData({ key: 'otp', value: '' }));
    }
  };

  const isLoading = status === 'loading';
  const isEmailMethod = method === 'email';

  // Step 2: OTP Verification using reusable components
  if (step === 2 && method === 'phoneNumber') {
    return (
      <OTPScreenWraper
        heading='Verify your phone number'
        goBack={goBack}
        canResend={timer === 0}
        handleResend={handleResendOtp}
        resendTimer={timer}
      >
        <div className='input-box-main-card'>
          <p className='label-text'>Enter the One-Time Passcode sent to</p>
          <p className='label-value'>
            <strong>{`${countryCode} ${phoneNumber}`}</strong>
          </p>

          <div className='form-group'>
            <OTPInput
              otp={otpArray}
              setOtp={value => {
                setOtpArray(value);
                if (value.join('').length < 6 && error) {
                  dispatch(setFormData({ key: 'error', value: null }));
                }
              }}
              prefix='reset-password'
              onComplete={handleOtpComplete}
              status={status}
              error={error}
            />
            {error && <span className='validation-error-txt'>{error}</span>}
          </div>
        </div>
      </OTPScreenWraper>
    );
  }

  return (
    <PasswordWraper goBack={goBack} heading={'Reset your password'}>
      {/* Step 1: Enter Email or Phone */}
      {step === 1 && (
        <form className='pass-form' onSubmit={handleContinue}>
          <div className='form-group'>
            {isEmailMethod ? (
              <>
                <label>Email</label>
                <input
                  type='email'
                  placeholder='Your email address'
                  value={email || ''}
                  onChange={e => {
                    dispatch(
                      setFormData({ key: 'email', value: e.target.value })
                    );
                    if (error)
                      dispatch(setFormData({ key: 'error', value: null }));
                  }}
                  className='input-field'
                  required
                />
                {error && <span className='validation-error-txt'>{error}</span>}
              </>
            ) : (
              <>
                <label>Phone number</label>
                <PhoneInput
                  value={
                    countryCode && phoneNumber
                      ? `${countryCode}${phoneNumber}`
                      : ''
                  }
                  onChange={(value, country) => {
                    const dialCode = `+${country.dialCode}`;
                    const nationalNumber = value.replace(dialCode, '');
                    dispatch(
                      setFormData({ key: 'phoneNumber', value: nationalNumber })
                    );
                    dispatch(
                      setFormData({ key: 'countryCode', value: dialCode })
                    );
                    if (error)
                      dispatch(setFormData({ key: 'error', value: null }));
                  }}
                  error={!!error}
                  disabled={isLoading}
                />
                {error && <span className='validation-error-txt'>{error}</span>}
              </>
            )}
          </div>

          <div className='form-action-btn'>
            <Button
              type='submit'
              variant='primary'
              size='lg'
              loading={isLoading}
              disabled={isLoading}
              className='auth-form-submit-btn'
            >
              {isLoading
                ? 'Sending...'
                : isEmailMethod
                  ? 'Send reset instructions'
                  : 'Send One-Time Password'}
            </Button>
          </div>

          <div className='change-way-div'>
            <h4 className='change-way-to-reset' onClick={switchMethod}>
              {isEmailMethod ? 'Use phone number instead' : 'Use email instead'}
            </h4>
          </div>
        </form>
      )}

      {/* Step 3: Set New Password */}
      {step === 3 && <NewPassword urlToken={urlToken} goBack={goBack} />}

      {/* Email Success Message for Step 1 */}
      {step === 1 && method === 'email' && status === 'succeeded' && (
        <div className='success-message'>
          <p>
            Reset instructions have been sent to your email. Please check your
            inbox and follow the link to reset your password.
          </p>
        </div>
      )}
    </PasswordWraper>
  );
};

export default ResetPassword;
