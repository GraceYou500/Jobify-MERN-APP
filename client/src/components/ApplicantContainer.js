import React, { useEffect } from 'react';
import Applicant from './Applicant';
import applicationList from '../utils/applicationList';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAppContext } from '../context/appContext';

const ApplicantContainer = () => {
  const { getApplications, applications } = useAppContext();

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <Wrapper>
      <h5>{applications.length} Applications found</h5>
      <div className='jobs'>
        {applications.map((item, index) => {
          return <Applicant {...item} key={index} />;
        })}
      </div>
    </Wrapper>
  );
};

export default ApplicantContainer;
