import { Box, Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import loginImg from '../../assets/HomePageLogo.png';
import './Home.scss';

function Home() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  return (
    <Box sx={{ bgcolor: 'secondary.main', minHeight: '100vh' }}>
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
              onClick={() => navigate('/register')}
              variant='contained'
              sx={{
                borderRadius: '10px',
                padding: '8px 20px',
                fontWeight: 'bold',
                fontSize: '1.4rem',
                minWidth: '8dem',
                color: 'primary.dark',
                bgcolor: 'third.main',
                textTransform: 'uppercase',
                '&:hover': {
                  backgroundColor: '#ccb7c0',
                  color: '#fff',
                },
              }}
            >
              Register
            </Button>
            <Button
              onClick={() => navigate('/login')}
              variant='contained'
              sx={{
                borderRadius: '10px',
                padding: '8px 20px',
                fontWeight: 'bold',
                fontSize: '1.4rem',
                color: 'primary.dark',
                minWidth: '8em',
                bgcolor: 'fourth.main',
                textTransform: 'uppercase',
                ml: '1em',
                '&:hover': {
                  backgroundColor: '#ccc6b4',
                  color: '#fff',
                },
              }}
            >
              Login
            </Button>
          </div>
        </div>

        <div className='hero-image'>
          <img src={loginImg} alt='Auth' />
        </div>
      </Box>
    </Box>
  );
}

export default Home;
