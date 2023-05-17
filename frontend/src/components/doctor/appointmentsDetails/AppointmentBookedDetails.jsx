import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
const styleHeader = {
  color: 'secondary.dark',
  textAlign: 'left',
  fontSize: '1.6rem',
  fontWeight: '700',
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

function AppointmentBookedDetails({ appointment }) {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      bgcolor='fourth.light'
      borderRadius='10px'
    >
      <TableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={styleHeader}>Appointment's Details</TableCell>
              <TableCell sx={styleHeader}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={style}>Appointment's ID</TableCell>
              <TableCell sx={styleDetail}>{appointment?._id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={style}>Booked Date</TableCell>
              <TableCell sx={styleDetail}>
                {new Date(appointment?.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={style}>Booked Time</TableCell>
              <TableCell sx={styleDetail}>
                {new Date(appointment?.createdAt).toLocaleTimeString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={style}>Appointment Date</TableCell>
              <TableCell sx={styleDetail}>
                {new Date(appointment?.appointmentDate).toDateString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={style}>Appointment Time</TableCell>
              <TableCell sx={styleDetail}>
                {new Date(appointment?.appointmentTime).toLocaleTimeString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default AppointmentBookedDetails;
