import React from 'react';

const OTPInput = ({ otp, setOtp, prefix, onComplete, status, error }) => {
  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < 5) {
        document.getElementById(`${prefix}-otp-${index + 1}`)?.focus();
      }

      const joinedOtp = updatedOtp.join('');
      if (joinedOtp.length === 6 && onComplete) {
        onComplete(joinedOtp);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`${prefix}-otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = e => {
    e.preventDefault();
    const data = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(data)) {
      const splitData = data.split('').slice(0, 6);
      setOtp(splitData);
      if (splitData.length === 6 && onComplete) {
        onComplete(splitData.join(''));
      }
    }
  };

  return (
    <div className='otp-container'>
      {otp.map((digit, index) => (
        <React.Fragment key={index}>
          {index === 3 && <span className='blankLine' />}
          <input
            id={`${prefix}-otp-${index}`}
            type='text'
            maxLength='1'
            value={digit}
            onChange={e => handleOtpChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`otp-box ${status === 'failed' ? 'error' : ''} ${status === 'loading' ? 'verifying' : ''}`}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default OTPInput;
