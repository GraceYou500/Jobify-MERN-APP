import { useEffect } from 'react';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAppContext } from '../context/appContext';
import { Job, Loading, PageBtnContainer, Alert } from '.';

const JobsContainer = () => {
  const {
    getJobs,
    isLoading,
    jobs,
    totalJobs,
    numOfPages,
    page,
    search,
    searchStatus,
    searchType,
    sort,
    showAlert,
    setEditJob,
    deleteJob,
  } = useAppContext();

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => (
          <Job
            key={job._id}
            {...job}
            setEditJob={setEditJob}
            deleteJob={deleteJob}
          />
        ))}
      </div>
      {/* pagination buttons */}
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
