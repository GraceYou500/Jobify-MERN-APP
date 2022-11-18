import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAppContext();

  useEffect(() => {
    if (!user) {
      navigate('/landing');
    }
  }, [user, navigate]);

  return children;
};

export default ProtectedRoute;
