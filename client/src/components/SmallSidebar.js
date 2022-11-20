import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import links from '../utils/links';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className='nav-links'>
            {links.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                to={item.path}
                key={item.id}
                onClick={toggleSidebar}
              >
                <span className='icon'>{item.icon}</span>
                {item.text}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
