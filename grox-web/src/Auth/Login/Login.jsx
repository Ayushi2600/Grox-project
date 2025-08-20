import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/features/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from '../../components/AuthForm/AuthForm';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allowResetPassword } = useAuth();
  const { setAuthState } = useAuth();

  const handleSubmit = async (formData, setValidationErrors) => {
    try {
      const resultAction = await dispatch(loginUser(formData));
      const payload = resultAction.payload || resultAction;

      const user = payload?.data?.user;
      const accessToken = payload?.data?.accessToken;
      const refreshToken = payload?.data?.refreshToken;

      if (user && accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', user.id);

        setAuthState(prev => ({
          ...prev,
          isAuthenticated: true,
        }));

        navigate('/dashboard');
      } else {
        console.error('Unexpected login response:', payload);
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login not implemented yet');
  };

  const handleRequestEmailCode = email => {
    console.log('Request email code for:', email);
  };

  return (
    <AuthForm
      type='login'
      heading='Sign in to Grox'
      onSubmit={handleSubmit}
      onGoogleLogin={handleGoogleLogin}
      onRequestEmailCode={handleRequestEmailCode}
      showForgotPassword={true}
      linkText="Don't have a Grox account?"
      linkTo='/create-account'
      linkLabel='Create Account'
      termsPolicy={
        <>
          Grox's{' '}
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

export default Login;
