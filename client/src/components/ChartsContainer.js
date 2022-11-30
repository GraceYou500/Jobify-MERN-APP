import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useAppContext } from '../context/appContext';
import BarChartComponent from './BarChart';
import AreaChartComponent from './AreaChart';

const ChartsContainer = () => {
  const [chartBar, setChartBar] = useState(true);
  const { monthlyApplications: data } = useAppContext();

  const toggleBarChart = () => {
    setChartBar(!chartBar);
  };

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={toggleBarChart}>
        {chartBar ? 'Area Chart' : 'Bar Chart'}
      </button>
      {chartBar ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
