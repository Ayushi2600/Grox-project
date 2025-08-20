import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resendPhoneOtp, verifyPhoneOtp } from '../../store/features/otp/otpSlice';
import OTPScreenWraper from '../../components/OTPScreenWraper/OTPScreenWraper';
import maskImg from '../../images/Mask_group.png';
import OTPInput from '../../components/OTPInput/OTPInput';

const PhoneVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector(state => state.auth.user);
  const email = authUser?.email || localStorage.getItem('email');

  const phone = useSelector(state => state.introduction.phoneNumber);
  const countryCode = useSelector(state => state.introduction.dialCode);

  const status = useSelector(state => state.otp.otpStatus);
  const error = useSelector(state => state.otp.otpError);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (status === 'succeeded') {
      setOtp(['', '', '', '', '', '']);
      // navigate('/dashboard');
    }
  }, [status, navigate]);

  const handleVerify = codeParam => {
    const code = codeParam || otp.join('');
    const userId = localStorage.getItem('userId');
    if (code.length !== 6 || !userId || userId === 'undefined')
      return navigate('/kyc-verify');
    dispatch(verifyPhoneOtp({ userId, code }));
  };

  const handleResend = () => {
    if (!email) return;
    dispatch(resendPhoneOtp({ email, type: 'PHONE' }));
    setOtp(['', '', '', '', '', '']);
    setResendTimer(30);
    setCanResend(false);
  };

  const handleGoBack = () => {
    navigate('/introduction');
  };

  return (
    <OTPScreenWraper
      heading='Verify your phone number'
      classes='phone-verfy-screen'
      goBack={handleGoBack}
      canResend={canResend}
      handleResend={handleResend}
      resendTimer={resendTimer}
    >
      <div className='input-box-main-card'>
        <p className='label-text'>Enter the One-Time Passcode sent to</p>
        <p className='label-value'>
          <strong>{`${countryCode} ${phone}`}</strong>
        </p>
        <OTPInput
          otp={otp}
          setOtp={setOtp}
          prefix='phone'
          status={status}
          error={error}
          onComplete={code => handleVerify(code)}
        />
        {status === 'failed' && (
          <p className='validation-error-txt'>
            {error || 'Invalid code. Try again'}
          </p>
        )}
      </div>
      {status === 'loading' && <div className='spinner-green' />}
    </OTPScreenWraper>
  );
};

export default PhoneVerification;
