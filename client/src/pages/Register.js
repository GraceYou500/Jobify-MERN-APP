import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  // console.log(values);
  // global state and useNavigate
  const navigate = useNavigate();
  const {
    isLoading,
    showAlert,
    displayAlert,
    registerUser,
    user,
    loginUser,
    setupUser,
  } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    // console.log(e.target);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { email, password, isMember, name } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = { email, name, password };
    if (isMember) {
      setupUser({
        currentUser,
        endpoint: 'login',
        alertText: 'Login successful! Redirecting...',
      });
      console.log(currentUser);
    } else {
      setupUser({
        currentUser,
        endpoint: 'register',
        alertText: 'Register successful! Redirecting...',
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <div className='form-row'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='text'
              value={values.name}
              name='name'
              onChange={handleChange}
              className='form-input'
            />
          </div>
        )}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />

        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>
        <button
          type='button'
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() => {
            setupUser({
              currentUser: { email: 'testUser@test.com', password: '789456' },
              endpoint: 'login',
              alertText: 'Login successful! Redirecting...',
            });
          }}
        >
          {isLoading ? 'Loading...' : 'Demo App'}
        </button>
        <p>
          {!values.isMember ? 'Already a member?' : ' Not a member yet?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {!values.isMember ? 'Login' : 'Register'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
