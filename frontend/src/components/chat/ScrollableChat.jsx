import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getSender } from '../../config/chatLogic';
import { Scrollbar } from 'react-scrollbars-custom';

function ScrollableChat() {
  const { selectedChat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  return (
    <Grid container height='100%'>
      <Grid
        item
        xs={12}
        sx={{
          boxShadow: '1',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          maxHeight: '3.5rem',
        }}
      >
        <Typography
          variant='h4'
          sx={{
            fontWeight: '700',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            p: '0.2em',
          }}
        >
          {getSender(user, selectedChat.users)}
        </Typography>
      </Grid>

      <Box sx={{ width: '100%', height: '100%', p:'1em 1em', pb: '4em' }} >
        <Scrollbar style={{ width: '100%', height: '100%' }}>
         
          sfsfasdfasfasf
          Elit Lorem do ea voluptate ad sint dolore labore ut quis mollit labore ut excepteur. Enim mollit ut id consequat dolore reprehenderit est. Eiusmod voluptate sunt eiusmod eiusmod elit ut deserunt labore quis eu labore ex enim. Ullamco nostrud enim reprehenderit nostrud aliqua.
          nt labore quis eu labore ex enim. Ullamco nostrud enim reprehenderit nostrud aliqua.
          sfsfasdfasfasf
         
         
          Elit Lorem do ea voluptate ad sint dolore labore ut quis mollit labore ut excepteur. Enim mollit ut id consequat dolore reprehenderit est. Eiusmod voluptate sunt eiusmod eiusmod elit ut deserunt labore quis eu labore ex enim. Ullamco nostrud enim reprehenderit nostrud labore ut excepteur. Enim mollit ut id consequat dolore reprehenderit est. Eiusmod voluptate sunt eiusmod eiusmod elit ut deserunt labore quis eu labore ex enim. Ullamco nostrud enim reprehenderit nostrud aliqua.
          sfsfasdfasfasf
          Elit Lorem do ea voluptate ad sint dolore labore ut quis mollit labore ut excepteur. Enim mollit ut id consequat dolore reprehenderit est. Eiusmod voluptate sunt eiusmod eiusmod elit ut deserunt labore quis eu labore ex enim. Ullamco nostrud enim reprehenderit nostrud aliqua.
          nt labore quis eu labore ex enim. Ullamco nostrud enim reprehenderit nostrud aliqua.
          sfsfasdfasfasf
          Elit Lorem do ea voluptate ad sint dolore labore ut quis mollit labore ut excepteur. Enim mollit ut id consequat dolore reprehenderit est. Eiusmod voluptate sunt eiusmod eiusmod elit ut deserunt labore quis eu labore ex enim. Ullamco nostrud enim reprehenderit nostrud labore ut excepteur. Enim mollit ut id consequat dolore reprehenderit est. Eiusmod voluptate sunt eiusmod eiusmod elit ut deserunt labore quis eu labore ex enim. Ullamco nostrud enim reprehenderit nostrud aliqua.
          sfsfasdfasfasf
          Elit Lorem do ea voluptate ad sint dolore labore ut quis mollit labore ut excepteur. Enim mollit ut id consequat dolore reprehenderit est. Eiusmod voluptate sunt eiusmod eiusmod elit ut deserunt labore quis eu labore ex enim. Ullamco nostrud enim reprehenderit nostrud aliqua.
        </Scrollbar>
      </Box>
    </Grid>
  );
}

export default ScrollableChat;
