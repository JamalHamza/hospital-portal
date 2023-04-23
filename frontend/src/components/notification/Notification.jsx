import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { FaUserTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  RESET,
  sendVerificationEmail,
} from '../../redux/features/auth/authSlice';

const Notification = () => {
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);

  const sendVerEmail = async () => {
    await dispatch(sendVerificationEmail());
    await dispatch(RESET());
  };

  useEffect(() => {
    setTimeout(() => {
      setHide(true);
    }, 2000);
  }, []);

  return (
    <Box sx={{ maxWidth: '38rem', m: '1em auto' }}>
      {hide && (
        <Box
          sx={{
            bgcolor: 'third.main',
            p: '1em 1.4em',
            m: '0.3em',
            textAlign: 'center',
            borderRadius: '10px',
          }}
        >
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
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
          <Button onClick={sendVerEmail}>
            <Typography
              variant='h4'
              sx={{
                bgcolor: 'primary.main',
                padding: '0.4em 1em',
                fontWeight: 700,
                fontSize: '1rem',
                borderRadius: '4px',
                color: 'red',
                '&:hover': {
                  background: '#ccb7c0',
                },
              }}
            >
              Resend Link
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Notification;
