import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import loginImg from '../../assets/HomePageLogo.png';
import './Home.scss';

function Home() {
  return (
    <Box sx={{ bgcolor: 'secondary.main' }}>
      <Box className='container hero'>
        <div className='hero-text'>
          <h1>Vita Health Center</h1>
          <p>Instant appointment with doctors-Guaranteed.</p>
          <p>
            100% Safe Consultations Be assured that your online consultation
            will be fully private and secured.
          </p>
          <div className='hero-buttons --flex-start'>
            <Button
              sx={{
                bgcolor: 'third.main',
                padding: '1em 1.8em',
                marginRight: '1em',
                '&:hover': {
                  background: '#ffeff6',
                },
              }}
            >
              <Link to='/register'>
                <Typography variant='h5' sx={{ color: 'btn.main' }}>
                  Register
                </Typography>
              </Link>
            </Button>
            <Button
              sx={{
                bgcolor: 'fourth.main',
                padding: '1em 1.8em',
                marginRight: '1em',
                '&:hover': {
                  background: '#fffaea',
                },
              }}
            >
              <Link to='/login'>
                <Typography variant='h5' sx={{ color: 'btn.main' }}>
                  Login
                </Typography>
              </Link>
            </Button>
          </div>
        </div>

        <div className='hero-image'>
          <img src={loginImg} alt='Auth' width={100} />
        </div>
      </Box>
    </Box>
  );
}

export default Home;
