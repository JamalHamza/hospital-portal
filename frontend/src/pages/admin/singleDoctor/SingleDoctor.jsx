import { Grid } from '@mui/material';
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
  // ! -----------
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
          <Grid container sx={{ mt: '1em' }}>
            <Workday doctor={doctor} />
            <WorkTime doctor={doctor} />
          </Grid>
        </FormWrapper>
      )}
    </>
  );
}

export default SingleDoctor;
