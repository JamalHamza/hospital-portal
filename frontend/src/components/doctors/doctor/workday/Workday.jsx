import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
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
  Typography,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import '../Doctor.css';

function Workday(props) {
  const { doctor } = props;
  const today = new Date().toISOString();
  const formatedStartDate = moment.utc(doctor?.startDate).format('YYYY-MM-DD');
  const formatedEndDate = moment.utc(doctor?.endDate).format('YYYY-MM-DD');
  const formatedToday = moment.utc(today).format('YYYY-MM-DD');

  if (formatedEndDate >= formatedToday) {
    console.log(false);
  } else {
    console.log(true);
  }

  return (
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <CalendarMonthIcon
            sx={{ color: 'secondary.dark', fontSize: '3rem', mr: '0.5em' }}
          />
          <Typography variant='h4' sx={{ color: 'primary.dark' }}>
            Working Date
          </Typography>
        </Box>
        <IconButton>
          <AddIcon sx={{ fontSize: '3rem', color: 'green' }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          mt: '2rem',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{formatedStartDate}</TableCell>
                <TableCell>{formatedEndDate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}

export default Workday;
