import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import LockResetIcon from '@mui/icons-material/LockReset';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { GiHospitalCross } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import doctors from '../../src/assets/drawerIcon/medical-assistance.png';
import { RESET, logout } from '../redux/features/auth/authSlice';
import './Header.css';
// ! ----------------------------------------
const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // ! --- checking for user Role to show content
  const isAdmin = user?.role === 'admin';
  const isPatient = user?.role === 'patient';
  const isDoctor = user?.role === 'doctor';

  // ! --- itemList ------------------------
  // TODO can move itemsList to seperate component
  let itemsList;
  if (isAdmin) {
    itemsList = [
      [
        {
          text: 'Profile',
          icon: <ManageAccountsIcon fontSize='large' color='secondary.main' />,
          onClick: () => {
            navigate('/profile'), setOpen(false);
          },
        },
        {
          text: 'Change Password',
          icon: <LockResetIcon fontSize='large' color='secondary.main' />,
          onClick: () => {
            navigate('/changePassword'), setOpen(false);
          },
        },
        {
          text: 'Users',
          icon: <GroupIcon fontSize='large' color='red' />,
          onClick: () => {
            navigate('/users'), setOpen(false);
          },
        },
      ],
      [
        {
          text: 'Doctors',
          icon: <img src={doctors} alt='doctors' className='sidebar-icon' />,
          onClick: () => {
            navigate('/users'), setOpen(false);
          },
        },
        {
          text: 'Appointments',
          icon: <CalendarMonthIcon fontSize='large' />,
          onClick: () => {
            navigate('/users'), setOpen(false);
          },
        },
        {
          text: 'Add Doctor',
          icon: <GroupAddIcon fontSize='large' />,
          onClick: () => {
            navigate('/users'), setOpen(false);
          },
        },
        {
          text: 'Set Working Time',
          icon: <HistoryToggleOffIcon fontSize='large' />,
          onClick: () => {
            navigate('/users'), setOpen(false);
          },
        },
      ],
    ];
  } else if (isDoctor) {
    itemsList = [
      [
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
      ],
    ];
  } else if (isPatient) {
    itemsList = [
      [
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
      ],
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
  // ! ---- Logout function -----------------
  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <>
        <Drawer anchor='left' open={open} onClose={handleClose}>
          <Box
            sx={{
              height: '16%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Avatar
              alt='userPhoto'
              src={user?.photo}
              sx={{ width: 56, height: 56 }}
            />
            <Box sx={{ width: '40%', textAlign: 'center' }}>
              <Typography
                variant='h5'
                sx={{ color: 'menu.main', fontWeight: '700', p: '0.4em' }}
              >
                {user?.name}
              </Typography>
              {/* <Divider /> */}
              <Typography
                variant='h6'
                sx={{
                  color: 'red',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isAdmin ? <AdminPanelSettingsIcon fontSize='large' /> : ''}
                {isDoctor ? <AssignmentIndIcon fontSize='large' /> : ''}
                {isPatient ? <PersonIcon fontSize='large' /> : ''}
                {user?.role}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <div style={{ width: 250 }}>
            <List>
              {itemsList[0]?.map((item, index) => {
                const { text, icon, onClick } = item;
                return (
                  <ListItem key={text} onClick={onClick}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
              })}
            </List>
            <Divider />
            <List>
              {itemsList[1]?.map((item, index) => {
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
