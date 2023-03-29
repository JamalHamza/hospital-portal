import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import SyncLockIcon from '@mui/icons-material/SyncLock';
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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, RESET } from '../redux/features/auth/authSlice';
import './Header.css';
const activeLink = ({ isActive }) => (isActive ? 'active' : '');

// ! ----------------------------------------

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ! --- itemList ------------------------
  const itemsList = [
    {
      text: 'Profile',
      icon: <ManageAccountsIcon fontSize='large' color='btn' />,
      onClick: () => {
        navigate('/profile'), setOpen(false);
      },
    },
    {
      text: 'Change Password',
      icon: <SyncLockIcon fontSize='large' color='btn' />,
      onClick: () => {
        navigate('/changePassword'), setOpen(false);
      },
    },
  ];

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
              {itemsList.map((item, index) => {
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
        <Toolbar sx={{ bgcolor: 'menu.main' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box>
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
