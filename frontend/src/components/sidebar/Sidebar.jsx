import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LockResetIcon from '@mui/icons-material/LockReset';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import UpdateIcon from '@mui/icons-material/Update';
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
          icon: (
            <ManageAccountsIcon
              fontSize='large'
              sx={{ color: 'primary.light' }}
            />
          ),
          onClick: () => {
            navigate('/profile'), setOpen(false);
          },
        },
        {
          text: 'Change Password',
          icon: (
            <LockResetIcon fontSize='large' sx={{ color: 'primary.light' }} />
          ),
          onClick: () => {
            navigate('/changePassword'), setOpen(false);
          },
        },
        {
          text: 'Users',
          icon: <GroupIcon fontSize='large' sx={{ color: 'primary.light' }} />,
          onClick: () => {
            navigate('/users'), setOpen(false);
          },
        },
      ],
      [
        {
          text: 'Add Doctor',
          icon: (
            <GroupAddIcon fontSize='large' sx={{ color: 'primary.light' }} />
          ),
          onClick: () => {
            navigate('/admin/addDoctor'), setOpen(false);
          },
        },
        {
          text: 'Doctors',
          icon: (
            <Diversity1Icon fontSize='large' sx={{ color: 'primary.light' }} />
          ),
          onClick: () => {
            navigate('/admin/doctors'), setOpen(false);
          },
        },
      ],
    ];
  } else if (isDoctor) {
    itemsList = [
      [
        {
          text: 'Profile',
          icon: (
            <ManageAccountsIcon
              fontSize='large'
              sx={{ color: 'primary.light' }}
            />
          ),
          onClick: () => {
            navigate('/profile'), setOpen(false);
          },
        },
        {
          text: 'Change Password',
          icon: (
            <LockResetIcon fontSize='large' sx={{ color: 'primary.light' }} />
          ),
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
          icon: (
            <ManageAccountsIcon
              fontSize='large'
              sx={{ color: 'primary.light' }}
            />
          ),
          onClick: () => {
            navigate('/profile'), setOpen(false);
          },
        },
        {
          text: 'Change Password',
          icon: (
            <LockResetIcon fontSize='large' sx={{ color: 'primary.light' }} />
          ),
          onClick: () => {
            navigate('/changePassword'), setOpen(false);
          },
        },
      ],
      [
        {
          text: 'Doctors',
          icon: (
            <ManageAccountsIcon
              fontSize='large'
              sx={{ color: 'primary.light' }}
            />
          ),
          onClick: () => {
            navigate('/patient/allDoctors'), setOpen(false);
          },
        },
        {
          text: 'History',
          icon: <UpdateIcon fontSize='large' sx={{ color: 'primary.light' }} />,
          onClick: () => {
            navigate('/patient/historyApp'), setOpen(false);
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
              variant='h6'
              sx={{ color: 'form.main', fontWeight: '700', p: '0.2em' }}
            >
              {user?.name}
            </Typography>
            <Typography
              variant='h6'
              sx={{
                color: 'third.dark',
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
        <Divider sx={{ bgcolor: 'primary.main' }} />
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
          <Divider sx={{ bgcolor: 'primary.main' }} />
          <List>
            {/* {itemsList[1] && isAdmin && (
              <Typography variant='h5' sx={{ color: 'secondary.main', m: '0.2em 1.2em', fontWeight: '700' }}>
                Doctor
              </Typography>
            )} */}
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
