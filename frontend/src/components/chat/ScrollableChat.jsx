import { Avatar, Box, Grid, Tooltip, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbar } from 'react-scrollbars-custom';
import {
  getSender,
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from '../../config/chatLogic';
import { getMessages } from '../../redux/features/chat/chatSlice';

function ScrollableChat() {
  const { selectedChat, messages, isLoading } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // ! ------------------------------
  useEffect(() => {
    if (selectedChat) {
      const userData = {
        chatId: selectedChat?._id,
      };
      dispatch(getMessages(userData));
    }
  }, [dispatch, selectedChat]);
  // ! ------------------------------
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
          {selectedChat && getSender(user, selectedChat?.users)}
        </Typography>
      </Grid>

      <Box sx={{ width: '100%', height: '100%', p: '1em 1em', pb: '4em' }}>
        {messages && !isLoading ? (
          <>
            {' '}
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              {messages &&
                messages?.map((m, i) => (
                  <div style={{ display: 'flex' }} key={m._id}>
                    {(isSameSender(messages, m, i, user?._id) ||
                      isLastMessage(messages, i, user?._id)) && (
                      <Tooltip label={m.sender.name} hasArrow>
                        <Avatar
                          mt='12px'
                          mr='1em'
                          cursor='pointer'
                          name={m.sender.name}
                          src={m.sender.photo}
                        />
                      </Tooltip>
                    )}
                    <span
                      style={{
                        backgroundColor: `${
                          m.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'
                        }`,
                        marginLeft: isSameSenderMargin(
                          messages,
                          m,
                          i,
                          user._id
                        ),
                        marginTop: isSameUser(messages, m, i, user._id)
                          ? 3
                          : 10,
                        borderRadius: '20px',
                        padding: '5px 15px',
                        maxWidth: '75%',
                      }}
                    >
                      {m.content}
                    </span>
                  </div>
                ))}
            </Scrollbar>
          </>
        ) : (
          'asdf'
        )}
      </Box>
    </Grid>
  );
}

export default ScrollableChat;
