import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import loginImg from '../../assets/HomePageLogo.png';
import {
  CustomButtonOne,
  CustomButtonTwo,
} from '../../components/customUtils/customButtons/CustomButtonOne';
import './Home.scss';

function Home() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <Box sx={{ bgcolor: 'secondary.main', minHeight: '100vh' }}>
      <Box className='container hero'>
        <div className='hero-text'>
          <h1>{t('home.title')}</h1>
          <p>{t('home.desc')}</p>
          <div>
            <CustomButtonTwo
              onClick={() => navigate('/register')}
              label={t('button.login')}
            />

            <CustomButtonOne
              onClick={() => navigate('/login')}
              label={t('button.register')}
            />
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
