import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';

function WorkingDayAndTime() {
  return (
    <>
      <Box
        sx={{
          display: 'felx',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant='h5'
          sx={{
            color: 'secondary.dark',
            p: '1.2em 0.2em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontWeight: '700',
          }}
        >
          <BsFillCalendar2WeekFill fontSize={26} />
          Working day & Time
        </Typography>
      </Box>
      <Button
        type='submit'
        variant='contained'
        sx={{
          bgcolor: 'third.main',
          padding: '1.2em 2em',
          fontWeight: 800,
          fontSize: '1.2rem',
          color: 'primary.dark',
          '&:hover': {
            background: '#ccb7c0',
          },
        }}
      >
        Register
      </Button>
    </>
  );
}

export default WorkingDayAndTime;
