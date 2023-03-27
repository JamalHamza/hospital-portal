import { GoogleLogin } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { RiLoginBoxLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../components/card/Card';
import Loader from '../../components/loader/Loader';
import Password from '../../components/showPassword/Password';
import { validateEmail } from '../../redux/features/auth/authServices';
import {
  login,
  loginWithGoogle,
  RESET,
  sendLoginCode,
} from '../../redux/features/auth/authSlice';
import * as Yup from 'yup';
import styles from './auth.module.scss';

const initialState = {
  email: '',
  password: '',
};

// ! ------ Yup Validation ------------------
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

function Login() {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess, message, isError, towFactors } =
    useSelector((state) => state.auth);

  // ! --------------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ! --------------------------------------------
  const LoginUser = async (e) => {
    e.preventDefault();
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
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <RiLoginBoxLine size={40} color='#00695c' />
          </div>
          <h2>Login</h2>
          <div className='--flex-center'>
            {/* <button className='--btn --btn-google'>login with google</button> */}
            <GoogleLogin
              onSuccess={googleLogin}
              onError={() => {
                console.log('Login Failed');
                toast.error('Login Failed');
              }}
            />
          </div>
          <br />
          <p className='--text-center --fw-bold'>or</p>
          <form onSubmit={LoginUser} noValidate>
            <input
              type='email'
              placeholder='Your email'
              required
              name='email'
              value={email}
              onChange={handleInputChange}
            />
            <Password
              placeholder='Your password'
              name='password'
              value={password}
              onChange={handleInputChange}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Login
            </button>
          </form>
          <Link to='/forgot'>Forgot Password?</Link>
          <span className={styles.register}>
            <Link to='/'>Home</Link>
            <p className='text'>&nbsp; Create an account</p>
            <Link to='/register'> &nbsp; Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
}

export default Login;
