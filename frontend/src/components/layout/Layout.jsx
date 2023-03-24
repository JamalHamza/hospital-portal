import {Box} from '@mui/material';
import React from 'react';
import Header from '../Header';

function Layout({ children }) {
  return (
    <Box sx={{bgcolor: 'primary.main'}}>
      <Header />
      <div className='--pad' style={{ minHeight: '90vh' }}>
        {children}
      </div>
    </Box>
  );
}

export default Layout;
