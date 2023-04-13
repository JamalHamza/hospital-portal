import { Box, Grid, Typography } from '@mui/material';
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
    handleBlur,
    errors,
    touched,
    handleFieldChange,
    handleFieldChangeEnd,
  } = props;

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
          Workday & Work hours
        </Typography>
      </Box>
      <Grid container spacing={2} gap='0.4rem'>
        <Grid item xs={12} md={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ width: '100%' }}>
              <DatePicker
                label='Start Date'
                name='startDate'
                inputFormat='DD/MM/YYYY'
                value={values.startDate}
                onChange={handleFieldChange('startDate')}
                onBlur={handleBlur}
                error={touched.startDate && Boolean(errors.startDate)}
                helperText={touched.startDate && errors.startDate}
                sx={{ width: '100%', m: '4px' }}
              />
              <Typography sx={{ color: '#D62F8D', ml: '1.6rem' }}>
                {errors.startDate && touched.startDate ? (
                  <>{errors.startDate}</>
                ) : null}
              </Typography>
            </Box>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ width: '100%' }}>
              <DatePicker
                label='End Date'
                name='endDate'
                inputFormat='DD/MM/YYYY'
                value={values.endDate}
                onChange={handleFieldChangeEnd('endDate')}
                onBlur={handleBlur}
                error={touched.endDate && Boolean(errors.endDate)}
                helperText={touched.endDate && errors.endDate}
                sx={{ width: '100%', m: '4px' }}
              />
              <Typography sx={{ color: '#D62F8D', ml: '1.6rem' }}>
                {errors.endDate && touched.endDate ? (
                  <>{errors.endDate}</>
                ) : null}
              </Typography>
            </Box>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  );
}

export default DatePickerForm;
