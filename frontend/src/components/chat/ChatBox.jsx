import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../redux/features/chat/chatSlice';
import ScrollableChat from './ScrollableChat';

function ChatBox() {
  const { selectedChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  // ! -------------------------
  useEffect(() => {
    if (selectedChat) {
      try {
        const userData = {
          chatId: selectedChat?._id,
        };
        dispatch(getMessages(userData));
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch]);
  return (
    <>
      {selectedChat ? (
        <ScrollableChat />
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
