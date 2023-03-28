import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Box, IconButton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const FormBottomLinks = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0.4em',
      }}
    >
      <Link to='/'>
        <IconButton>
          <HomeIcon fontSize='large' sx={{ color: 'primary.main' }} />
        </IconButton>
      </Link>

      <Link to='/register'>
        <IconButton>
          <PersonAddAltIcon fontSize='large' sx={{ color: 'primary.main' }} />
        </IconButton>
      </Link>
      <Link to='/login'>
        <IconButton>
          <LoginIcon fontSize='large' sx={{ color: 'primary.main' }} />
        </IconButton>
      </Link>
    </Box>
  );
};

export default FormBottomLinks
