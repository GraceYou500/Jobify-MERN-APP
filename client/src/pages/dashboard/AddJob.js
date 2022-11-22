import { useAppContext } from '../../context/appContext';
import { Alert, FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
  const {
    showAlert,
    displayAlert,
    position,
    company,
    jobType,
    jobTypeOptions,
    statusOptions,
    status,
    jobLocation,
    isEditing,
  } = useAppContext();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }

    console.log('create job');
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    console.log('handleInputChange..............', `${name}: ${value}`);
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={submitHandler}>
        <h3>{isEditing ? 'Edit job' : 'Add job'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow
            type='text'
            value={company}
            name='company'
            handleChange={handleInputChange}
          />
          <FormRow
            type='text'
            value={position}
            name='position'
            handleChange={handleInputChange}
          />
          <FormRow
            type='text'
            value={jobLocation}
            labelText='job Location'
            name='jobLocation'
            handleChange={handleInputChange}
          />
          {/* Job Type */}
          {/* Status */}
          <div className='btn-container'>
            <button type='submit' className='btn btn-block submit-btn'>
              submit
            </button>
            <button className='clear-btn'>Clear</button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
