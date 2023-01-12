import { useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/ApplicationFormPage';
import { FormRow, Alert, SkillInput, HobbiesInput } from '../../components';
import { useAppContext } from '../../context/appContext';


const AddApplication = () => {
  const {
    applicantFirstName,
    applicantLastName,
    applicantEmail,
    applicantPosition,
    applicantDescription,
    handleChange,
    showAlert,
    displayAlert,
    createApplicant,
    idEditingApp,
    addSkill,
    changeSkill,
    applicantSkillsList,
    deleteSkill,
    clearValues,
    editApplicant,
    selectedHobbies,
  } = useAppContext();

  // const [skills, setskills] = useState(['']);

  const navigate = useNavigate();

  const addSkillHandler = (e) => {
    console.log("addSkillHandler......");
    e.preventDefault();

    addSkill();
    // console.log('addSkillHandler', skills);
  };

  const skillChangeHandle = (e, index) => {
    // console.log('skillChangeHandle', index, e.target.value);
    const skillValue = e.target.value;

    changeSkill({ skillValue, index });

    // const skillsUpdate = [...skills];

    // skillsUpdate[index] = inputSkill;
    // console.log('skillUpdate', skillsUpdate);
    // setskills(skillsUpdate);
  };

  const delSkillHandle = (e, index) => {
    e.preventDefault();
    // const existSkills = [...skills];
    // existSkills.splice(index, 1);
    //   setskills(existSkills);
    //   console.log('delSkillHandle', existSkills);
    deleteSkill({ index });
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    handleChange({ name, value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !applicantFirstName ||
      !applicantLastName ||
      !applicantEmail ||
      !applicantPosition ||
      !applicantSkillsList ||
      !selectedHobbies

      //   || !skills
    ) {
      displayAlert();
      return;
    }

    if (idEditingApp) {
      editApplicant();

      setTimeout(()=>{
        navigate('/all-applicants');
      },3000)
    
      return;
    }

    createApplicant();
    setTimeout(()=>{
      navigate('/all-applicants');
    },3000)
  };

  const backToAllHandle = (e) => {
    e.preventDefault();
    clearValues();
    navigate('/all-applicants');
  };

  return (
    <Wrapper>
      <form onSubmit={submitHandler}>
        <h3>{idEditingApp ? 'Edit' : 'Add'} Applicant</h3>
        {showAlert && <Alert />}
        <div className='form-container'>
          <div className='form-center'>
            <FormRow
              name='applicantFirstName'
              type='text'
              value={applicantFirstName}
              handleChange={handleInputChange}
              labelText='First Name'
            />
            <FormRow
              name='applicantLastName'
              type='text'
              value={applicantLastName}
              handleChange={handleInputChange}
              labelText='Last Name'
            />
            <FormRow
              name='applicantEmail'
              type='email'
              value={applicantEmail}
              handleChange={handleInputChange}
              labelText='Email'
            />
            <FormRow
              name='applicantPosition'
              type='text'
              value={applicantPosition}
              handleChange={handleInputChange}
              labelText='Position'
            />
          </div>
          <div>
            <label className='form-label'>Skills</label>
            <div className='form-skill'>
              {applicantSkillsList.map((item, index) => {
                return (
                  <SkillInput
                    key={index}
                    handleChange={(e) => skillChangeHandle(e, index)}
                    name='skill'
                    value={item}
                    delSkillHandle={(e) => delSkillHandle(e, index)}
                    index={index}
                    canDel={applicantSkillsList.length > 1}
                  />
                );
              })}
            </div>
            <button onClick={addSkillHandler} type="button">Add</button>
          </div>
          <div>
            <HobbiesInput />
          </div>
          <div>
            <FormRow
              name='applicantDescription'
              type='text'
              value={applicantDescription}
              handleChange={handleInputChange}
              labelText='Description'
            />
          </div>
          <div className='btn-container'>
            <button className='btn btn-block submit-btn' type='submit'>
              Submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={backToAllHandle}
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddApplication;
