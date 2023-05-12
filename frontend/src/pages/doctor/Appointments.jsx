import WavingHandIcon from '@mui/icons-material/WavingHand';
import { Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HistoryImg from '../../assets/patient/history.png';
import DoctorInfo from '../../components/doctor/appointments/DoctorInfo';
import MainAppointmentsInfo from '../../components/doctor/appointments/MainAppointmentsInfo';
import FormWrapper from '../../components/formWrapper/FormWrapper';
import { getAppointmentsDoctor } from '../../redux/features/booking/bookingSlice';

const styleText = {
  text: {
    color: 'primary.main',
    fontWeight: 600,
    textAlign: 'center',
    fontSize: '1.7rem',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '2rem',
    color: 'secondary.dark',
    mr: '0.4em',
  },
};

function Appointments() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { appointments } = useSelector((state) => state.booking);

  useEffect(() => {
    const userData = {
      userId: user?._id,
    };
    if (user) {
      dispatch(getAppointmentsDoctor(userData));
    }
  }, [dispatch, user]);

  return (
    <FormWrapper
      title={'Appointments'}
      img={HistoryImg}
      altImg={'Your Appointment History'}
    >
      <Typography sx={styleText.text}>
        <WavingHandIcon sx={styleText.icon} />
        Hello, {user?.name}
      </Typography>
      <Grid container mt='2em' columnGap={2}>
        <DoctorInfo doctor={appointments.doctor} />
        <MainAppointmentsInfo appointments={appointments.appointments} />
      </Grid>
    </FormWrapper>
  );
}

export default Appointments;
