import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  verifyEmailOtp,
  resendEmailOtp,
  clearOtpError,
} from '../../store/features/otp/otpSlice.js';
import OTPScreenWraper from '../../components/OTPScreenWraper/OTPScreenWraper';
import { useAuth } from '../../context/AuthContext';
import LooperGroupImg from '../../images/LooperGroup.png';
import OTPInput from '../../components/OTPInput/OTPInput';

const EmailVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuthState } = useAuth();
  const hasSentRef = useRef(false);

  const email =
    useSelector(state => state.auth.email) ||
    useSelector(state => state.auth.user?.email) ||
    localStorage.getItem('userEmail');

  const status = useSelector(state => state.otp.otpStatus);
  const error = useSelector(state => state.otp.otpError);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const emailToUse = email || localStorage.getItem('userEmail');
    if (!emailToUse || !userId || userId === 'undefined')
      return navigate('/create-account');
  }, [email, navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else setCanResend(true);
  }, [resendTimer]);

  useEffect(() => {
    if (status === 'succeeded') {
      setOtp(['', '', '', '', '', '']);
      setAuthState(prev => ({ ...prev, isEmailVerified: true }));
      navigate('/introduction');
    }
  }, [status, navigate, setAuthState]);

  const handleVerify = codeParam => {
    const code = codeParam || otp.join('');
    const userId = localStorage.getItem('userId');
    if (code.length !== 6 || !userId || userId === 'undefined')
      return navigate('/create-account');
    dispatch(verifyEmailOtp({ userId, code }));
  };

  const handleResend = () => {
    const userId = localStorage.getItem('userId');
    const emailToUse = email || localStorage.getItem('userEmail');
    if (!emailToUse || !userId || userId === 'undefined')
      return navigate('/create-account');
    dispatch(resendEmailOtp({ email: emailToUse, type: 'EMAIL', userId }));
    setOtp(['', '', '', '', '', '']);
    setResendTimer(30);
    setCanResend(false);
  };

  return (
    <OTPScreenWraper
      heading='Verify Your Email'
      classes='email-verfy-screen'
      bckImg={LooperGroupImg}
      goBack={() => navigate('/create-account')}
      canResend={canResend}
      handleResend={handleResend}
      resendTimer={resendTimer}
    >
      <div className='input-box-main-card'>
        <p className='label-text'>Enter the One-Time Passcode sent to</p>
        <p className='label-value'>
          <strong>{email}</strong>
        </p>

        <OTPInput
          otp={otp}
          setOtp={newOtp => {
            setOtp(newOtp);
            dispatch(clearOtpError());
          }}
          prefix='email'
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

export default EmailVerification;
