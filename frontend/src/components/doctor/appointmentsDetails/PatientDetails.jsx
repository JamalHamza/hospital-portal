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

function PatientDetails({ patient }) {
  return (
    <Grid item xs={12} sm={12} md={12}>
      <Grid container columnGap={2}>
        <Grid
          item
          xs={12}
          sm={5.8}
          md={5.8}
          bgcolor='third.light'
          borderRadius='10px'
        >
          <TableContainer>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell sx={styleHeader}>Patient Medicine Card</TableCell>
                  <TableCell sx={styleHeader}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={style}>Name</TableCell>
                  <TableCell sx={styleDetail}>{patient?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={style}>Phone</TableCell>
                  <TableCell sx={styleDetail}>{patient?.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={style}>Email</TableCell>
                  <TableCell sx={styleDetail}>{patient?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={style}>Bio</TableCell>
                  <TableCell sx={styleDetail}>{patient?.bio}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5.8}
          md={5.8}
          bgcolor='third.light'
          borderRadius='10px'
        >
          <TableContainer>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell sx={styleHeader}>Health Status</TableCell>
                  <TableCell sx={styleHeader}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={style}>Sugar</TableCell>
                  <TableCell sx={styleDetail} >
                    No
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={style}>Allergies</TableCell>
                  <TableCell sx={styleDetail}>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={style}>Tuberculosis</TableCell>
                  <TableCell sx={styleDetail}>No</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={style}>Colds and Flu</TableCell>
                  <TableCell sx={styleDetail}>No</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PatientDetails;
