import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { AiTwotoneExperiment } from 'react-icons/ai';
import { FaBookMedical } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

function SpecialistAndExperience(props) {
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    hospitalName,
    years,
    experiences,
    setExperiences,
    addExperience,
  } = props;

  function handleDelete(index) {
    setExperiences((prevExperiences) =>
      prevExperiences.filter((_, i) => i !== index)
    );
  }
  return (
    <>
      <Box
        sx={{
          display: 'felx',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant='h5'
          sx={{
            color: 'third.dark',
            p: '1.2em 0.2em',
            display: 'flex',
            alignItems: 'center',
            fontWeight: '700',
            gap: '0.4em',
          }}
        >
          <FaBookMedical fontSize={26} />
          Specialist & Fee
        </Typography>
      </Box>
      {/* ------------------------------------ */}
      <Grid
        container
        spacing={2}
        sx={{
          mb: '1em',
        }}
      >
        <Grid item xs={12} md={4}>
          <TextField
            name='specialist'
            label='Specialist'
            type='text'
            variant='outlined'
            value={values.specialist}
            onChange={handleChange}
            style={{ margin: '4px', width: '100%' }}
            onBlur={handleBlur}
            error={touched.specialist && Boolean(errors.specialist)}
            helperText={touched.specialist && errors.specialist}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name='fee'
            label='Fee'
            variant='outlined'
            type='number'
            value={values.fee}
            onChange={handleChange}
            style={{ margin: '4px', width: '100%' }}
            onBlur={handleBlur}
            error={touched.fee && Boolean(errors.fee)}
            helperText={touched.fee && errors.fee}
          />
        </Grid>
      </Grid>

      {/* ! ------------------------------------- */}

      <Box
        sx={{
          display: 'felx',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant='h5'
          sx={{
            color: 'fourth.dark',
            p: '1.2em 0.2em',
            display: 'flex',
            alignItems: 'center',
            fontWeight: '700',
            gap: '0.4em',
          }}
        >
          <AiTwotoneExperiment fontSize={26} />
          Experience
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        gap='0.4rem'
        sx={
          {
            // mb: '1em',
            // display: 'flex',
            // alignItems: 'center',
          }
        }
      >
        <Grid item xs={12} md={4}>
          <TextField
            name='hospitalName'
            label='Hospital Name'
            variant='outlined'
            type='text'
            value={values.hospitalName}
            onChange={handleChange}
            style={{ margin: '4px', width: '100%' }}
            onBlur={handleBlur}
            error={touched.hospitalName && Boolean(errors.hospitalName)}
            helperText={touched.hospitalName && errors.hospitalName}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name='years'
            label='Years'
            variant='outlined'
            type='Number'
            value={values.years}
            onChange={handleChange}
            style={{ margin: '4px', width: '100%' }}
            onBlur={handleBlur}
            error={touched.years && Boolean(errors.years)}
            helperText={touched.years && errors.years}
          />
        </Grid>
        <Grid item xs={4} md={2}>
          <Button
            onClick={() => addExperience(values.hospitalName, values.years)}
            disabled={!hospitalName || !years}
            sx={{
              bgcolor: 'third.main',
              padding: '1.4em 3em',
              fontWeight: 600,
              fontSize: '1rem',
              m: '0.5em 0.4em',
              mb: '0.4em',
              color: 'primary.dark',
              '&:hover': {
                background: '#ccb7c0',
              },
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            width: '100%',
            p: '0.4em 0.2em',
            borderRadius: '10px',
            mb: '2em',
          }}
        >
          <Typography
            variant='h6'
            sx={{
              color: 'primary.main',
              fontSize: '1.4rem',
              ml: '0.4em',
            }}
          >
            Added Work Experiencesd:
          </Typography>
          <Box sx={{ p: '0.3em 0em' }}>
            {experiences.length ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'third.main' }}>
                      <TableCell sx={{ fontSize: '1.5rem', fontWeight: '700' }}>
                        Hospital
                      </TableCell>
                      <TableCell sx={{ fontSize: '1.5rem', fontWeight: '700' }}>
                        Years
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {experiences?.map((experience, index) => (
                      <TableRow key={index} sx={{ bgcolor: 'fourth.light' }}>
                        <TableCell
                          sx={{ fontSize: '1.3em', fontWeight: '700' }}
                        >
                          {experience.hospitalName}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: '1.3em', fontWeight: '700' }}
                        >
                          {experience.years}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDelete(index)}>
                            <MdDeleteForever fontSize={24} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant='h6' sx={{ color: 'red', ml: '0.4em' }}>
                Experience is not added
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default SpecialistAndExperience;
