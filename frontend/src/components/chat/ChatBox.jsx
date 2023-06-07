import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../redux/features/chat/chatSlice';
import ScrollableChat from './ScrollableChat';
function ChatBox() {
  const { selectedChat, messages, isLoading } = useSelector(
    (state) => state.chat
  );
  const [newMessage, setNewMessage] = useState('');
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
  }, [dispatch, selectedChat]);

  return (
    <>
      {selectedChat || isLoading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <ScrollableChat messages={messages} />
          <TextField
            label='New Message'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <IconButton>
                    <SendIcon sx={{ color: 'green' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant='outlined'
          />
        </Box>
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
