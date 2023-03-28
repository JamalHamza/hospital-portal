import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Box, Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BodyWrapper from '../../components/bodyWraper/bodyWraper';
import Loader from '../../components/loader/Loader';
import { validateEmail } from '../../redux/features/auth/authServices';
import { forgotPassword, RESET } from '../../redux/features/auth/authSlice';

function Forgot() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  // ! ------ Forgot Function ----------------------
  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error('All fields are required');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter valid email');
    }
    const userData = {
      email,
    };
    await dispatch(forgotPassword(userData));
    await dispatch(RESET(userData));
  };

  // ! ----------------------------------------
  return (
    <BodyWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            maxWidth: '30rem',
            width: '32rem',
            m: '0 auto',
            p: '1em 2em',
            bgcolor: '#fff',
            borderRadius: '10px',
            textAlign: 'center',
          }}
        >
          {/* <Box> */}
          <MdOutlineMarkEmailUnread size={40} color='#00695c' />
          {/* </Box> */}
          <h4>Forgot Password</h4>
          <form
            onSubmit={forgot}
            noValidate
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              type='email'
              placeholder='Your email'
              required
              name='email'
              value={email}
              style={{ margin: '8px', width: '100%' }}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              type='submit'
              variant='contained'
              sx={{
                bgcolor: 'fourth.main',
                margin: '0.8em',
                padding: '0.8em 2em',
                fontWeight: 800,
                fontSize: '1.2rem',
                color: 'primary.dark',
                width: '100%',
                '&:hover': {
                  background: '#ccc6b4',
                },
              }}
            >
              Get Reset Email
            </Button>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0.4em',
              }}
            >
              <Link to='/'>
                <IconButton>
                  <HomeIcon fontSize='large' sx={{ color: 'primary.main' }} />
                </IconButton>
              </Link>

              <Link to='/register'>
                <IconButton>
                  <PersonAddAltIcon
                    fontSize='large'
                    sx={{ color: 'primary.main' }}
                  />
                </IconButton>
              </Link>
              <Link to='/login'>
                <IconButton>
                  <LoginIcon fontSize='large' sx={{ color: 'primary.main' }} />
                </IconButton>
              </Link>
            </Box>
          </form>
        </Box>
      )}
    </BodyWrapper>
  );
}

export default Forgot;
