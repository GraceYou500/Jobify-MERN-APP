import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/appContext';
import HobbyOption from './HobbyOption';



const HobbiesDropdown = ({shouldShow}) => {

  const { allHobbies, hobbyInput } = useAppContext();
  const [filteredHobbies, setFilteredHobbies] = useState([])

  useEffect(()=>{
   const hobbies = allHobbies.filter(hobby => hobby.includes(hobbyInput))
   setFilteredHobbies(hobbies)
  },[hobbyInput]);

  return (
    <div className={`dropdown-container ${shouldShow ? "" :"dropdown-hide"}`}>
      {filteredHobbies.map((hobby, index)=> <HobbyOption option={hobby} key={index} />)}   
    </div>
  )
}

export default HobbiesDropdown
