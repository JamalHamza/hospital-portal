import { Box, Button, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ImCheckmark, ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Card from '../../components/card/Card';
import './auth-mui-overwrited.css';
import styles from './auth.module.scss';

import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import {
  register,
  RESET,
  sendVerificationEmail,
} from '../../redux/features/auth/authSlice';

const initialValues = {
  name: '',
  email: '',
  password: '',
  password2: '',
};

// ! ------ Yup Validation ------------------
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  // ! Initial Values for form

  const [formData, setFormData] = useState(initialValues);

  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    setFormData({ ...formData, [name]: value });
  };

  console.log(password);
  // ! ------- Password Strength Indicator ------------
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passMatch, setPassMatch] = useState(false);
  // ! -----------------------------------------------

  const timesIcon = <ImCross size={8} color='red' />;
  const checkIcon = <ImCheckmark size={8} color='green' />;
  ImCross;

  // ! ----- Dynamic function for password strength----
  const switchIcon = (codition) => {
    if (codition) {
      return checkIcon;
    } else {
      return timesIcon;
    }
  };

  // ! ------- console.log form values --------
  // const handleSubmit = (values, { resetForm }) => {
  //   console.log(values);
  //   resetForm();
  // };

  // ! ----- password & password2 check -------
  useEffect(() => {
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    // Check for special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
    // Check for PASSWORD LENGTH
    if (password.length > 8) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
    // Check for Password Match
    if (password === password2 && password.length > 0 && password2.length > 0) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  }, [password, password2]);

  // ! ---- Register function ----------------

  const RegisterUser = async () => {
    // e.preventDefault();
    if (!name || !email || !password) {
      return toast.error('All field are required!');
    }
    if (password.length < 8) {
      return toast.error('Password must be up to 6 characters');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }
    if (password !== password2) {
      return toast.error('Password did not match');
    }
    const userData = {
      name,
      email,
      password,
    };

    await dispatch(register(userData));
    await dispatch(sendVerificationEmail());
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate('/profile');
    }
    dispatch(RESET());
  }, [isSuccess, isLoggedIn, navigate, dispatch]);

  // ! --------------------------------------

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Handle form submission here
      console.log(values);
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        bgcolor: 'secondary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: '30rem',
          width: '32rem',
          minheight: '70vh',
          m: '0 auto',
          p: '1em 2em',
          bgcolor: '#fff',
          borderRadius: '10px',
        }}
      >
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            name='name'
            label='Name'
            type='text'
            variant='outlined'
            value={formik.values.name}
            onChange={handleChange}
            style={{ margin: '8px', width: '100%' }}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            name='email'
            label='Email'
            variant='outlined'
            type='email'
            value={formik.values.email}
            onChange={handleChange}
            style={{ margin: '8px', width: '100%' }}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            name='password'
            label='Password'
            variant='outlined'
            type='password'
            value={formik.values.password}
            onChange={handleChange}
            style={{ margin: '8px', width: '100%' }}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            name='password2'
            label='Confirm Password'
            variant='outlined'
            type='password'
            value={formik.values.password2}
            onChange={handleChange}
            style={{ margin: '8px', width: '100%' }}
            onBlur={formik.handleBlur}
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
          />
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

          <Card cardclass={styles.group}>
            <ul className='form-list'>
              <li>
                <span className={styles.indicator}>
                  {switchIcon(uCase)}
                  &nbsp; Lowercase & UpperCase
                </span>
              </li>
              <li>
                <span className={styles.indicator}>
                  {switchIcon(num)}
                  &nbsp; Number (0-9)
                </span>
              </li>
              <li>
                <span className={styles.indicator}>
                  {switchIcon(sChar)}
                  &nbsp; Special Character(!@#$%^&*)
                </span>
              </li>
              <li>
                <span className={styles.indicator}>
                  {switchIcon(passLength)}
                  &nbsp; At least 6 Character
                </span>
              </li>
              <li>
                <span className={styles.indicator}>
                  {switchIcon(passMatch)}
                  &nbsp; Password Match
                </span>
              </li>
            </ul>
          </Card>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0.4em',
            }}
          >
            <Link to='/'>
              <IconButton>
                <HomeIcon fontSize='large' sx={{ color: 'primary.main' }} />
              </IconButton>
            </Link>

            <Link to='/login'>
              <IconButton>
                <LoginIcon fontSize='large' sx={{ color: 'primary.main' }} />
              </IconButton>
            </Link>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
