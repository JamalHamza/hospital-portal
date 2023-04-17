import EmailIcon from '@mui/icons-material/Email';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDoctors } from '../../../redux/features/booking/bookingSlice';
import Loader from '../../loader/Loader';
import './DoctorList.css';

function DoctorList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, doctors } = useSelector((state) => state.booking);
  const handleClick = (id) => {
    navigate(`/admin/doctors/${id}`);
  };
  //  ! -------------
  useEffect(() => {
    dispatch(getDoctors());
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <Grid container spacing={2}>
        {doctors.map((doctor) => {
          return (
            <Grid item xs={12} sm={6} md={6} key={doctor._id}>
              <Card
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  bgcolor: 'fourth.light',
                  maxHeight: '17rem',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '60%',
                    height: '100%',
                  }}
                >
                  <CardContent
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '0.5em',
                    }}
                  >
                    <Typography
                      variant='h5'
                      sx={{
                        color: 'primary.dark',
                        fontWeight: '700',
                        letterSpacing: '1px',
                      }}
                    >
                      {doctor.name}
                    </Typography>
                    <Typography
                      variant='body1'
                      color='text.primary'
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'secondary.dark',
                      }}
                    >
                      <EmailIcon
                        fontSize='medium'
                        sx={{ color: 'primary.dark', mr: '0.2em' }}
                      />
                      {doctor?.email}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='text.primary'
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'secondary.dark',
                      }}
                    >
                      <LocalHospitalIcon
                        fontSize='medium'
                        sx={{ color: 'primary.dark', mr: '0.2em' }}
                      />
                      {doctor?.specialist}
                    </Typography>
                    <Button
                      onClick={() => handleClick(doctor._id)}
                      variant='contained'
                      sx={{
                        mt: '2em',
                        bgcolor: 'third.main',
                        padding: '0.4em 0.5em',
                        fontWeight: 800,
                        fontSize: '1rem',
                        color: 'primary.dark',
                        '&:hover': {
                          background: '#ccb7c0',
                        },
                      }}
                    >
                      Explore Details
                    </Button>
                  </CardContent>
                </Box>
                <CardMedia
                  component='img'
                  sx={{ width: '40%', height: '100%' }}
                  image={doctor?.photo}
                  alt='doctor-photo'
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
export default DoctorList;
