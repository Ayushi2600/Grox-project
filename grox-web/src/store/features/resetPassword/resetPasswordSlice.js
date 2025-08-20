import { createSlice } from '@reduxjs/toolkit';
import {
  sendResetRequest,
  verifyPhoneOtp,
  changePassword,
} from './resetPasswordThunks';

const initialState = {
  step: 1,
  method: 'email',
  email: '',
  phoneNumber: '',
  countryCode: '+91',
  token: '',
  userId: null,
  password: '',
  confirmPassword: '',
  otp: '',
  status: 'idle',
  error: null,
  successMessage: '',
  resetSuccess: false,
};

const resetPasswordSlice = createSlice({
  name: 'reset',
  initialState,
  reducers: {
    setMethod: (state, action) => {
      state.method = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setFormData: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    clearResetState: () => initialState,
    clearResetSuccess: state => {
      state.resetSuccess = false;
      state.successMessage = '';
    },
    clearResetError: state => {
      state.error = null;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendResetRequest.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendResetRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { method, requestPayload } = action.payload;

        if (method === 'email') {
          state.method = 'email';
          state.email = requestPayload.email;
        } else if (method === 'phoneNumber') {
          state.method = 'phoneNumber';
          state.phoneNumber = requestPayload.phoneNumber;
          state.countryCode = requestPayload.countryCode;
          state.userId =
            action.payload?.data?.user?.id ||
            action.payload?.userId ||
            action.payload?.data?.userId;
          state.step = 2;
        }
      })
      .addCase(sendResetRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(verifyPhoneOtp.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyPhoneOtp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.userId = action.payload.user.id;
        state.step = 3;
      })
      .addCase(verifyPhoneOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(changePassword.pending, state => {
        state.status = 'loading';
        state.error = null;
        state.resetSuccess = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.resetSuccess = true;
        state.successMessage =
          action.payload.message || 'Password reset successful';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.resetSuccess = false;
      });
  },
});

export const {
  setMethod,
  setStep,
  setFormData,
  clearResetState,
  clearResetError,
  setUserId,
  clearResetSuccess,
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
