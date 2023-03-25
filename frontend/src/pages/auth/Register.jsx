import { Box, Button, IconButton, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ImCheckmark, ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Card from '../../components/card/Card';
import './auth-mui-overwrited.css';
import styles from './auth.module.scss';
// ! ------------------------------
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
// ! -------------------------

const Register = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };
  const [formData, setFormData] = useState(initialValues);
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ! ------- Password Strength Indicator ------------
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passMatch, setPassMatch] = useState(true);
  // ! ------------------------------------------------

  const timesIcon = <ImCross size={8} color='red' />;
  const checkIcon = <ImCheckmark size={8} color='green' />;
  ImCross;

  // ! ----- Dynamic function for password strength----
  const switchIcon = (codition) => {
    if (codition) {
      return checkIcon;
    }
    return timesIcon;
  };

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

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

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
    if (password.length > 5) {
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        bgcolor: 'secondary.main',
        // padding: '2em',
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange }) => (
            <Form
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Field
                as={TextField}
                name='name'
                label='Name'
                type='text'
                variant='outlined'
                value={name}
                onChange={handleChange}
                style={{ margin: '8px', width: '100%' }}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <Field
                as={TextField}
                name='email'
                label='Email'
                variant='outlined'
                type='email'
                style={{ margin: '8px', width: '100%' }}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                name='password'
                label='Password'
                variant='outlined'
                type='password'
                style={{ margin: '8px', width: '100%' }}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Field
                as={TextField}
                name='password2'
                label='Confirm Password'
                variant='outlined'
                type='password'
                style={{ margin: '8px', width: '100%' }}
                error={touched.password2 && Boolean(errors.password2)}
                helperText={touched.password2 && errors.password2}
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
                    <LoginIcon
                      fontSize='large'
                      sx={{ color: 'primary.main' }}
                    />
                  </IconButton>
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Register;
