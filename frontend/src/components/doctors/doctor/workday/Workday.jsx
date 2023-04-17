import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';

function Workday(props) {
  const { doctor } = props;
  const today = new Date().toISOString();
  const formatedStartDate = moment.utc(doctor?.startDate).format('YYYY-MM-DD');
  const formatedEndDate = moment.utc(doctor?.endDate).format('YYYY-MM-DD');
  const formatedToday = moment.utc(today).format('YYYY-MM-DD');

  if (formatedEndDate >= formatedToday) {
    console.log(false);
  } else {
    console.log(true);
  }

  return (
    <Grid item xs={12} md={6} sx={{ border: '1px solid red' }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CalendarMonthIcon
          sx={{ color: 'secondary.dark', fontSize: '3rem', mr: '0.5em' }}
        />
        <Typography variant='h4' sx={{ color: 'primary.dark' }}>
          Working Date
        </Typography>
      </Box>
    </Grid>
  );
}

export default Workday;
