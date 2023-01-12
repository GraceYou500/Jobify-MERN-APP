import React, { useEffect, useState } from 'react';
import Applicant from './Applicant';
import Pagination from './Pagination';
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
  const [selectedApps, setSelectedApps] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(()=>{
    getApplications()
  },[])
  
 
  useEffect(() => {


    if(selectedSkills.length === 0) {      
     setSelectedApps(applications);
   
    } else {
      const selected = applications.filter((application) => isSelected(selectedSkills, application.skills))
      setSelectedApps(selected);
    }

  }, [selectedSkills, applications]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentApplicants = selectedApps.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const changeApplicantsPage =(pagItem) =>{
    setCurrentPage(pagItem);
  };

  const pageNumbers = [];

  for (let i =1; i <= Math.ceil(selectedApps.length / postsPerPage); i++) {
    pageNumbers.push(i);
  };

  return (
    <Wrapper>
      <h5>{selectedApps.length} Applicant{selectedApps.length > 1 && 's'} found</h5>
      <div className='jobs'>
        {currentApplicants.map((item, index) => {
          return <Applicant {...item} key={index} />;
        })}
      </div>
      {/* pagination buttons */}
      {pageNumbers.length > 1 && <Pagination currentPage = {currentPage} changeApplicantsPage= {changeApplicantsPage} pageNumbers = {pageNumbers}/>}
    </Wrapper>
  );
};

export default ApplicantContainer;
