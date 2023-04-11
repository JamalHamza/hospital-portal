import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { FaBookMedical } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import * as Yup from 'yup';
import PasswordStrength from '../../components/passwordStrength/PasswordStrength';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  password2: '',
  experience: '',
  fee: '',
  specialist: '',
};

// ! ------ Yup Validation ------------------
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 8 characters')
    .required('Password is required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  specialist: Yup.string().required('Specialist is required'),
  fee: Yup.number().required('Fee is required'),
  experience: Yup.number().required('Experience is required'),
});

function AddDoctor() {
  const [formData, setFormData] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { name, email, password, password2 } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  // ! -----------
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // ! --------------------------------------

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Handle form submission here
      console.log(values);
      RegisterUser(values);
    },
  });

  return (
    <div>
      <Box
        sx={{
          bgcolor: 'form.main',
          width: '96%',
          maxWidth: '100rem',
          m: '2em auto',
          p: '2em 2em',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5em',
        }}
      >
        <Typography
          variant='h4'
          sx={{ color: 'primary.main', textAlign: 'center', p: '0.2em' }}
        >
          Add New Doctor
        </Typography>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <hr color='#ccb7c0' />
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
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1em',
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
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
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
                          {showPassword2 ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password2 && Boolean(formik.errors.password2)
                  }
                  helperText={
                    formik.touched.password2 && formik.errors.password2
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  type='file'
                  accept='image/*'
                  name='image'
                  onChange={handleImageChange}
                  style={{ margin: '4px 0', width: '100%' }}
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
            <hr color='#ccb7c0' />
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
                  p: '1.2em',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <FaBookMedical fontSize={26} />
                Experience & Specialist
              </Typography>
            </Box>
            <Grid
              container
              spacing={2}
              sx={{ display: 'felx', justifyContent: 'center', mb: '1em' }}
            >
              <Grid item xs={12} md={4}>
                <TextField
                  name='specialist'
                  label='Specialist'
                  type='text'
                  variant='outlined'
                  value={formik.values.specialist}
                  onChange={handleChange}
                  style={{ margin: '4px', width: '100%' }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.specialist &&
                    Boolean(formik.errors.specialist)
                  }
                  helperText={
                    formik.touched.specialist && formik.errors.specialist
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  name='fee'
                  label='Fee'
                  variant='outlined'
                  type='number'
                  value={formik.values.fee}
                  onChange={handleChange}
                  style={{ margin: '4px', width: '100%' }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fee && Boolean(formik.errors.fee)}
                  helperText={formik.touched.fee && formik.errors.fee}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  name='experience'
                  label='Experience'
                  variant='outlined'
                  type='email'
                  value={formik.values.experience}
                  onChange={handleChange}
                  style={{ margin: '4px', width: '100%' }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.experience &&
                    Boolean(formik.errors.experience)
                  }
                  helperText={
                    formik.touched.experience && formik.errors.experience
                  }
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              variant='contained'
              sx={{
                bgcolor: 'third.main',
                margin: '0.8em',
                padding: '0.8em 2em',
                fontWeight: 800,
                fontSize: '1.2rem',
                color: 'primary.dark',
                '&:hover': {
                  background: '#ccb7c0',
                },
              }}
            >
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default AddDoctor;
