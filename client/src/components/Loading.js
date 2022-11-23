import React from 'react';

const Loading = ({ center }) => {
  console.log('Loading......', center);
  return <div className={center ? 'loading loading-center' : 'loading'}></div>;
};

export default Loading;
