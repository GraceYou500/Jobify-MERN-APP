import React, { useState, useReducer, useContext } from 'react';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

// custom hook
const useAppContext = () => {
  return useContext(AppContext); // via this we are able to use the value in state
};

export { AppProvider, initialState, useAppContext };

// useContext(AppContext), then you can use all the values in value={} which is in AppContext.Provider.
