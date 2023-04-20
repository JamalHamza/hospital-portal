import { Box, Grid } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteDoctor,
  getDoctors,
} from '../../../../redux/features/booking/bookingSlice';
import './PersonalInfo.css';
import PersonalInfoAvatar from './personalInfoAvatar/PersonalInfoAvatar';
import PersonalInfoBody from './personalInfoBody/PersonalInfoBody';

function PersonalInfo(props) {
  const { doctor } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const formatedDate = moment.utc(doctor?.createdAt).format('YYYY-MM-DD');
  // ! Count Doctor experinces from array
  const experienceDoctor = doctor?.experiences?.reduce((total, exp) => {
    return total + exp.years;
  }, 0);

  const handleDelete = (id) => {
    dispatch(deleteDoctor(id));
    dispatch(getDoctors());
    navigate('/admin/doctors');
  };

  return (
    <>
      <Box>
        <Grid container>
          <PersonalInfoAvatar
            doctor={doctor}
            formatedDate={formatedDate}
            handleDelete={handleDelete}
            doctorId={id}
          />
          <PersonalInfoBody
            doctor={doctor}
            experienceDoctor={experienceDoctor}
          />
        </Grid>
      </Box>
    </>
  );
}
export default PersonalInfo;
