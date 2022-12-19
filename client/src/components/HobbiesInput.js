import React from 'react'
import HobbiesContainer from './HobbiesContainer';
import HobbiesDropdown from './HobbiesDropdown';

const HobbiesInput = () => {
  return (
    <div className='form-row'>
      <label>Hobbies</label>
      <HobbiesContainer />
      <div>
        <input />
        <HobbiesDropdown />     
      </div>
    </div>
  )
}

export default HobbiesInput;
