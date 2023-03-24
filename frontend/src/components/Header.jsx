import React from 'react';
import { BiLogIn } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserName } from '../pages/profile/Profile';

import { logout, RESET } from '../redux/features/auth/authSlice';
import './Header.scss';
import { ShowOnLogin, ShowOnLogout } from './protect/hiddenLink';
const activeLink = ({ isActive }) => (isActive ? 'active' : '');

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = () => {
    navigate('/');
  };

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <header className='header'>
      <nav>
        <div className='logo' onClick={goHome}>
          <BiLogIn size={35} />
          
        </div>

        <ul className='home-links'>
          <ShowOnLogin>
            <li className='--flex-center'>
              <UserName />
            </li>
          </ShowOnLogin>
          <ShowOnLogout>
            <li>
              <button className='--btn --btn-primary'>
                <Link to='/login'>Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <NavLink to='/profile' className={activeLink}>
                Profile
              </NavLink>
            </li>
            <li>
              <button onClick={logoutUser} className='--btn --btn-secondary'>
                Logout
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
