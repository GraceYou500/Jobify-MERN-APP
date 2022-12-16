import React from 'react';
import { SearchBox, ApplicantContainer } from '../../components';

const AllApplications = () => {
  const apps = [
    { id: '1', skills: ['Java', 'JavaScript', 'React', 'CSS', 'HTML'] },
    { id: '2', skills: ['HTML', 'CSS', 'JaveScript', 'React'] },
    { id: '3', skills: ['CSS', 'React', 'Java'] },
    { id: '4', skills: ['HTML', 'JaveScript', 'React'] },
    { id: '5', skills: ['HTML', 'CSS', 'React'] },
  ];

  const newApps = apps.filter((item) =>
    item.skills.includes('Java' || 'React')
  );

  console.log('newApps/.....', newApps);
  return (
    <div>
      <SearchBox />
      <ApplicantContainer />
    </div>
  );
};

export default AllApplications;
