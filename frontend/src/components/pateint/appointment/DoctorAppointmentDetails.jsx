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

function DoctorAppointmentDetails({ doctor }) {
  console.log(doctor);
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Box sx={{ width: '90%', m: '0 auto' }}>
        <TableContainer>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={styleHeader}>Doctor</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={style}>Name</TableCell>
                <TableCell sx={styleDetail}>{doctor?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={style}>Email</TableCell>
                <TableCell sx={styleDetail}>{doctor?.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={style}>Phone</TableCell>
                <TableCell sx={styleDetail}>{doctor?.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={style}>Specialist</TableCell>
                <TableCell sx={styleDetail}>{doctor?.specialist}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={style}>Fee</TableCell>
                <TableCell sx={styleDetail}>{doctor?.fee}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}

export default DoctorAppointmentDetails;
