import styled from '@emotion/styled';
import EmailIcon from '@mui/icons-material/Email';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Button, CardContent, Typography } from '@mui/material';
import React from 'react';

const style = {
  Box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '0.5em',
  },
};


function CardContentDetails({ doctor, onClick }) {
  return (
    <CardContent sx={style.Box}>
      <Typography variant='h5' sx={style.info}>
        {doctor?.name}
      </Typography>
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'secondary.dark',
        }}
      >
        <EmailIcon
          fontSize='medium'
          sx={{ color: 'primary.dark', mr: '0.2em' }}
        />
        {doctor?.email}
      </Typography>
      <Typography
        variant='body2'
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'secondary.dark',
        }}
      >
        <LocalHospitalIcon
          fontSize='medium'
          sx={{ color: 'primary.dark', mr: '0.2em' }}
        />
        {doctor?.specialist}
      </Typography>
      <Button
        onClick={() => onClick()}
        variant='contained'
        sx={{
          borderRadius: '10px',
          padding: '6px 16px',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          width: '12rem',
          color: 'primary.main',
          bgcolor: 'third.main',
          textTransform: 'capitalize',
          m: '1em 0',
          '&:hover': {
            backgroundColor: '#ccb7c0',
            color: '#fff',
          },
        }}
      >
        More details
      </Button>
    </CardContent>
  );
}

export default CardContentDetails;
