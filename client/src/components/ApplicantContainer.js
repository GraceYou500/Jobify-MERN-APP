import React, { useEffect, useState } from 'react';
import { Applicant, Pagination, Alert} from '.';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAppContext } from '../context/appContext';

const POST_PER_PAGE = 2;

const isSelected = (selectedSkills, applicationSkills) =>{
  for(let skill of selectedSkills) {
   if( !applicationSkills.includes(skill)) { 
    return false;
    }   
  }
  return true; 
}

const paginateApplicants = (currentPage, postsPerPage, selectedApps, isShowPagination) => {
 
  if (isShowPagination) {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
  
    const currentApplicants = selectedApps.slice(indexOfFirstPost, indexOfLastPost);
    console.log("currentApplicants....",currentApplicants);
    return currentApplicants;
  } else {
    return selectedApps;
  };
 
};


const ApplicantContainer = () => {
  const {  applications, selectedSkills,  getApplications, showAlert } = useAppContext();
  const [selectedApps, setSelectedApps] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  

  useEffect(()=>{
    getApplications()
  },[])
  
 
  useEffect(() => {

    if(selectedSkills.length === 0) {      
     setSelectedApps(applications);

    } else {
      const selected = applications.filter((application) => isSelected(selectedSkills, application.skills));
      setSelectedApps(selected);
    }
    setCurrentPage(1);

  }, [selectedSkills, applications]);

  // Change page
  const changeApplicantsPage =(pagItem) =>{
    setCurrentPage(pagItem);
    console.log("pageItem.....",pagItem);
  };


  // boolean for if use pagination or not
  const isShowPagination = selectedApps.length > POST_PER_PAGE;
  // Get current posts
  const paginatedApplicants = paginateApplicants(currentPage, POST_PER_PAGE, selectedApps, isShowPagination)

  const pageNumbers = [];
  for (let i =1; i <= Math.ceil(selectedApps.length / POST_PER_PAGE); i++) {
    pageNumbers.push(i);
  };

  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>{selectedApps.length} Applicant{selectedApps.length > 1 && 's'} found</h5>
      <div className='jobs'>
        {paginatedApplicants.map((item, index) => {
          return <Applicant {...item} key={index} />;
        })}
      </div>
      {/* pagination buttons */}
      {isShowPagination && <Pagination currentPage = {currentPage} changeApplicantsPage= {changeApplicantsPage} pageNumbers = {pageNumbers}/>}
    </Wrapper>
  );
};

export default ApplicantContainer;
