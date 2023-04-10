import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import './DataRangePicker.css';

function DateRangePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  console.log(startDate);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <Box
      sx={{
        bgcolor: 'form.main',
        width: '70vw',
        minHeight: '10vh',
        m: '2em auto',
        p: '2em 3em',
        borderRadius: '10px',
      }}
    >
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='Start Date'
            format=''
            value={startDate}
            onChange={handleStartDateChange}
            TextField={(params) => <TextField {...params} />}
          />

          <DatePicker
            label='End Date'
            value={endDate}
            onChange={handleEndDateChange}
            TextField={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </Box>
  );
}

export default DateRangePicker;
