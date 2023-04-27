import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function SelectTime() {
  const { id } = useParams();
  const { isLoading, doctor, appointmentBooks } = useSelector(
    (state) => state.booking
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appointmentDate = new Date(appointmentBooks?.appointmentDate);
  const appointmentDateFormatted =
    moment(appointmentDate).format('MMMM Do YYYY');

  const shift = appointmentBooks?.availableTimeSlots;
  console.log(shift);
  const shiftTable = (
    <>
      {shift ? (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Shift</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shift.map((time) => (
                <TableRow key={time}>
                  <TableCell>{time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        'asdf'
      )}
    </>
  );

  // ! ---------------------------------------------------

  return (
    <Grid container sx={{ border: '1px solid red' }}>
      <Grid item xs={12} sm={12} md={12}>
        {appointmentDateFormatted}
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        {shiftTable}
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        sdf
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        sdf
      </Grid>
    </Grid>
  );
}

export default SelectTime;
