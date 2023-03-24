import React from 'react';
import { NavLink } from 'react-router-dom';
import { AdminAutoLink } from '../protect/hiddenLink';
import './PageMenu.scss';

function PageMenu() {
  return (
    <div>
      <nav className='--btn-google --p --mb'>
        <ul className='home-links'>
          <li>
            <NavLink to='/profile'>Profile</NavLink>
          </li>
          <li>
            <NavLink to='/changePassword'>Change Password</NavLink>
          </li>
          <AdminAutoLink>
            <li>
              <NavLink to='/users'>Users</NavLink>
            </li>
          </AdminAutoLink>
        </ul>
      </nav>
    </div>
  );
}

export default PageMenu;
