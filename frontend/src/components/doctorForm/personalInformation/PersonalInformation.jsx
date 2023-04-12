import { Box, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { ImProfile } from 'react-icons/im';
import PasswordStrength from '../../passwordStrength/PasswordStrength';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function PersonalInformation() {
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
            color: 'menu.main',
            p: '1.2em',
            display: 'flex',
            alignItems: 'center',
            fontWeight: '700',
            gap: '0.4em',
          }}
        >
          <ImProfile fontSize={26} />
          Personal Information
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ display: 'felx', justifyContent: 'center', mb: '1em' }}
      >
        <Grid item xs={12} md={4}>
          <TextField
            name='name'
            label='Name'
            type='text'
            variant='outlined'
            value={formik.values.name}
            onChange={handleChange}
            style={{ margin: '4px', width: '100%' }}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name='phone'
            label='Phone'
            variant='outlined'
            type='text'
            value={formik.values.phone}
            onChange={handleChange}
            style={{ margin: '4px', width: '100%' }}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name='email'
            label='Email'
            variant='outlined'
            type='email'
            value={formik.values.email}
            onChange={handleChange}
            style={{ margin: '4px', width: '100%' }}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
      </Grid>
      {/* !------------------------------------- */}
      <Grid
        container
        spacing={2}
        sx={{ display: 'felx', justifyContent: 'left', mb: '1em' }}
      >
        <Grid item xs={12} md={4}>
          <TextField
            name='password'
            type={showPassword ? 'text' : 'password'}
            label='Password'
            onChange={handleChange}
            value={formik.values.password}
            style={{ margin: '4px', width: '100%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={togglePassword}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name='password2'
            type={showPassword2 ? 'text' : 'password'}
            label='Confirm Password'
            onChange={handleChange}
            value={formik.values.password2}
            style={{ margin: '4px', width: '100%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={togglePassword2}>
                    {showPassword2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            type='file'
            accept='image/*'
            name='image'
            onChange={handleImageChange}
            style={{ margin: '4px', width: '100%' }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ display: 'felx', justifyContent: 'center', mb: '1em' }}
      >
        <Grid item xs={12} md={4}>
          <PasswordStrength password={password} password2={password2} />
        </Grid>
      </Grid>
    </>
  );
}

export default PersonalInformation;
