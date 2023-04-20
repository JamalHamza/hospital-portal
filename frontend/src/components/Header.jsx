import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppleLogo from '../../../frontend/src/assets/logo/apple-white.png';
import Sidebar from '../components/sidebar/Sidebar';
import { RESET, logout } from '../redux/features/auth/authSlice';
import './Header.css';
// ! ----------------------------------------
const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // ! --- Drawer --------------------------
  const handleOpen = () => {
    setOpen(true);
  };

  // ! ---- Logout function -----------------
  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box>
        <Sidebar open={open} setOpen={setOpen} />
      </Box>
      {/* Open Appbar */}
      <AppBar position='static'>
        <Toolbar sx={{ bgcolor: 'primary.dark' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
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
                <MenuIcon sx={{ color: '#fff', fontSize: '1.8em' }} />
              </IconButton>
              {/* <GiHospitalCross fontSize={26} color='white' /> */}
              <img src={AppleLogo} alt='logo' className='app-header-logo' />
            </Box>

            <IconButton onClick={() => logoutUser()}>
              <LogoutIcon
                fontSize='large'
                sx={{ color: 'form.main', fontSize: '2.4rem' }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
