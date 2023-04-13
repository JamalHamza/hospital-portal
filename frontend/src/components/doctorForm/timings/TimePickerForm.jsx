import { Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import * as React from 'react';

export default function TimePicker() {
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  console.log(startTime);

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['MobileTimePicker']}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <MobileTimePicker
              sx={{ width: '100%',  }}
              style={{ margin: '4px', width: '100%' }}
              label='Start Time'
              value={startTime}
              onChange={handleStartTimeChange}
              minutesStep={30}
              ampm={false}
            />
            {startTime && <div>{`${startTime.format('HH:mm')}`}</div>}
          </Grid>
          <Grid item xs={12} md={4}>
            <MobileTimePicker
              sx={{ width: '100%', margin: '4px' }}
              //   style={{ margin: '4px', width: '100%' }}
              label='End Time'
              value={endTime}
              onChange={handleEndTimeChange}
              minutesStep={30}
              ampm={false}
            />
            {endTime && <div>{`${endTime.format('HH:mm')}`}</div>}
          </Grid>
        </Grid>
      </DemoContainer>
    </LocalizationProvider>
  );
}
