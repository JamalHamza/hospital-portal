import { Player } from '@lottiefiles/react-lottie-player';
import { Grid } from '@mui/material';
import React from 'react';
import ChatAnimation from '../../animations/ChatAnimation.json';
import ChatBox from '../../components/chat/ChatBox';
import MyChats from '../../components/chat/MyChats';
import FormWrapper from '../../components/formWrapper/FormWrapper';

function Chat() {
  return (
    <FormWrapper>
      <Grid
        container
        display='flex'
        justifyContent='space-between'
      >
        <Grid item xs={12} border='1px solid'>
          <Player
            autoplay
            loop
            src={ChatAnimation}
            style={{ height: '80px' }}
          />
        </Grid>
        <Grid item xs={12} md={3.8} bgcolor='fourth.light' minHeight='65vh'>
          <MyChats />
        </Grid>
        <Grid item xs={12} md={8} border='1px solid red' minHeight='65vh'>
          <ChatBox />
        </Grid>
      </Grid>
    </FormWrapper>
  );
}

export default Chat;
