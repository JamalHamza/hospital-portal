import { Box, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import * as React from 'react';

export default function TimePicker(props) {
  const {
    values,
    handleBlur,
    errors,
    touched,
    handleChange,
    handleTimeChange,
  } = props;

  return (
    <>
      <Box
        sx={{
          display: 'felx',
          flexDirection: 'column',
        }}
      >
        <Grid
          container
          spacing={2}
          gap='0.4rem'
          sx={{
            mt: '2em',
            // width: '100%',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={12} md={4}>
              <Box sx={{ width: '100%' }}>
                <MobileTimePicker
                  sx={{ width: '100%', margin: '4px' }}
                  label='Start Time'
                  minutesStep={30}
                  ampm={false}
                  name='startTime'
                  value={values.startTime}
                  onChange={handleTimeChange('startTime')}
                  onBlur={handleBlur}
                  error={touched.startTime && Boolean(errors.startTime)}
                  helperText={touched.startTime && errors.startTime}
                />
                <Typography sx={{ color: '#D62F8D', ml: '1.6rem' }}>
                  {errors.startTime && touched.startTime ? (
                    <>{errors.startTime}</>
                  ) : null}
                </Typography>
              </Box>
              {/* </LocalizationProvider> */}
            </Grid>
            <Grid item xs={12} md={4}>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
              <MobileTimePicker
                sx={{ width: '100%', margin: '4px' }}
                label='End Time'
                minutesStep={30}
                ampm={false}
                name='endTime'
                value={values.endTime}
                onChange={handleTimeChange('endTime')}
                onBlur={handleBlur}
                error={touched.endDate && Boolean(errors.endDate)}
                helperText={touched.endDate && errors.endDate}
              />
              <Typography sx={{ color: '#D62F8D', ml: '1.6rem' }}>
                {errors.endTime && touched.endTime ? (
                  <>{errors.endTime}</>
                ) : null}
              </Typography>
            </Grid>
          </LocalizationProvider>
        </Grid>
      </Box>
    </>
  );
}
