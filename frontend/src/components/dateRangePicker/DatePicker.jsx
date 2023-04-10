import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import React, { useState } from 'react';
import './DataPicker.css';

function DatePickerDoc() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const formattedStartDate = startDate
    ? moment(startDate).format('DD/MM/YYYY')
    : '';

  const handleStartDateChange = (date, Start) => {
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
          value={startDate}
          onChange={handleStartDateChange}
          disablePast={true}
          TextField={(params) => <TextField {...params} />}
        />

        <DatePicker
          label='End Date'
          value={endDate}
          disablePast={true}
          onChange={handleEndDateChange}
          TextField={(params) => <TextField {...params} />}
        />
        <div>Formatted Start Date: {formattedStartDate}</div>
      </LocalizationProvider>
    </div>
  );
}

export default DatePickerDoc;
