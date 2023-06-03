import React from 'react';
import { useContext } from 'react';
import { Outlet } from 'react-router';
import { userContext } from '../Contexts/userContext';
import Error from '../pages/MessagePages/Error';
import useRBAC from '../hooks/useRBAC';

export const ProtectedRoute = ({ expectedRole }) => {
  const { user } = useContext(userContext);
  const roles = useRBAC();

  if (!user || !roles.includes(expectedRole)) {
    return <Error />;
  }

  return <Outlet />;
};
