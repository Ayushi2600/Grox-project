import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFormData,
  clearResetSuccess,
  clearResetState,
  clearResetError,
} from '../../store/features/resetPassword/resetPasswordSlice';
import { changePassword } from '../../store/features/resetPassword/resetPasswordThunks';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../../Icons/Icons';
import Button from '../../components/Button/Button';

const filedArr = [
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Create new password',
  },
  {
    name: 'confirmPassword',
    label: 'Password',
    placeholder: 'Confirm new password',
  },
];

const NewPassword = ({ urlToken, goBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    password,
    confirmPassword,
    token: reduxToken,
    status,
    method,
    error,
    resetSuccess,
    successMessage,
  } = useSelector(state => state.reset);

  const effectiveToken = method === 'email' ? urlToken : reduxToken;

  const [showPass, setShowPass] = useState({
    password: false,
    confirmPassword: false,
  });

  // Validation checks
  const hasValidInput = password?.trim() && confirmPassword?.trim();
  const passwordsMatch = password === confirmPassword;
  const isFormValid = hasValidInput && passwordsMatch;

  useEffect(() => {
    if (resetSuccess && status === 'succeeded') {
      const timer = setTimeout(() => {
        dispatch(clearResetState());
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [resetSuccess, status]);

  const handleResetPassword = e => {
    e.preventDefault();
    dispatch(clearResetSuccess());

    dispatch(
      changePassword({
        token: effectiveToken,
        password,
        confirmPassword,
      })
    );
  };

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch(setFormData({ key: name, value }));
    dispatch(clearResetError());
  }, []);

  return (
    <>
      {resetSuccess && (
        <p className='validation-error-txt success-msg'>
          {successMessage ||
            'Password reset successfully! Redirecting to login...'}
        </p>
      )}

      {hasValidInput && error?.includes('Use another password') && (
        <p className='validation-error-txt erros-msg'>
          New password must be different from the old one.
        </p>
      )}

      <form onSubmit={handleResetPassword} className='pass-form'>
        {filedArr?.map(item => {
          return (
            <div className='form-group' key={item.name}>
              <label>{item?.label}</label>
              <div className='password-input-container'>
                <input
                  name={item.name}
                  type={showPass[item.name] ? 'text' : 'password'}
                  value={
                    item.name === 'password'
                      ? password || ''
                      : confirmPassword || ''
                  }
                  onChange={handleChange}
                  placeholder={item.placeholder}
                  required
                  class='input-field'
                />
                <button
                  type='button'
                  onClick={() =>
                    setShowPass(prev => {
                      return { ...prev, [item.name]: !prev[item.name] };
                    })
                  }
                  className='password-toggle'
                >
                  {showPass[item.name] ? Icons.eyeOpen : Icons.eyeClosed}
                </button>
              </div>
              {/* Show password mismatch error */}
              {item.name === 'confirmPassword' &&
                hasValidInput &&
                !passwordsMatch && (
                  <p className='validation-error-txt'>
                    Passwords do not match.
                  </p>
                )}
            </div>
          );
        })}

        <div className='form-action-btn'>
          <Button
            type='submit'
            variant='primary'
            size='lg'
            loading={status === 'loading'}
            disabled={status === 'loading' || !isFormValid}
            className='auth-form-submit-btn'
          >
            {status === 'loading' ? 'Resetting...' : 'Set Password'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewPassword;
