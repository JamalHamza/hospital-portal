import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, IconButton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import appointmentTime from '../../../assets/patient/booking.png';
import UpdateShiftSidebar from '../../../components/admin/doctor/updateShift/updateShiftSidebar/UpdateShiftSidebar';
import FormWrapper from '../../../components/formWrapper/FormWrapper';

function BookingTime() {
  const { isLoading, doctor } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <FormWrapper
          title={'Select Time'}
          img={appointmentTime}
          altImg={'booking an appointment'}
        >
          <Grid container sx={{ mt: '1em' }}>
            <Grid item xs={12} md={12} sx={{ m: '1em 0' }}>
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{ color: 'third.dark', fontSize: '3rem' }} />
              </IconButton>
            </Grid>
            <UpdateShiftSidebar />
          </Grid>
        </FormWrapper>
      )}
    </>
  );
}

export default BookingTime;
