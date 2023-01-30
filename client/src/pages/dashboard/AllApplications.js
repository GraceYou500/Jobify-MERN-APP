import React from 'react';
import { SearchBox, ApplicantContainer } from '../../components';

const AllApplications = () => {
  // const abc = ["a","g","p","q","o"];
  // const selected = ["o","q","a"];
  // const selected2 = ["a", "b","c"];

  // const isSelected = (origList, seleList) => {
  //   for (let ele of seleList) {
  //    if(!origList.includes(ele)) {
  //      return false;
  //      }

  //   }
  // return true;
  // };

  //  console.log("selectedChecke",isSelected(abc, selected));
  //  console.log("selectedChecke",isSelected(abc, selected2));

  //  applicationList.filter(applicant => isSelected(applicant.skills, selectedSkiils))

  return (
    <div>
      <SearchBox />
      <ApplicantContainer />
    </div>
  );
};

export default AllApplications;
