import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSelector, shallowEqual } from 'react-redux';

const ProtectedRoute = ({ children, check, selector = () => null, redirectTo = '/' }) => {
  const { authState } = useAuth();
  const selectedState = useSelector(selector, shallowEqual);

  const isAllowed = check(authState, selectedState);

  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
