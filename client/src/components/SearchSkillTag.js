import React from 'react'
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchBox';

const SearchSkillTag = ({tagName,isActive}) => {
  const { toggleSelectedSkills } = useAppContext();

  const activeHandle = () => {
    console.log("tagName...",tagName);
    toggleSelectedSkills(tagName);
  };

  return (
    <button type='button' className={`btn ${isActive ? "actived" :""}`} onClick={activeHandle}>
      {tagName}
    </button>
  )
}

export default SearchSkillTag
