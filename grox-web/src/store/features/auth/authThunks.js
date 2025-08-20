import {
  signupStart,
  signupSuccess,
  signupFailure,
  loginStart,
  loginSuccess,
  loginFailure,
} from './authSlice';
import { AUTH_API } from '../../../constants/api';

export const signupUser = userData => async dispatch => {
  dispatch(signupStart());
  try {
    const response = await fetch(`${AUTH_API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorRes = await response.json();
      throw new Error(errorRes.message || 'Signup failed');
    }

    const data = await response.json();

    dispatch(signupSuccess(data));

    // Store token if available
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    const userId =
      data.data?.userId ||
      data.userId ||
      data.user?.id ||
      data.user?._id ||
      data.id;

    if (userId) {
      localStorage.setItem('userId', userId.toString());
    } else {
      console.error('No userId found in response:', data);
    }

    const email = data.data?.email || data.user?.email || data.email;

    if (email) {
      localStorage.setItem('email', email);
    } else {
      console.warn('Email not found in signup response:', data);
    }

    return { payload: data };
  } catch (error) {
    dispatch(signupFailure(error.message));
    throw error;
  }
};

export const loginUser = userData => async dispatch => {
  dispatch(loginStart());
  try {
    const response = await fetch(`${AUTH_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }

    const { accessToken, refreshToken, user } = result.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('email', user.email);

    dispatch(loginSuccess({ accessToken, user }));

    return { payload: result };
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};
