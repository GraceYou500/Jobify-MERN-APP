import React from 'react';

const SearchSkillTag = ({ tagName, isActive, toggleSkills }) => {
  const activeHandle = () => {
    console.log('tagName...', tagName);
    toggleSkills(tagName);
  };

  return (
    <button
      type='button'
      className={`btn ${isActive ? 'actived' : ''}`}
      onClick={activeHandle}
    >
      {tagName}
    </button>
  );
};

export default SearchSkillTag;
