import React from 'react';

export const LandingPage = React.lazy(
  () => import('../components/LandingPage/LandingPage')
);
export const WaitlistModal = React.lazy(
  () => import('../components/WaitlistModal/WaitlistModal')
);
export const Login = React.lazy(() => import('../Auth/Login/Login'));
export const CreateAccount = React.lazy(
  () => import('../Auth/CreateAccount/CreateAccount')
);
export const ResetPassword = React.lazy(
  () => import('../Auth/ResetPassword/ResetPassword')
);

export const EmailVerification = React.lazy(
  () => import('../Auth/OtpVerification/EmailVerification')
);
export const PhoneVerification = React.lazy(
  () => import('../Auth/OtpVerification/PhoneVerification')
);
export const Introduction = React.lazy(
  () => import('../Auth/Introduction/Introduction')
);
export const KycVerification = React.lazy(
  () => import('../Auth/KycVerification/KycVerification')
);
export const Dashboard = React.lazy(
  () => import('../components/Dashboard/Dashboard')
);
