import React, { useState } from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useAppContext } from '../../context/appContext';
import { FormRow, Alert } from '../../components';

const Profile = () => {
  const { user, updateUser, displayAlert, showAlert, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);
  const [lastName, setLastName] = useState(user?.lastName);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !email || !location || !lastName) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, location, lastName };
    console.log('currentUser.............', currentUser);

    updateUser({ name, email, location, lastName }); // same as pass in currentUser
  };
  return (
    <Wrapper>
      <form onSubmit={submitHandler} className='form'>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow
            type='text'
            value={name}
            name='name'
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type='text'
            value={lastName}
            name='lastName'
            labelText='Last Name'
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type='email'
            value={email}
            name='email'
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type='text'
            value={location}
            name='location'
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? 'Saving...Please wait...' : 'Changes saved'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
