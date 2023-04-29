import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

function AppointmentDetails({ appointment }) {
    const styleHeader = {
      color: 'secondary.dark',
      textAlign: 'left',
      fontSize: '2rem',
    };
  const style = {
    color: 'secondary.dark',
    textAlign: 'left',
    fontSize: '1.5rem',
  };
  const styleDetail = {
    color: 'primary.main',
    textAlign: 'left',
    fontSize: '1.5rem',
  };
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Box sx={{ width: '90%', m: '0 auto' }}>
        <TableContainer>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={styleHeader}>Appointment</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={style}>Booked</TableCell>
                <TableCell sx={styleDetail}>{appointment?.createdAt}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={style}>Date</TableCell>
                <TableCell sx={styleDetail}>
                  {appointment?.appointmentDate}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={style}>Time</TableCell>
                <TableCell sx={styleDetail}>
                  {appointment?.appointmentTime}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}

export default AppointmentDetails;
