import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import * as React from 'react';

export default function ResponsiveTimePickers() {
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
        <DemoItem label='Start'>
          <MobileTimePicker
            value={startTime}
            onChange={handleStartTimeChange}
            minutesStep={30}
            ampm={false}
          />
          {startTime && <div>{`${startTime.format('HH:mm')}`}</div>}
        </DemoItem>
        <DemoItem label='End'>
          <MobileTimePicker
            value={endTime}
            onChange={handleEndTimeChange}
            minutesStep={30}
            ampm={false}
          />
          {endTime && <div>{`${endTime.format('HH:mm')}`}</div>}
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
