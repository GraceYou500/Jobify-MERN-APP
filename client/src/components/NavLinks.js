import links from '../utils/links';
import { NavLink } from 'react-router-dom';

const NavLinks = ({ toggleSidebar }) => {
  return (
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
  );
};

export default NavLinks;
