import HomeIcon from '@mui/icons-material/Home';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import loginImg from '../../assets/authPage/login.png';
import { validateEmail } from '../../redux/features/auth/authServices';
import {
  login,
  loginWithGoogle,
  RESET,
  sendLoginCode,
} from '../../redux/features/auth/authSlice';

const initialValues = {
  email: '',
  password: '',
};

// ! ------ Yup Validation ------------------
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const [formData, setFormData] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess, message, isError, towFactors } =
    useSelector((state) => state.auth);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // ! --------------------------------------------
  // ! can use this handleChange while not using formik
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    setFormData({ ...formData, [name]: value });
  };

  // ! --------------------------------------------
  const LoginUser = async (e) => {
    if (!email || !password) {
      return toast.error('All field are required!');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email', {});
    }
    const userData = {
      email,
      password,
    };

    await dispatch(login(userData));
  };

  // ! ---- Google Login

  const googleLogin = async (credentialResponse) => {
    console.log(credentialResponse);
    await dispatch(
      loginWithGoogle({ userToken: credentialResponse.credential })
    );
  };

  // ! --------------------------------------------
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate('/profile');
    }
    if (isError && towFactors) {
      dispatch(sendLoginCode(email));
      navigate(`/loginWithCode/${email}`);
    }
    dispatch(RESET());
  }, [isSuccess, isLoggedIn, navigate, dispatch, isError, towFactors, email]);

  // ! --------------------------------------------

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Handle form submission here
      console.log(values);
      LoginUser(values);
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
          m: '0 auto',
          p: '1em 2em',
          bgcolor: '#fff',
          borderRadius: '10px',
        }}
      >
        <Box
          sx={{
            p: '3em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={loginImg} alt='login' />
          <Typography sx={{ color: 'primary.main', ml: '0.4em' }} variant='h3'>
            Login
          </Typography>
        </Box>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            name='email'
            label='Email'
            type='text'
            variant='outlined'
            value={formik.values.email}
            onChange={handleChange}
            style={{ margin: '8px', width: '100%' }}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            name='password'
            type={showPassword ? 'text' : 'password'}
            label='password'
            onChange={handleChange}
            value={formik.values.password}
            style={{ margin: '8px', width: '100%' }}
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
            Login
          </Button>

          <Box sx={{ p: '1.4em' }}>
            {/* <button className='--btn --btn-google'>login with google</button> */}
            <GoogleLogin
              onSuccess={googleLogin}
              onError={() => {
                console.log('Login Failed');
                toast.error('Login Failed');
              }}
            />
          </Box>

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

            <Link to='/register'>
              <IconButton>
                <PersonAddAltIcon
                  fontSize='large'
                  sx={{ color: 'primary.main' }}
                />
              </IconButton>
            </Link>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
