import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/SearchBox';
import { useAppContext } from '../context/appContext';
import SearchSkillTag from "./SearchSkillTag";

const SearchBox = () => {
  const { allSkills, selectedSkills } = useAppContext();
  // console.log("SearchBox.....", allSkills);
 


  return (
    <Wrapper>
      <div className='container-box'>
        <h3>Search Box</h3>
        <div className='skills'>
        {allSkills.map((skill,index) => <SearchSkillTag tagName={skill} key={index} isActive={selectedSkills.includes(skill)} />)}
        </div>
      </div>
    </Wrapper>
  );
};

export default SearchBox;
