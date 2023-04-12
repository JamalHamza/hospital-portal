import { Box, Typography } from '@mui/material';
import React from 'react';
// import '../../dateRangePicker/DatePicker.css';
import { LocalizationProvider } from '@mui/x-date-pickers/';
// import { LocalizationProvider } from '@mui/lab/LocalizationProvider/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';
import './DatePickerForm.css';

function DatePickerForm(props) {
  const {
    values,
    startDate,
    endDate,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleFieldChange,
  } = props;
  console.log(values);
  return (
    <>
      <Box
        sx={{
          display: 'felx',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant='h5'
          sx={{
            color: 'secondary.dark',
            p: '1.2em 0.2em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4em',
            ml: '0.4rem',
            fontWeight: '700',
          }}
        >
          <BsFillCalendar2WeekFill fontSize={26} />
          Working day & Time
        </Typography>
      </Box>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='Select a date'
            name='startDate'
            inputFormat='DD/MM/YYYY'
            value={values.startDate}
            onChange={handleFieldChange('startDate')}
            onBlur={handleBlur}
            error={touched.startDate && Boolean(errors.startDate)}
            helperText={touched.startDate && errors.startDate}
          />
          <Typography sx={{ color: '#D62F8D', ml: '1.6rem' }}>
            {errors.startDate && touched.startDate ? (
              <div>{errors.startDate}</div>
            ) : null}
          </Typography>
        </LocalizationProvider>
      </Box>
    </>
  );
}

export default DatePickerForm;
