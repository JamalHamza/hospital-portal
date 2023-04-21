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
import { selectorDoctors } from '../../../redux/features/auth/filterSlice';
import { getDoctors } from '../../../redux/features/booking/bookingSlice';
import Loader from '../../loader/Loader';
import './DoctorList.css';

function DoctorList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, doctors } = useSelector((state) => state.booking);
  const filteredDoctors = useSelector(selectorDoctors);
  console.log(filteredDoctors);
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
        {!isLoading && filteredDoctors.length == 0 ? (
          <Typography
            variant='h5'
            sx={{ m: '0 auto', p: '1em', color: 'third.dark' }}
          >
            No Doctor Found
          </Typography>
        ) : (
          filteredDoctors.map((doctor) => {
            return (
              <Grid item xs={12} sm={6} md={6} key={doctor._id}>
                <Card
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    bgcolor: 'fourth.lighter',
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
                          borderRadius: '10px',
                          padding: '6px 16px',
                          fontWeight: 'bold',
                          fontSize: '1.2rem',
                          width: '12rem',
                          color: 'primary.main',
                          bgcolor: 'third.main',
                          textTransform: 'capitalize',
                          m: '1em 0',
                          '&:hover': {
                            backgroundColor: '#ccb7c0',
                            color: '#fff',
                          },
                        }}
                      >
                        More details
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
          })
        )}
      </Grid>
    </>
  );
}
export default DoctorList;
