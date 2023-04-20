import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function UpdateShiftForm() {
  const { id } = useParams();
  const { isLoading, doctor } = useSelector((state) => state.booking);
  console.log(doctor);
  return (
    <>
      <Grid item xs={12} md={7} sx={{ border: 'blue 1px solid' }}>
        dsf
      </Grid>
    </>
  );
}

export default UpdateShiftForm;
