import React from 'react'
import Wrapper from '../assets/wrappers/Hobbies';
import { useAppContext } from '../context/appContext';

// const stringToCheck = "Flower Gardening";
// const tag = "Wer";
// const tagIndex = stringToCheck.toLowerCase().indexOf(tag.toLowerCase());
// console.log("tagIndex....", tagIndex);

// const part1 = stringToCheck.slice(0,tagIndex)
// console.log("part1....", part1);

// const tagLength = tag.length + tagIndex;
// console.log("tagLength....",tagLength);

// const part2 = stringToCheck.slice(tagIndex, tagLength)
// console.log("part2....", part2);

// const part3 = stringToCheck.slice(tagLength)
// console.log("part3....", part3);

const splitHighlightContent = (option, hobbyInput) => {
  const tagStartIndex = option.toLowerCase().indexOf(hobbyInput.toLowerCase());
  const tagEndIndex = hobbyInput.length + tagStartIndex;

  const part1 = option.slice(0, tagStartIndex);
  const part2 = option.slice(tagStartIndex, tagEndIndex);
  const part3 = option.slice(tagEndIndex)

  return [part1, part2, part3];

};


const HobbyOption = ({option, focuseInput}) => {

  const { selectHobbyFromDropdown, clearHobbyInput, hobbyInput } = useAppContext();

  const choseValue = () => { 
    console.log("choseValue......",option);
    selectHobbyFromDropdown(option);
    clearHobbyInput();
    focuseInput();
  };



const [part1, part2, part3] = splitHighlightContent(option, hobbyInput);


  return (
    <Wrapper>
      <div onClick={choseValue} className="hobby-option">
        <div>
          <span>{part1}</span>
          <span className='font-change'><strong>{part2}</strong></span>
          <span>{part3}</span>
        </div>
      </div>
    </Wrapper>
  )
}

export default HobbyOption;
