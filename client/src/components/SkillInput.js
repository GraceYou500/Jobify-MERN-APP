import React from 'react';

const SkillInput = ({
  value,
  name,
  delSkillHandle,
  index,
  handleChange,
  canDel,
}) => {
  // const onChange = (e) => {
  //   console.log('abc', index);
  //   handleChange(e);
  // };
  return (
    <div className='form-row skill-row'>
      {/* <label className='form-label'>Skills</label> */}
      <input
        type='text'
        value={value}
        name={name}
        onChange={handleChange}
        className='form-input'
      />
      {canDel && (
        <button onClick={delSkillHandle} className='skill-del-btn'>
          x
        </button>
      )}
    </div>
  );
};

export default SkillInput;
