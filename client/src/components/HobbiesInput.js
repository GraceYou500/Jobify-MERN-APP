import React, { useEffect, useState } from 'react'
import HobbiesContainer from './HobbiesContainer';
import HobbiesDropdown from './HobbiesDropdown';
import Wrapper from '../assets/wrappers/Hobbies';
import { useAppContext } from '../context/appContext';

const HobbiesInput = () => {

  const { hobbyInput,handleChange, enterHobby, clearHobbyInput } = useAppContext()
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
  //  console.log("Hobby Input.....", name, value);
    handleChange({name, value})
  };

  const handleKeyDown =(e) => { 
    // console.log("handleKeyDown....", e.key);
    if(e.key === "Enter") {
   
      enterHobby();
      clearHobbyInput();
      e.preventDefault();
    }
  };

  useEffect(()=>{
    if (hobbyInput) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  },[hobbyInput])


  return (
    <Wrapper>
      <div className='form-row'>
        <label className='form-label'>Hobbies</label>
        <HobbiesContainer />
        <div className='input-container'>
          <div className='hobbies-inputfield'>
            <input className='form-row form-input' onChange={handleInputChange} onKeyDown={handleKeyDown} name="hobbyInput" value={hobbyInput}/>                 
          </div>
          <HobbiesDropdown className="dropdown-container" shouldShow={showDropdown}/>  
        </div>
      </div>
    </Wrapper>
  )
}

export default HobbiesInput;
