import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AUTH_API } from '../../../constants/api';

/// --- VERIFY OTP ---

export const verifyEmailOtp = createAsyncThunk(
  'otp/verifyEmailOtp',
  async ({ userId, code }, { rejectWithValue }) => {
    try {
      if (!userId || userId === 'undefined') {
        throw new Error('Invalid user ID');
      }
      if (!code || code.length !== 6) {
        throw new Error('Invalid OTP code');
      }

      const res = await axios.post(`${AUTH_API}/verify-otp/${userId}`, {
        type: 'EMAIL',
        code,
      });

      return res.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'OTP verification failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyPhoneOtp = createAsyncThunk(
  'otp/verifyPhoneOtp',
  async ({ userId, code }, { rejectWithValue }) => {
    try {
      if (!userId || userId === 'undefined') {
        throw new Error('Invalid user ID');
      }
      if (!code || code.length !== 6) {
        throw new Error('Invalid OTP code');
      }

      const res = await axios.post(`${AUTH_API}/verify-otp/${userId}`, {
        type: 'PHONE',
        code,
      });

      return res.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'OTP verification failed';
      return rejectWithValue(errorMessage);
    }
  }
);

/// --- RESEND OTP ---

export const resendEmailOtp = createAsyncThunk(
  'otp/resendEmailOtp',
  async ({ email }, { rejectWithValue }) => {
    try {
      if (!email) throw new Error('Email is required');
      const res = await axios.post(`${AUTH_API}/regenerate-otp`, {
        email,
        type: 'EMAIL',
      });

      return res.data;
    } catch (err) {
      const errorData = err.response?.data;

      if (
        errorData?.message ===
        'OTP already sent, please check your email for the verification code'
      ) {
        return {
          success: true,
          message: errorData.message,
          alreadySent: true,
        };
      }

      const errorMessage =
        errorData?.error ||
        errorData?.message ||
        err.message ||
        'Resend failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const resendPhoneOtp = createAsyncThunk(
  'otp/resendPhoneOtp',
  async ({ email }, { rejectWithValue }) => {
    try {
      if (!email) throw new Error('Email is required');

      const res = await axios.post(`${AUTH_API}/regenerate-otp`, {
        email,
        type: 'PHONE',
      });

      return res.data;
    } catch (err) {
      const errorData = err.response?.data;

      if (
        errorData?.message ===
        'OTP already sent, please check your email for the verification code'
      ) {
        return {
          success: true,
          message: errorData.message,
          alreadySent: true,
        };
      }

      const errorMessage =
        errorData?.error ||
        errorData?.message ||
        err.message ||
        'Resend failed';
      return rejectWithValue(errorMessage);
    }
  }
);

/// --- SLICE ---

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    otpStatus: 'idle',
    otpError: null,
    resendCooldown: false,
  },
  reducers: {
    resetOtpState: state => {
      state.otpStatus = 'idle';
      state.otpError = null;
      state.resendCooldown = false;
    },
    clearOtpError: state => {
      state.otpError = null;
      state.otpStatus = 'idle';
    },
  },
  extraReducers: builder => {
    // VERIFY EMAIL
    builder
      .addCase(verifyEmailOtp.pending, state => {
        state.otpStatus = 'loading';
        state.otpError = null;
      })
      .addCase(verifyEmailOtp.fulfilled, state => {
        state.otpStatus = 'succeeded';
        state.otpError = null;
      })
      .addCase(verifyEmailOtp.rejected, (state, action) => {
        state.otpStatus = 'failed';
        state.otpError = action.payload;
      });

    // VERIFY PHONE
    builder
      .addCase(verifyPhoneOtp.pending, state => {
        state.otpStatus = 'loading';
        state.otpError = null;
      })
      .addCase(verifyPhoneOtp.fulfilled, state => {
        state.otpStatus = 'succeeded';
        state.otpError = null;
      })
      .addCase(verifyPhoneOtp.rejected, (state, action) => {
        state.otpStatus = 'failed';
        state.otpError = action.payload;
      });

    // RESEND EMAIL
    builder
      .addCase(resendEmailOtp.pending, state => {
        state.otpError = null;
        state.resendCooldown = false;
      })
      .addCase(resendEmailOtp.fulfilled, (state, action) => {
        state.otpError = null;
        state.resendCooldown = action.payload.alreadySent || false;
        if (action.payload.alreadySent) {
          state.otpError = action.payload.message;
        }
      })
      .addCase(resendEmailOtp.rejected, (state, action) => {
        state.otpError = action.payload;
        state.resendCooldown = false;
      });

    // RESEND PHONE
    builder
      .addCase(resendPhoneOtp.pending, state => {
        state.otpError = null;
        state.resendCooldown = false;
      })
      .addCase(resendPhoneOtp.fulfilled, (state, action) => {
        state.otpError = null;
        state.resendCooldown = action.payload.alreadySent || false;
        if (action.payload.alreadySent) {
          state.otpError = action.payload.message;
        }
      })
      .addCase(resendPhoneOtp.rejected, (state, action) => {
        state.otpError = action.payload;
        state.resendCooldown = false;
      });
  },
});

export const { resetOtpState, clearOtpError } = otpSlice.actions;
export default otpSlice.reducer;
