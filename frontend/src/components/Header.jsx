import GroupIcon from '@mui/icons-material/Group';
import LockResetIcon from '@mui/icons-material/LockReset';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import logoIcon from '../../src/assets/logo8.png';
import { logout, RESET } from '../redux/features/auth/authSlice';
import './Header.css';
const activeLink = ({ isActive }) => (isActive ? 'active' : '');

// ! ----------------------------------------

const Header = () => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isLoading,
    isLoggedIn,
    isSuccess,
    message,
    isError,
    towFactors,
    user,
  } = useSelector((state) => state.auth);


  // ! --- checking for user Role to show content

  const isAdmin = user?.role === 'admin';
  const isPatient = user?.role === 'patient';
  const isDoctor = user?.role === 'doctor';

  // ! --- itemList ------------------------
  let itemsList;
  if (isAdmin) {
    itemsList = [
      {
        text: 'Profile',
        icon: <ManageAccountsIcon fontSize='large' color='btn' />,
        onClick: () => {
          navigate('/profile'), setOpen(false);
        },
      },
      {
        text: 'Change Password',
        icon: <LockResetIcon fontSize='large' color='btn' />,
        onClick: () => {
          navigate('/changePassword'), setOpen(false);
        },
      },
      {
        text: 'Users',
        icon: <GroupIcon fontSize='large' color='btn' />,
        onClick: () => {
          navigate('/users'), setOpen(false);
        },
      },
    ];
  } else if (isDoctor) {
    itemsList = [
      {
        text: 'Profile',
        icon: <ManageAccountsIcon fontSize='large' color='btn' />,
        onClick: () => {
          navigate('/profile'), setOpen(false);
        },
      },
      {
        text: 'Change Password',
        icon: <LockResetIcon fontSize='large' color='btn' />,
        onClick: () => {
          navigate('/changePassword'), setOpen(false);
        },
      },
    ];
  } else if (isPatient) {
    itemsList = [
      {
        text: 'Profile',
        icon: <ManageAccountsIcon fontSize='large' color='btn' />,
        onClick: () => {
          navigate('/profile'), setOpen(false);
        },
      },
      {
        text: 'Change Password',
        icon: <LockResetIcon fontSize='large' color='btn' />,
        onClick: () => {
          navigate('/changePassword'), setOpen(false);
        },
      },
    ];
  } else {
    itemsList = [];
  }

  // ! --- Drawer --------------------------
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
          <div style={{ width: 200 }}>
            <List>
              {itemsList?.map((item, index) => {
                const { text, icon, onClick } = item;
                return (
                  <ListItem key={text} onClick={onClick}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Drawer>
      </>
      <AppBar position='static'>
        <Toolbar sx={{ bgcolor: 'primary.main' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              className="header--left"
              sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
              }}
            >
              <IconButton
                onClick={handleOpen}
                size='large'
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{ mr: 1 }}
              >
                <MenuIcon fontSize='large' sx={{ color: '#fff' }} />
              </IconButton>
              <img className='header--logo' src={logoIcon} alt='logo' />
            </Box>

            <Button
              variant='contained'
              sx={{ bgcolor: 'third.main', fontWeight: 800 }}
              onClick={logoutUser}
            >
              LogOut
            </Button>
          </Box>
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
