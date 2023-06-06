import { Box, List, ListItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getSender } from '../../config/chatLogic';

function RecentChats() {
  const { chats, isLoading } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  return (
    <Box>
      {!isLoading && chats.length !== 0 ? (
        <>
          {
            <List>
              {chats?.map((chat, index) => (
                <ListItem
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
                          ? chat?.latestMessage?.content
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
