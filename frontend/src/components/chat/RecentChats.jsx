import { Box, List, ListItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSender } from '../../config/chatLogic';
import { setSelectedChat } from '../../redux/features/chat/chatSlice';

function RecentChats() {
  const { chats, isLoading } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Box>
      {!isLoading && chats.length !== 0 ? (
        <>
          {
            <List>
              {chats?.map((chat, index) => (
                <ListItem
                  onClick={() => dispatch(setSelectedChat(chat))}
                  key={chat._id}
                  sx={{
                    minHeight: '6rem',
                    bgcolor: 'third.light',
                    borderBottom: '1px solid',
                    borderColor: 'third.dark',
                  }}
                >
                  <Stack>
                    <Typography
                      variant='h5'
                      color='primary.main'
                      fontWeight='700'
                    >
                      {getSender(user, chat.users)}
                    </Typography>
                    <Stack>
                      <Typography variant='body1' color='primary.dark'>
                        {chat?.latestMessage
                          ? (chat?.latestMessage?.content).substring(0, 30) +
                            '...'
                          : 'Chat is empty'}
                      </Typography>
                    </Stack>
                  </Stack>
                </ListItem>
              ))}
            </List>
           
          }
        </>
      ) : (
        <Typography textAlign='center'>Loading...</Typography>
      )}
    </Box>
  );
}

export default RecentChats;
