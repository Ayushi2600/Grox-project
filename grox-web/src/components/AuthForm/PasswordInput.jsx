import React from 'react';
import { Icons } from '../../Icons/Icons';
import ValidationError from './ValidationError';

const PasswordInput = ({
  password,
  error,
  showPassword,
  setShowPassword,
  onChange,
  showForgotPassword,
  onForgotPassword,
  type,
}) => (
  <div className='form-group'>
    <label>Password</label>
    <div className='password-input-container'>
      <input
        name='password'
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={onChange}
        placeholder={
          type === 'login' ? 'Enter password' : 'Create your password'
        }
        className={error ? 'error' : ''}
      />
      <button
        type='button'
        onClick={() => setShowPassword(prev => !prev)}
        className='password-toggle'
      >
        {showPassword ? Icons.eyeOpen : Icons.eyeClosed}
      </button>
    </div>
    <div className='forgot-div'>
      {error ? <ValidationError message={error} /> : <span />}
      {showForgotPassword && (
        <h4 className='forgot-password' onClick={onForgotPassword}>
          Forgot password?
        </h4>
      )}
    </div>
  </div>
);

export default PasswordInput;
