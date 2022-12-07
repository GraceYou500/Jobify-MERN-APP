import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { Loading } from '../components';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, userLoading } = useAppContext();

  if (userLoading) {
    return <Loading />;
  }

  // check user,
  // if no user, check token
  // if is token, use token get user
  // if request sucess, put user in context
  // other landing
  if (!user) {
    return navigate('/landing');
  }

  return children;
};

export default ProtectedRoute;
