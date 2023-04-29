import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import moment from 'moment';
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
  '&:first-child td': { border: 0 },
};
const styleDetail = {
  color: 'primary.main',
  textAlign: 'left',
  fontSize: '1.5rem',
};

const styleButton = {
  color: '#F15A59',
  fontSize: '2rem',
};

function AppointmentDetails({ appointment }) {
  const formattedCratedDate = moment(appointment?.createdAt).fromNow();
  const formattedDate = moment(appointment?.appointmentDate).format('ll');
  const formattedTime = moment(appointment?.appointmentTime).format('HH:mm');
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Box sx={{ width: '90%', m: '0 auto' }}>
        <TableContainer>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={styleHeader}>Appointment</TableCell>
                <TableCell sx={styleHeader}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={style}>
              <TableRow>
                <TableCell sx={style}>Booked</TableCell>
                <TableCell sx={styleDetail}>{formattedCratedDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={style}>Date</TableCell>
                <TableCell sx={styleDetail}>{formattedDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={style}>Time</TableCell>
                <TableCell sx={styleDetail}>{formattedTime}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={style}>Delete</TableCell>
                <TableCell sx={styleDetail}>
                  <IconButton>
                    <DeleteOutlineTwoToneIcon sx={styleButton} />
                  </IconButton>
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
