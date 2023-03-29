import React, { useState } from 'react';
// import { BiLogIn } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { UserName } from '../pages/profile/Profile';

import { logout, RESET } from '../redux/features/auth/authSlice';
import './Header.css';
// import { ShowOnLogin, ShowOnLogout } from './protect/hiddenLink';
const activeLink = ({ isActive }) => (isActive ? 'active' : '');

// ! ----------------------------------------
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// ! ----------------------------------------

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ! --- Drawer --------------------------------
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // ! ----------------------------------------
  const goHome = () => {
    navigate('/');
  };

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <>
        <Drawer anchor='left' open={open} onClose={handleClose}>
          <div style={{ width: 250 }}>This is the drawer content</div>
        </Drawer>
      </>
      <AppBar position='static' sx={{ bgcolor: '5rem' }}>
        <Toolbar sx={{ bgcolor: 'primary.main' }}>
          <IconButton
            onClick={handleOpen}
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button
            variant='contained'
            sx={{ bgcolor: 'third.main', fontWeight: 800 }}
            onClick={logoutUser}
          >
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

// <header className='header'>
//   <nav>
//     <div className='logo' onClick={goHome}>
//       <BiLogIn size={35} />

//     </div>
//     <ul className='home-links'>
//       <ShowOnLogin>
//         <li className='--flex-center'>
//           <UserName />
//         </li>
//       </ShowOnLogin>
//       <ShowOnLogout>
//         <li>
//           <button className='--btn --btn-primary'>
//             <Link to='/login'>Login</Link>
//           </button>
//         </li>
//       </ShowOnLogout>
//       <ShowOnLogin>
//         <li>
//           <NavLink to='/profile' className={activeLink}>
//             Profile
//           </NavLink>
//         </li>
//         <li>
//           <button onClick={logoutUser} className='--btn --btn-secondary'>
//             Logout
//           </button>
//         </li>
//       </ShowOnLogin>
//     </ul>
//   </nav>
// </header>
