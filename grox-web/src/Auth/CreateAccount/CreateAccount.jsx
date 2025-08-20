import React from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../store/features/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from '../../components/AuthForm/AuthForm';

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuthState } = useAuth();

  const handleSubmit = async (formData, setValidationErrors) => {
    try {
      const resultAction = await dispatch(signupUser(formData));
      localStorage.setItem('userEmail', formData.email);
      const userId =
        resultAction.payload?.data?.userId ||
        resultAction.payload?.userId ||
        resultAction.payload?.user?.id ||
        resultAction.payload?.user?._id;
      if (userId) {
        localStorage.setItem('userId', userId.toString());
        setAuthState(prev => ({ ...prev, isSignedUp: true }));
      }
      navigate('/verify-email');
    } catch (err) {
      if (err.message) setValidationErrors({ general: err.message });
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login not implemented yet');
  };

  const handleRequestEmailCode = (email) => {
    console.log('Request email code for:', email);
  };

  return (
    <AuthForm
      type="signup"
      heading="Create your Grox Account"
      onSubmit={handleSubmit}
      onGoogleLogin={handleGoogleLogin}
      onRequestEmailCode={handleRequestEmailCode}
      showForgotPassword={false}
      linkText="Already have a Grox account?"
      linkTo="/login"
      linkLabel="Log In"
      termsPolicy={
        <>
          By creating an account, you agree to Grox's{' '}
          <a href='' target='_blank'>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href='' target='_blank'>
            Privacy Policy
          </a>
          .
        </>
      }
    />
  );
};

export default CreateAccount;