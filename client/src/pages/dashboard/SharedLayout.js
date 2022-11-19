import { format } from 'morgan';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';
import { Navbar, SmallSidebar, BigSidebar } from '../../components';
import { useAppContext } from '../../context/appContext';

const SharedLayout = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <main className='dashboard'>
        {showSidebar && (
          <div>
            <SmallSidebar />
            <BigSidebar />
          </div>
        )}
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
