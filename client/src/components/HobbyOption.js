import React from 'react'
import Wrapper from '../assets/wrappers/Hobbies';
import { useAppContext } from '../context/appContext';

const HobbyOption = ({option, focuseInput}) => {

  const { selectHobbyFromDropdown, clearHobbyInput  } = useAppContext()
  const choseValue = () => { 
    console.log("choseValue......",option);
    selectHobbyFromDropdown(option);
    clearHobbyInput();
    focuseInput();
  };

  return (
    <Wrapper>
      <div onClick={choseValue} className="hobby-option">
        {option}
      </div>
    </Wrapper>
  )
}

export default HobbyOption;
