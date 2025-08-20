import authReducer from './features/auth/authSlice';
import introductionReducer from './features/introduction/introductionSlice';
import otpReducer from './features/otp/otpSlice';
import resetPasswordReducer from './features/resetPassword/resetPasswordSlice';
import kycReducer from './features/kyc/kycSlice';

const reducers = {
  auth: authReducer,
  introduction: introductionReducer,
  otp: otpReducer,
  reset: resetPasswordReducer,
  kyc: kycReducer,
};

export default reducers; 
