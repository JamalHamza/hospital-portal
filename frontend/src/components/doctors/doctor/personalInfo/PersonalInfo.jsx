import { Box, Grid, IconButton } from '@mui/material';
import React from 'react';
import './PersonalInfo.css';
import { AiFillDelete } from 'react-icons/ai';

function PersonalInfo(props) {
  const { doctor } = props;
  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={12} md={3} sx={{ border: 'red 1px solid' }}>
            <img
              className='doctor-profile-img'
              src={doctor?.photo}
              alt={doctor?.name}
              height={100}
              width={100}
            />
            <Box>{!doctor?.isVerified && 'asdf'}</Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            sx={{ border: 'blue 1px solid', display: 'flex' }}
          >
            <Grid item xs={12} md={11} sx={{ border: 'blue 1px solid' }}>
              <Box>{doctor?.name}</Box>
            </Grid>
            <Grid item xs={12} md={1}>
              <IconButton>
                <AiFillDelete fontSize={30} color='red' />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default PersonalInfo;
