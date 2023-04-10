import React from 'react';
import DatePickerDoc from '../../components/dateRangePicker/DatePicker';
import TimePickerDoc from '../../components/timeRangePicker/TimePicker';
import {Box} from '@mui/material';

function AddDoctor() {
  return (
    <div>
      <Box
        sx={{
          bgcolor: 'form.main',
          width: '94vw',
          m: '2em auto',
          p: '2em 3em',
          borderRadius: '10px',
        }}
      >
        <DatePickerDoc />
        <TimePickerDoc />
      </Box>
    </div>
  );
}

export default AddDoctor;
