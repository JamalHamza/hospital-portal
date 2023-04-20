import { Grid } from '@mui/material';
import React from 'react';
import UpdateShift from '../../../assets/admin/calendar.png';
import UpdateShiftForm from '../../../components/doctors/doctor/updateShift/updateShiftForm/UpdateShiftForm';
import UpdateShiftSidebar from '../../../components/doctors/doctor/updateShift/updateShiftSidebar/UpdateShiftSidebar';
import FormWrapper from '../../../components/formWrapper/FormWrapper';

function UpdateDoctorShift() {
  return (
    <FormWrapper
      title={'Update Doctor Workday'}
      img={UpdateShift}
      altImg={'Update Doctor Workday'}
    >
      <Grid container>
        <UpdateShiftSidebar />
        <UpdateShiftForm />
      </Grid>
    </FormWrapper>
  );
}

export default UpdateDoctorShift;
