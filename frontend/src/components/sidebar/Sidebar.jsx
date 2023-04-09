import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import LockResetIcon from '@mui/icons-material/LockReset';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import doctors from '../../assets/drawerIcon/medical-assistance.png';
// ! ----------------------------------------
const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // ! --- checking for user Role to show content
  const isAdmin = user?.role === 'admin';
  const isPatient = user?.role === 'patient';
  const isDoctor = user?.role === 'doctor';

  // ! --- itemList ------------------------
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
            navigate('/admin/addDoctor'), setOpen(false);
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
            sx={{ width: 70, height: 70 }}
          />
          <Box sx={{ width: '30%', textAlign: 'center' }}>
            <Typography
              variant='h4'
              sx={{ color: 'menu.main', fontWeight: '700', p: '0.4em' }}
            >
              {user?.name}
            </Typography>
            <Typography
              variant='h5'
              sx={{
                color: 'primay.dark',
                fontWeight: '600',
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
    </Box>
  );
};
export default Sidebar;