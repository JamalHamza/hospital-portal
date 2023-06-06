import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

function ChatBox() {
  const { selectedChat } = useSelector((state) => state.chat);
  return (
    <>
      {selectedChat ? (
        <>sad</>
      ) : (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='100%'
        >
          <Typography variant='h4' color='fourth.dark'>
            Please Select a chat
          </Typography>
        </Box>
      )}
    </>
  );
}

export default ChatBox;
