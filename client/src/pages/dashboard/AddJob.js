import { useAppContext } from '../../context/appContext';
import { Alert, FormRow, FormSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
  
  const {
    isLoading,
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
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editJob();
      return;
    }

    createJob();
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    console.log('handleInputChange..............', `${name}: ${value}`);

    handleChange({ name, value });
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
          <FormSelect
            value={status}
            labelText='job status'
            name='status'
            handleChange={handleInputChange}
            options={statusOptions}
          />
          <FormSelect
            value={jobType}
            labelText='job Type'
            name='jobType'
            handleChange={handleInputChange}
            options={jobTypeOptions}
          />
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : 'submit'}
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
