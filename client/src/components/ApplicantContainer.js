import React, { useEffect, useState } from 'react';
import Applicant from './Applicant';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAppContext } from '../context/appContext';

const isSelected = (selectedSkills, applicationSkills) =>{
  for(let skill of selectedSkills) {
   if( !applicationSkills.includes(skill)) { 
    return false;
    }   
  }
  return true; 
}

const ApplicantContainer = () => {
  const {  applications, selectedSkills,  getApplications } = useAppContext();
  const [selectedApps, setSelectedApps] = useState([])

useEffect(()=>{
  getApplications()
},[])
  
 
  useEffect(() => {
    if(selectedSkills.length === 0) {      
     setSelectedApps(applications);
      // console.log("selectedApplications.....1", selectedApplications);
      // console.log("applications.......1",applications);
    } else {
      const selected = applications.filter((application) => isSelected(selectedSkills, application.skills))
      setSelectedApps(selected);
    }

  }, [selectedSkills, applications]);
  //  console.log("applications.......",applications);
  console.log("selectedSkills....",selectedSkills);
  console.log("selectedApps.....", selectedApps);

  return (
    <Wrapper>
      <h5>{selectedApps.length} Applications found</h5>
      <div className='jobs'>
        {selectedApps.map((item, index) => {
          return <Applicant {...item} key={index} />;
        })}
      </div>
    </Wrapper>
  );
};

export default ApplicantContainer;
