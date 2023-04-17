import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

function WorkTime() {
  return (
    <Grid item xs={12} md={6} sx={{ border: '1px solid red' }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <AccessTimeIcon sx={{ color: 'secondary.dark', fontSize: '3rem', mr: '0.5em' }} />
        <Typography variant='h4' sx={{ color: 'primary.dark' }}>
          Working Date
        </Typography>
      </Box>
    </Grid>
  );
}

export default WorkTime;
