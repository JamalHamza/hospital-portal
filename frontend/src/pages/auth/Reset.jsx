import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdOutlinePassword } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Card from '../../components/card/Card';
import Loader from '../../components/loader/Loader';
import { RESET, resetPassword } from '../../redux/features/auth/authSlice';
import styles from './auth.module.scss';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useFormik } from 'formik';
import { ImCheckmark, ImCross } from 'react-icons/im';
import PasswordStrength from '../../components/passwordStrength/PasswordStrength';

const initialValues = {
  password: '',
  password2: '',
};

// ! ------ Yup Validation ------------------
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function Reset() {
  const [formData, setFormData] = useState(initialValues);
  const { password, password2 } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { isLoading, message, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  // console.log(typeof resetToken);

  const togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    setFormData({ ...formData, [name]: value });
  };

  // ! ------- Password Strength Indicator ------------
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passMatch, setPassMatch] = useState(false);
  // ! ---- Dynamic function for passwrod stength ----
  const timesIcon = <ImCross size={8} color='red' />;
  const checkIcon = <ImCheckmark size={8} color='green' />;
  ImCross;

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    } else {
      return timesIcon;
    }
  };

  // ! ----- Reset Function -----------------------

  const reset = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      return toast.error('Password do not match');
    }
    if (password.length < 6) {
      return toast.error('Password must to be up to 6 characters');
    }

    const userData = {
      password,
    };

    await dispatch(resetPassword({ userData, resetToken }));
    await dispatch(RESET(userData));
    navigate('/login');
  };

  // ! -----------------------------------------

  useEffect(() => {
    if (isSuccess && message.includes('Reset Successful')) {
      navigate('/login');
    }

    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);

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
    if (password.length > 6) {
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

  // ! --------------------------------------

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Handle form submission here
      console.log(values);
      reset(values);
    },
  });

  // ! ---------------------------------------
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <Card>
          <div className={styles.form}>
            <div className='--flex-center'>
              <MdOutlinePassword size={40} color='#00695c' />
            </div>
            <h2>Reset Password</h2>
            <form onSubmit={reset} noValidate>
              <TextField
                name='password'
                type={showPassword ? 'text' : 'password'}
                label='New Password'
                onChange={handleChange}
                value={formik.values.password}
                style={{ margin: '8px', width: '100%' }}
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
              <TextField
                name='password2'
                type={showPassword2 ? 'text' : 'password'}
                label='Confirm New Password'
                onChange={handleChange}
                value={formik.values.password2}
                style={{ margin: '8px', width: '100%' }}
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
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
                  width: '100%',
                  '&:hover': {
                    background: '#ccc6b4',
                  },
                }}
              >
                Reset Password
              </Button>
              {/* <Card cardclass={styles.group}>
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
              </Card> */}
              <PasswordStrength password={password} password2={password2} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0.4em',
                }}
              >
                <Link to='/'>
                  <IconButton>
                    <HomeIcon fontSize='large' sx={{ color: 'primary.main' }} />
                  </IconButton>
                </Link>

                <Link to='/register'>
                  <IconButton>
                    <PersonAddAltIcon
                      fontSize='large'
                      sx={{ color: 'primary.main' }}
                    />
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
            </form>
          </div>
        </Card>
      )}
    </div>
  );
}

export default Reset;
