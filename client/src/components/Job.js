import React from 'react';
import moment from 'moment';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';

const Job = ({
  company,
  status,
  jobLocation,
  jobType,
  position,
  createdAt,
  _id,
}) => {
  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY');

  const { setEditJob, deleteJob } = useAppContext();

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              className='btn edit-btn'
              to='/add-job'
              onClick={() => {
                setEditJob(_id);
              }}
            >
              Edit
            </Link>
            <button
              className='btn delete-btn'
              type='button'
              onClick={() => {
                deleteJob(_id);
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
