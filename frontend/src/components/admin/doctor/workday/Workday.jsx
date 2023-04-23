import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Doctor.css';

function Workday(props) {
  const { doctor, formattedEndShiftTime, todayDate, formattedStartShiftTime } =
    props;
  const navigate = useNavigate();

  if (formattedEndShiftTime > todayDate) {
    // console.log(false);
  } else {
    // console.log(true);
  }

  return (
    <Grid item xs={12} md={5}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
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
        {/* <Box>
          {formattedEndShiftTime > todayDate ? (
            ''
          ) : (
            <IconButton
              onClick={() =>
                navigate(`/admin/doctors/updateShift/${doctor?._id}`)
              }
            >
              <AddIcon sx={{ fontSize: '3rem', color: 'green' }} />
            </IconButton>
          )}
        </Box> */}
      </Box>
      <Box
        sx={{
          m: '0.8rem',
          border: '1px solid lightgray',
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
                <TableCell>{formattedStartShiftTime}</TableCell>
                <TableCell>{formattedEndShiftTime}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}

export default Workday;
