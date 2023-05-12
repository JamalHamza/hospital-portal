import { Grid, Typography } from '@mui/material';
import React from 'react';

const styleHeader = {
  color: 'secondary.dark',
  textAlign: 'left',
  fontSize: '2rem',
  fontWeight: '700',
};

const style = {
  color: 'secondary.dark',
  textAlign: 'left',
  fontSize: '2rem',
  fontWeight: '600',
};
const styleDetail = {
  color: 'primary.main',
  textAlign: 'left',
  fontSize: '2rem',
  fontWeight: '700',
  ml: '0.6em',
};

const styleBoxes = {
  total: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'primary.light',
    borderRadius: '10px',
    m: '2px',
  },
  upcoming: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'secondary.light',
    borderRadius: '10px',
    m: '2px',
  },
  archived: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'third.light',
    borderRadius: '10px',
    m: '2px',
  },
  more: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'fourth.light',
    borderRadius: '10px',
    m: '2px',
  },
};

function MainAppointmentsInfo({ appointments }) {
  // ! Today Date
  const todayDate = new Date();
  const futureAppointments = [];
  const pastAppointments = [];
  appointments?.map((appointment) => {
    if (new Date(appointment?.appointmentDate) >= todayDate) {
      futureAppointments.push(appointment);
    } else {
      pastAppointments.push(appointment);
    }
  });

  return (
    <Grid item xs={12} sm={6} md={6}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} minHeight='4rem'>
          <Typography sx={styleHeader}>Appointments Status</Typography>
        </Grid>
        <Grid
          item
          xs={11.5}
          sm={5.5}
          md={5.5}
          sx={styleBoxes.total}
          minHeight='8rem'
        >
          <Typography sx={style}>Total </Typography>
          <Typography sx={styleDetail}>{`${appointments?.length}`}</Typography>
        </Grid>
        <Grid
          item
          xs={11.5}
          sm={5.5}
          md={5.5}
          minHeight='8rem'
          sx={styleBoxes.upcoming}
        >
          <Typography sx={style}>Oncoming </Typography>
          <Typography sx={styleDetail}>{futureAppointments?.length}</Typography>
        </Grid>
        <Grid
          item
          xs={11.5}
          sm={5.5}
          md={5.5}
          minHeight='8rem'
          sx={styleBoxes.archived}
        >
          <Typography sx={style}>Archived </Typography>
          <Typography sx={styleDetail}>${pastAppointments.length}</Typography>
        </Grid>
        <Grid
          item
          xs={11.5}
          sm={5.5}
          md={5.5}
          minHeight='8rem'
          sx={styleBoxes.more}
        >
          <Typography sx={style}>Archived </Typography>
          <Typography sx={styleDetail}>11</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MainAppointmentsInfo;
