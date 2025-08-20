import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AUTH_API } from '../../../constants/api';

export const sendResetRequest = createAsyncThunk(
  'reset/sendResetRequest',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${AUTH_API}/auth/reset-password`,
        payload
      );
      return {
        ...response.data,
        method: payload.type,
        requestPayload: payload,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Something went wrong'
      );
    }
  }
);

export const verifyPhoneOtp = createAsyncThunk(
  'reset/verifyPhoneOtp',
  async ({ otp }, { getState, rejectWithValue }) => {
    try {
      const { reset } = getState();
      const userId = reset.userId;

      if (!userId) {
        return rejectWithValue(
          'User ID not found. Please restart the process.'
        );
      }

      const res = await axios.post(
        `${AUTH_API}/auth/validate-token/${userId}`,
        { otp }
      );

      return {
        token: res.data.data.token,
        user: res.data.data.user,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'OTP verification failed'
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  'resetPassword/changePassword',
  async ({ token, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${AUTH_API}/auth/change-password`,
        {
          token,
          password,
          verifyPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Something went wrong'
      );
    }
  }
);
