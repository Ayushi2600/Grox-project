import React from 'react';
import ValidationError from './ValidationError';

const EmailInput = ({ step, email, error, onChange }) => (
  <div className='form-group'>
    <label>Email</label>
    {step === 2 ? (
      <span className='email-text'>{email}</span>
    ) : (
      <>
        <input
          name='email'
          type='email'
          value={email}
          onChange={onChange}
          placeholder='Your email address'
          className={error ? 'error' : ''}
        />
        {error && <ValidationError message={error} />}
      </>
    )}
  </div>
);

export default EmailInput;
