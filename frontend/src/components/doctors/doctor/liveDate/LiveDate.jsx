import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

function LiveDate() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '1em' }}>
      <Box sx={{ display: 'flex' }}>
        <Typography variant='h5' sx={{ color: 'primary.main' }}>
          Date:
        </Typography>
        <Typography variant='h6' sx={{ color: 'secondary.dark', ml: '0.5em' }}>
          {currentDateTime.toLocaleDateString()}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Typography variant='h5' sx={{ color: 'primary.main' }}>
          Time:
        </Typography>
        <Typography variant='h6' sx={{ color: 'secondary.dark', ml: '0.5em' }}>
          {currentDateTime.toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
}

export default LiveDate;
