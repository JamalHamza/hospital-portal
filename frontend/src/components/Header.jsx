import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { GiHospitalCross } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
        <Toolbar sx={{ bgcolor: 'menu.main' }}>
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
              <GiHospitalCross fontSize={26} color='white' />
            </Box>

            <Button
              variant='contained'
              sx={{
                bgcolor: 'third.main',
                padding: '0.4em 1em',
                fontWeight: 800,
                fontSize: '1rem',
                color: 'primary.dark',
                '&:hover': {
                  background: '#ccb7c0',
                },
              }}
              onClick={() => logoutUser()}
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
