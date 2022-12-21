import React from 'react'
import Wrapper from '../assets/wrappers/Hobbies';
import { useAppContext } from '../context/appContext';


const HobbyItem = ({value}) => {

  const { deleteHobbySelected } = useAppContext()
  return (
    <Wrapper>
      <div className='hobby-item'>
        {value}
        <span className='delete-btn' onClick={()=> deleteHobbySelected(value)}>x</span>
      </div>
    </Wrapper>
  )
}

export default HobbyItem;
