import WavingHandIcon from '@mui/icons-material/WavingHand';
import { Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HistoryImg from '../../assets/patient/history.png';
import MainAppointmentsInfo from '../../components/doctor/appointments/mainInfoTable';
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
  console.log(appointments);

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
      <Grid container border='1px solid red' mt='2em'>
        <MainAppointmentsInfo />
      </Grid>
    </FormWrapper>
  );
}

export default Appointments;
