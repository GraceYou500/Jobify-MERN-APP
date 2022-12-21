import React from 'react'
import HobbyItem from './HobbyItem'
import Wrapper from '../assets/wrappers/Hobbies'
import { useAppContext } from '../context/appContext'

const HobbiesContainer = () => {

  const { selectedHobbies } = useAppContext();

  return (
    <Wrapper>
      <div className='hobbies-container'>
        {selectedHobbies.map((hobby, index) => <HobbyItem value={hobby} key={index}/>)}  
      </div>
    </Wrapper>
  )
}

export default HobbiesContainer
