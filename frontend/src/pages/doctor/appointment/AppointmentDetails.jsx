import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Appointment from '../../../assets/doctor/user.png';
import PatientDetails from '../../../components/doctor/appointmentsDetails/PatientDetails';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import { getAppointmentDoctor } from '../../../redux/features/booking/bookingSlice';

function AppointmentDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { appointment } = useSelector((state) => state.booking);
  console.log(appointment);

  useEffect(() => {
    if (user) {
      const userData = {
        id,
        doctorId: user?._id,
      };
      dispatch(getAppointmentDoctor(userData));
    }
  }, [dispatch, user]);

  return (
    <FormWrapper
      title={'Appointment'}
      img={Appointment}
      altImg={'Your Appointment History'}
    >
      <Grid container>
        <PatientDetails patient={appointment?.user} />
        <Grid item xs={12} sm={12} md={6} border='1px solid blue'>
          sadffsd
        </Grid>
      </Grid>
    </FormWrapper>
  );
}

export default AppointmentDetails;
