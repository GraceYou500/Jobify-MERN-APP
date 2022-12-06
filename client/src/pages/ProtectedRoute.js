import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAppContext();

  useEffect(() => {
    // check user,
    // if no user, check token
    // if is token, use token get user
    // if request sucess, put user in context
    // other landing
    // if (!user) {
    //   navigate('/landing');
    // }
  }, [user, navigate]);

  return children;
};

export default ProtectedRoute;
