import {Box, CardMedia, Grid, Typography} from '@mui/material';
import Card from '@mui/material/Card';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {selectorDoctors} from '../../../redux/features/auth/filterSlice';
import {getDoctors} from '../../../redux/features/booking/bookingSlice';
import Loader from '../../loader/Loader';
import CardContentDetails from './CardContentDetails';
// import './DoctorList.css';

function DoctorList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, doctors } = useSelector((state) => state.booking);
  const filteredDoctors = useSelector(selectorDoctors);

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
              <Grid item xs={12} sm={12} md={6} key={doctor._id}>
                <Card
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    bgcolor: 'fourth.lighter',
                    maxHeight: '24rem',
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
                    <CardContentDetails doctor={doctor} />
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
