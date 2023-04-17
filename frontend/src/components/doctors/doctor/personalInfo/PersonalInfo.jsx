import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ScienceIcon from '@mui/icons-material/Science';
import StarsIcon from '@mui/icons-material/Stars';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { GoVerified } from 'react-icons/go';
import { RiErrorWarningLine } from 'react-icons/ri';
import './PersonalInfo.css';

function PersonalInfo(props) {
  const { doctor } = props;
  const formatedDate = moment.utc(doctor?.createdAt).format('YYYY-MM-DD');
  // ! experinece
  const experienceDoctor = doctor?.experiences.reduce((total, exp) => {
    return total + exp.years;
  }, 0);
  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={12} md={2.5} sx={{ borderBottom: '1px solid blue' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.4em',
                mb: '1em',
              }}
            >
              <img
                className='doctor-profile-img'
                src={doctor?.photo}
                alt={doctor?.name}
              />
              <Box>
                {doctor?.isVerified ? (
                  <Box
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <GoVerified fontSize={20} color='green' />
                    <Typography variant='h6' sx={{ color: 'green' }}>
                      Verified
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <RiErrorWarningLine fontSize={20} color='red' />
                    <Typography variant='h6' sx={{ color: 'third.dark' }}>
                      Not Verified
                    </Typography>
                  </Box>
                )}
              </Box>
              <Typography
                variant='body1'
                sx={{ color: 'secondary.dark', ml: '1em' }}
              >{`Created at ${formatedDate}`}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={9.5} sx={{ display: 'flex' }}>
            <Grid item xs={12} md={11}>
              <Box p={2}>
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
                    sx={{ ml: '0.5em', color: 'secondary.dark' }}
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
                    {experienceDoctor}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2} md={1} mt={1}>
              <IconButton>
                <AiFillDelete fontSize={24} color='red' />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default PersonalInfo;
