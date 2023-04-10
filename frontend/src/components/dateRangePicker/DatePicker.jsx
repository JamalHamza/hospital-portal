import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import './DataPicker.css';

function DatePickerDoc() {
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
  );
}

export default DatePickerDoc;
