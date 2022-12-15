import React, { useState } from 'react';

import Wrapper from '../../assets/wrappers/ApplicationFormPage';
import { FormRow, Alert, SkillInput } from '../../components';
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
    createApplication,
    idEditingApp,
    addSkill,
    changeSkill,
    applicantSkillsList,
    deleteSkill,
  } = useAppContext();

  // const [skills, setskills] = useState(['']);

  const addSkillHandler = (e) => {
    e.preventDefault();

    addSkill();
    // console.log('addSkillHandler', skills);
  };

  const skillChangeHandle = (e, index) => {
    console.log('skillChangeHandle', index, e.target.value);
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
      !applicantSkillsList

      //   || !skills
    ) {
      displayAlert();
      return;
    }

    createApplication();
  };

  return (
    <Wrapper>
      <form onSubmit={submitHandler}>
        <h3>{idEditingApp ? 'Edit' : 'Add'} Application</h3>
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
            <button onClick={addSkillHandler}>Add</button>
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
            <button className='btn btn-block clear-btn'>Back</button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddApplication;
