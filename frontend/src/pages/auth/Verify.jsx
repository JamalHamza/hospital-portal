import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RESET, verifyUser } from '../../redux/features/auth/authSlice';

function Verify() {
  const dispatch = useDispatch();
  const { verificationToken } = useParams();
  // console.log(verificationToken);

  const verifyUserAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
  };

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        p: '2em 1em',
        m: '4em auto',
        maxWidth: '36rem',
        textAlign: 'center',
        borderRadius: '10px',
      }}
    >
        <Typography
          variant='h4'
          sx={{ textAlign: 'center', color: 'btn.main' }}
        >
          Account Verification
        </Typography>
        <Typography variant='h6' sx={{ color: 'btnAlert.main' }}>
          To verify your account, click the button below...
        </Typography>
        <br />
        <Button
          variant='contained'
          onClick={verifyUserAccount}
          sx={{
            color: 'btnAlert.main',
            fontWeight: 800,
            bgcolor: 'third.main',
            '&:hover': {
              background: '#ccb7c0',
            },
          }}
        >
          Verify Account
        </Button>
    </Box>
  );
}

export default Verify;
