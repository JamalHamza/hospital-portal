import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
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
import React from 'react';
import '../Doctor.css';

function WorkTime(props) {
  const { doctor } = props;

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
          <AccessTimeIcon
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
          ml: '4px',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{doctor?.startTime}</TableCell>
                <TableCell>{doctor?.endTime}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}

export default WorkTime;
