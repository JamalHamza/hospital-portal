import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Appointment from '../../../assets/doctor/user.png';
import AppointmentBookedDetails from '../../../components/doctor/appointmentsDetails/AppointmentBookedDetails';
import File from '../../../components/doctor/appointmentsDetails/File';
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
      <Grid container columnGap={2} rowGap={2}>
        <PatientDetails patient={appointment?.user} />
        <AppointmentBookedDetails appointment={appointment?.appointment} />
        <File  />
      </Grid>
    </FormWrapper>
  );
}

export default AppointmentDetails;
