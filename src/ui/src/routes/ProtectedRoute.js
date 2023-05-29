import React from 'react';
import { useContext } from 'react';
import { Outlet } from 'react-router';
import { userContext } from '../Contexts/userContext';
import Error from '../pages/MessagePages/Error';

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(userContext);
  if (!user) {
    return <Error />;
  }
  return <Outlet />;
};
