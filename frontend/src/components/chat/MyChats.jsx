import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import SearchDrawer from './SearchDrawer';

const MyChats = () => {
  const { doctors } = useSelector((state) => state.chat);
  return (
    <Grid container>
      <Grid item xs={12}>
        <SearchDrawer />
      </Grid>
    </Grid>
  );
};

export default MyChats;
