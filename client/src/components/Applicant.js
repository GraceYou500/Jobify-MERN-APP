import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import { FaEnvelope, FaCalendarAlt, FaBriefcase } from 'react-icons/fa';
import JobInfo from './JobInfo';
import { useAppContext } from '../context/appContext';

const Applicant = ({
  firstName,
  lastName,
  email,
  createdAt,
  position,
  skills,
  id,
}) => {
  const { deleteApplication, setEditApplication } = useAppContext();
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{position.charAt(0)}</div>
        <div className='info'>
          <div>{firstName}</div>
          <div>{lastName}</div>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaEnvelope />} text={email} />
          <JobInfo icon={<FaCalendarAlt />} text={createdAt} />
          <JobInfo icon={<FaBriefcase />} text={position} />
          <div className='content-skills'>
            <div className='java'>{skills[0]}</div>
            <div className='js'>{skills[1]}</div>
            <div className='react'>{skills[2]}</div>
          </div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              className='btn edit-btn'
              to='/add-application'
              onClick={() => setEditApplication(id)}
            >
              Edit
            </Link>
            <button
              className='btn delete-btn'
              onClick={() => deleteApplication(id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Applicant;
