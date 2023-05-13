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

const styleText = {
  text: {
    color: 'primary.main',
    fontWeight: 600,
    fontSize: '1.4rem',
  },
};
const styleHeader = {
  color: 'secondary.dark',
  textAlign: 'left',
  fontSize: '2rem',
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

function DoctorInfo({ doctor }) {
  const formattedStartDate = new Date(doctor?.startDate).toLocaleDateString();
  const formattedEndDate = new Date(doctor?.endDate).toLocaleDateString();
  const formattedStartTime = new Date(doctor?.startTime)
    .toLocaleTimeString()
    .slice(0, -6);
  const formattedEndTime = new Date(doctor?.endTime)
    .toLocaleTimeString()
    .slice(0, -6);
  return (
    <Grid item xs={12} sm={11.5} md={5.8}>
      <TableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={styleHeader}>Your Shift</TableCell>
              <TableCell sx={styleHeader}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={style}>Start Date</TableCell>
              <TableCell sx={styleDetail}>{formattedStartDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={style}>End Date</TableCell>
              <TableCell sx={styleDetail}>{formattedEndDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={style}>Start Time</TableCell>
              <TableCell sx={styleDetail}>{formattedStartTime}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={style}>End Time</TableCell>
              <TableCell sx={styleDetail}>{formattedEndTime}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={style}>Fee</TableCell>
              <TableCell sx={styleDetail}>{doctor?.fee}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default DoctorInfo;
