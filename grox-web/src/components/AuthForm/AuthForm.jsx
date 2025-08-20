import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/validators';
import LoginSignUpWraper from '../../components/LoginSignUpWraper/LoginSignUpWraper';
import { clearError } from '../../store/features/auth/authSlice';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import AuthActions from './AuthActions';
import ValidationError from './ValidationError';

const AuthForm = ({
  type = 'login',
  onSubmit,
  onGoogleLogin,
  onRequestEmailCode,
  onGoBack,
  heading,
  termsPolicy,
  linkText,
  linkTo,
  linkLabel,
  showForgotPassword = false,
  showRequestEmailCode = true,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (error) {
      dispatch(clearError());
    }
  };

  const validateStepOne = () => {
    const errors = {};
    if (!formData.email) errors.email = 'Email is required';
    else if (!validateEmail(formData.email)) errors.email = 'Invalid email address';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStepTwo = () => {
    const errors = {};
    if (!formData.password) errors.password = 'Password is required';
    else if (!validatePassword(formData.password)) {
      errors.password =
        'Password must be at least 8 characters with upper & lower case, number, and special symbol.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (error) dispatch(clearError());
    if (step === 1) {
      if (!validateStepOne()) return;
      setStep(2);
    } else {
      if (!validateStepTwo()) return;
      await onSubmit(formData, setValidationErrors);
    }
  };

  const handleGoBackInternal = useCallback(() => {
    if (step === 2) {
      setStep(1);
      setValidationErrors({});
    } else {
      onGoBack ? onGoBack() : navigate('/');
    }
  }, [step, onGoBack, navigate]);

  return (
    <LoginSignUpWraper handleGoBack={handleGoBackInternal} heading={heading} termsPolicy={termsPolicy}>
      {error && <ValidationError message={error} />}
      <form onSubmit={handleSubmit} className='form-container'>
        <EmailInput
          step={step}
          email={formData.email}
          error={validationErrors.email}
          onChange={handleChange}
        />

        {step === 2 && (
          <PasswordInput
            password={formData.password}
            error={validationErrors.password}
            showPassword={showPassword}
            onChange={handleChange}
            setShowPassword={setShowPassword}
            showForgotPassword={showForgotPassword}
            onForgotPassword={() => navigate('/reset-password')}
            type={type}
          />
        )}

        <AuthActions
          step={step}
          isLoading={isLoading}
          formData={formData}
          type={type}
          onGoogleLogin={onGoogleLogin}
          onRequestEmailCode={() => onRequestEmailCode?.(formData.email)}
          showRequestEmailCode={showRequestEmailCode}
          linkText={linkText}
          linkTo={linkTo}
          linkLabel={linkLabel}
        />
      </form>
    </LoginSignUpWraper>
  );
};

export default AuthForm;
