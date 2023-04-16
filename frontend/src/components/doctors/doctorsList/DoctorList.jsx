import { Box, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors } from '../../../redux/features/booking/bookingSlice';
import Loader from '../../loader/Loader';

function DoctorList() {
  const dispatch = useDispatch();
  const { isLoading, doctors } = useSelector((state) => state.booking);
  console.log(doctors);

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
                  height: '16rem',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ maxWidth: '12rem', width: '100%' }}>
                    <Typography
                      component='div'
                      variant='h5'
                      sx={{ color: 'primary.dark', fontWeight: '700' }}
                    >
                      {doctor.name}
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      color='text.secondary'
                      component='div'
                    >
                      Mac Miller
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
                  >
                    sfds
                  </Box>
                </Box>
                <CardMedia
                  component='img'
                  sx={{ maxWidth: 151 }}
                  image={doctor?.photo}
                  alt='sdfgfsdgsd'
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
