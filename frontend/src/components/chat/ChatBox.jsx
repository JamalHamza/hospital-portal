import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../redux/features/chat/chatSlice';

function ChatBox() {
  const { selectedChat, messages } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  console.log(messages);

  const userData = {
    chatId: selectedChat?._id,
  };

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
  }, [dispatch, selectedChat]);
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
