import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ScienceIcon from '@mui/icons-material/Science';
import StarsIcon from '@mui/icons-material/Stars';
import { Box, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteDoctor,
  getDoctors,
} from '../../../../redux/features/booking/bookingSlice';
import LiveDate from '../liveDate/LiveDate';
import './PersonalInfo.css';
import PersonalInfoAvatar from './personalInfoAvatar/PersonalInfoAvatar';

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
          <PersonalInfoAvatar doctor={doctor} formatedDate={formatedDate} />
          {/* -------------Personal InfoBody--------------------- */}
          <Grid item xs={12} sm={6} md={4}>
            {/* ---------------------------------------------- */}
            <Grid item xs={12} sm={12} md={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant='h4'
                  sx={{ color: 'primary.main', fontWeight: '600', mb: '0.5em' }}
                >
                  {doctor?.name}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <EmailIcon fontSize='large' sx={{ color: 'primary.main' }} />
                  <Typography
                    variant='h5'
                    sx={{
                      ml: '0.5em',
                      color: 'secondary.dark',
                    }}
                  >
                    {doctor?.email}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <LocalPhoneIcon
                    fontSize='large'
                    sx={{ color: 'primary.main' }}
                  />
                  <Typography
                    variant='h5'
                    sx={{ ml: '0.5em', color: 'secondary.dark' }}
                  >
                    {doctor?.phone}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <CurrencyRubleIcon
                    fontSize='large'
                    sx={{ color: 'primary.main' }}
                  />
                  <Typography
                    variant='h5'
                    sx={{ ml: '0.5em', color: 'secondary.dark' }}
                  >
                    {doctor?.fee}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <StarsIcon fontSize='large' sx={{ color: 'primary.main' }} />
                  <Typography
                    variant='h5'
                    sx={{ ml: '0.5em', color: 'secondary.dark' }}
                  >
                    {doctor?.specialist}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <ScienceIcon
                    fontSize='large'
                    sx={{ color: 'primary.main' }}
                  />
                  <Typography
                    variant='h5'
                    sx={{
                      ml: '0.5em',
                      color: 'secondary.dark',
                      fontWeight: '700',
                    }}
                  >
                    {experienceDoctor} Years Experience
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <LiveDate />
            </Grid>
          </Grid>
          {/* ------------------------------------------------ */}
        </Grid>
      </Box>
    </>
  );
}
export default PersonalInfo;
