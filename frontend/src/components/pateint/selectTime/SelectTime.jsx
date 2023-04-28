import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function SelectTime() {
  const { id } = useParams();
  const [time, setTime] = useState('');
  const { isLoading, doctor, appointmentBooks } = useSelector(
    (state) => state.booking
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (event) => {
    setTime(event.target.value);
  };
  console.log(`'${time}'`);
  // ! --------------------------------------------

  if (time) {
    const timeString = `${time}`;
    const today = new Date();
    const dateString = today.toISOString().substring(0, 10);
    const dateTimeString = `${dateString}T${timeString}:00`;
    const newDateFormatted = new Date(dateTimeString).toISOString();
    console.log(newDateFormatted)
    const addThreeHours = moment.utc(newDateFormatted).add(3, 'hours').format();
    console.log(addThreeHours);
  }

  // ! ---------------------------------------------
  const appointmentDate = new Date(appointmentBooks?.appointmentDate);
  const appointmentDateFormatted =
    moment(appointmentDate).format('MMMM Do YYYY');

  const shift = appointmentBooks?.availableTimeSlots;
  const available = appointmentBooks?.availableTime;
  const booked = appointmentBooks?.bookedTimeSlots;
  // ! --------------------------------------------
  const shiftTable = (
    <>
      <TableContainer>
        <Table
          sx={{
            bgcolor: '#94c2e5',
          }}
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              <TableCell>Shift</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shift?.map((time) => (
              <TableRow key={time}>
                <TableCell>{time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  // ! --------------------------------------------
  const availableTime = (
    <>
      <TableContainer>
        <Table
          sx={{
            textAlign: 'center',
            bgcolor: '#ccffb2',
          }}
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              <TableCell>Available</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {available?.map((time) => (
              <TableRow key={time}>
                <TableCell>{time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
  // ! --------------------------------------------
  const bookedTimes = (
    <>
      <TableContainer>
        <Table
          sx={{
            bgcolor: '#f2c1c1',
          }}
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              <TableCell>Booked</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booked?.map((time) => (
              <TableRow key={time}>
                <TableCell>{time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  // ! ---------------------------------------------------

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Grid container sx={{ width: '80%', m: '0 auto' }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{ fontSize: '2rem', color: 'primary.main', m: '1em' }}
        >
          {appointmentDateFormatted}
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          {shiftTable}
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          {availableTime}
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          {bookedTimes}
        </Grid>
        <Grid item xs={12} sm={6} md={6} my='2em'>
          <FormControl sx={{ width: '60%' }}>
            <InputLabel id='demo-simple-select-label'>Times</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={time}
              label='time'
              onChange={handleChange}
            >
              {available?.map((el) => {
                return (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            type='submit'
            variant='contained'
            sx={{
              borderRadius: '10px',
              padding: '8px 20px',
              fontWeight: 'bold',
              fontSize: '1.4rem',
              color: 'primary.dark',
              minWidth: '8em',
              bgcolor: 'fourth.main',
              textTransform: 'uppercase',
              ml: '5px',
              '&:hover': {
                backgroundColor: '#ccc6b4',
                color: '#fff',
              },
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectTime;
