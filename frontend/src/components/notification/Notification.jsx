import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { FaUserTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  RESET,
  sendVerificationEmail,
} from '../../redux/features/auth/authSlice';

const Notification = () => {
  const dispatch = useDispatch();

  const sendVerEmail = async () => {
    await dispatch(sendVerificationEmail());
    await dispatch(RESET());
  };

  return (
    <Box sx={{ maxWidth: '40rem', m: '1em auto' }}>
      <Box
        sx={{
          bgcolor: 'third.main',
          p: '1em 1.4em',
          textAlign: 'center',
          borderRadius: '10px',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <FaUserTimes color='red' fontSize={24} />
          <Typography
            variant='h4'
            sx={{ fontWeight: 700, color: 'red', m: '0.4em' }}
          >
            Account needs to verify
          </Typography>
        </Stack>
        <Typography variant='body1'>
          To verify your account, check your email for a verification link
        </Typography>
        <Typography variant='h5' sx={{ color: 'primary.main' }} onClick={sendVerEmail}>
          <b>Resend Link</b>
        </Typography>
      </Box>
    </Box>
  );
};

export default Notification;
