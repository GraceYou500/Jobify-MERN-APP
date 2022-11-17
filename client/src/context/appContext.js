import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import axios from 'axios';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from './actions';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  token: null,
  userLocation: '',
  jobLocation: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });

    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser);
      console.log('registerUser...........', response);
      const data = response.data;
      const { user, token, location } = data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });

      // save token in localStorage
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hook
const useAppContext = () => {
  return useContext(AppContext); // via this we are able to use the value in state
};

export { AppProvider, initialState, useAppContext };

// useContext(AppContext), then you can use all the values in value={} which is in AppContext.Provider.
