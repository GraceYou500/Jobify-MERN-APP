import React from 'react';
import Wrapper from '../assets/wrappers/SearchBox';

const SearchBox = () => {
  return (
    <Wrapper>
      <div className='container-box'>
        <h3>Search Box</h3>
        <div className='skills'>
          <button type='button' className='java btn'>
            Java
          </button>
          <button type='button' className='js btn'>
            JavaScript
          </button>
          <button type='button' className='react btn'>
            React
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default SearchBox;
