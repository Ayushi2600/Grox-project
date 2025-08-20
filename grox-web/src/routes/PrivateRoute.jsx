import ProtectedRoute from './ProtectedRoute';
import {
  EmailVerification,
  PhoneVerification,
  Introduction,
  KycVerification,
  Dashboard,
  ResetPassword,
} from './lazyRoute';

const privateRoutes = () => [
  {
    path: '/verify-email',
    element: (
      <ProtectedRoute check={auth => auth.isSignedUp}>
        <EmailVerification />
      </ProtectedRoute>
    ),
  },
  {
    path: '/introduction',
    element: (
      <ProtectedRoute check={auth => auth.isEmailVerified}>
        <Introduction />
      </ProtectedRoute>
    ),
  },
  {
    path: '/verify-phone',
    element: (
      <ProtectedRoute check={auth => auth.isEmailVerified}>
        <PhoneVerification />
      </ProtectedRoute>
    ),
  },
  {
    path: '/kyc-verify',
    element: (
      <ProtectedRoute check={auth => auth.isPhoneVerified}>
        <KycVerification />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute check={auth => auth.isAuthenticated}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
{
  path: '/reset-password',
  element: (
    <ProtectedRoute
      selector={state => state.reset.step}
      check={(_auth, step) => {
        const token = new URLSearchParams(window.location.search).get('token');
        return !!token || step >= 1;
      }}
    >
      <ResetPassword />
    </ProtectedRoute>
  ),
}

];

export default privateRoutes;
