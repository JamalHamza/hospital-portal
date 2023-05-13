import { Grid } from '@mui/material';
import React from 'react';
import Appointment from '../../../assets/doctor/user.png';
import FormWrapper from '../../../components/formWrapper/FormWrapper';

function AppointmentDetails() {
    
  return (
    <FormWrapper
      title={'Appointment'}
      img={Appointment}
      altImg={'Your Appointment History'}
    >
      <Grid container border='1px solid red'>
        <Grid item xs={12} sm={12} md={6} border='1px solid blue'>asdfasdf</Grid>
        <Grid item xs={12} sm={12} md={6} border='1px solid blue'>sadffsd</Grid>
      </Grid>
    </FormWrapper>
  );
}

export default AppointmentDetails;
