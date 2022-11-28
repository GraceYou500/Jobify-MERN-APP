import React from 'react';
import Wrapper from '../assets/wrappers/StatItem';

const StatItem = ({ title, count, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      {/* Wrapper's color and bcg pass the props to style component for color and bcg value */}
      <header>
        <span className='count'>{count}</span>
        <div className='icon'>{icon}</div>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
