import { Grid } from '@mui/material';
import React from 'react';
import LiveDate from '../../liveDate/LiveDate';

function UpdateShiftSidebar() {
  return (
    <>
      <Grid item xs={12} md={5} sx={{ border: 'red 1px solid' }}>
        <LiveDate />
      </Grid>
    </>
  );
}

export default UpdateShiftSidebar;
