import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Box, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PersonalInfo from '../../../components/doctors/doctor/personalInfo/PersonalInfo';
import WorkTime from '../../../components/doctors/doctor/workTime/WorkTime';
import Workday from '../../../components/doctors/doctor/workday/Workday';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import Loader from '../../../components/loader/Loader';
import { getDoctor } from '../../../redux/features/booking/bookingSlice';

function SingleDoctor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, doctor } = useSelector((state) => state.booking);
  //  ! ----------------------
  const today = new Date().toISOString();
  const formatedStartDate = moment.utc(doctor?.startDate).format('YYYY-MM-DD');
  const formatedEndDate = moment.utc(doctor?.endDate).format('YYYY-MM-DD');
  const formatedToday = moment.utc(today).format('YYYY-MM-DD');

  // ! ----------------------
  useEffect(() => {
    dispatch(getDoctor(id));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <FormWrapper>
          <PersonalInfo doctor={doctor} />
          <hr color='#C0DEFF' />
          {formatedEndDate < formatedToday ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <NotificationsActiveIcon
                fontSize='large'
                sx={{ color: 'red', mr: '0.4em' }}
              />
              <Typography variant='h5' color='red'>
                Doctor's work day needs to be renewed!
              </Typography>
            </Box>
          ) : (
            ''
          )}
          <Grid
            container
            sx={{ mt: '1em', display: 'flex', justifyContent: 'space-between' }}
          >
            <Workday
              doctor={doctor}
              formatedEndDate={formatedEndDate}
              formatedToday={formatedToday}
              formatedStartDate={formatedStartDate}
            />
            <WorkTime
              doctor={doctor}
              formatedEndDate={formatedEndDate}
              formatedToday={formatedToday}
              formatedStartDate={formatedStartDate}
            />
          </Grid>
        </FormWrapper>
      )}
    </>
  );
}

export default SingleDoctor;
