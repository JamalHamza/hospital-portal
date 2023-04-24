import BookmarkAddTwoToneIcon from '@mui/icons-material/BookmarkAddTwoTone';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteDoctor,
  getDoctors,
} from '../../../../redux/features/booking/bookingSlice';
import PersonalInfoAvatar from './personalInfoAvator/PersonalInfoAvatar';
import PersonalInfoBody from './personalInfoBody/PersonalInfoBody';
// import DeleteDoctorModal from '../deleteDoctorModal/DeleteDoctorModal';
// import PersonalInfoBody from './personalInfoBody/PersonalInfoBody';
// import './PersonalInfo.css';

function PersonalInfo(props) {
  const { doctor, todayDate, formattedStartShiftTime, formattedEndShiftTime } =
    props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // ! Count Doctor experiences from array
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
            doctorId={id}
            handleOpen={handleOpen}
          />

          <PersonalInfoBody
            doctor={doctor}
            experienceDoctor={experienceDoctor}
          />
          {/* <DeleteDoctorModal
            open={open}
            handleClose={handleClose}
            handleDelete={handleDelete}
            doctorId={id}
            doctor={doctor}
          /> */}
        </Grid>
        <Grid container>
          <Grid item xs={10} md={10} m='2em auto' textAlign='center'>
            {formattedEndShiftTime > todayDate ? (
              <Box>
                <Typography variant='h5' sx={{ color: 'green' }}>
                  The doctor is currently accepting patients and is available
                  for appointments.
                </Typography>
                <IconButton
                  onClick={() => navigate(`/patient/allDoctors/booking/${id}`)}
                >
                  <BookmarkAddTwoToneIcon
                    color='green'
                    sx={{ fontSize: '3rem', color: 'green' }}
                  />
                </IconButton>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <PriorityHighIcon sx={{ color: 'red', fontSize: '3rem' }} />
                <Typography variant='h5' sx={{ color: 'red' }}>
                  I regret to inform you that the doctor is unavailable at this
                  time.
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default PersonalInfo;
