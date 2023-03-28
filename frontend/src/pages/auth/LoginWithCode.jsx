import {Box} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CiUnlock } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../components/card/Card';
import Loader from '../../components/loader/Loader';
import {
  loginWithCode,
  RESET,
  sendLoginCode,
} from '../../redux/features/auth/authSlice';
import styles from './auth.module.scss';

function LoginWithCode() {
  const [loginCode, setLoginCode] = useState('');
  const { email } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const loginUserWithCode = async (e) => {
    e.preventDefault();
    if (loginCode === '') {
      return toast.error('Please enter access code');
    }
    if (loginCode.length !== 6) {
      return toast.error('Access code must be 6 characters');
    }
    const code = {
      loginCode,
    };
    await dispatch(loginWithCode({ code, email }));
  };

  const resendUserLoginCode = async (e) => {
    e.preventDefault();
    await dispatch(sendLoginCode(email));
    await dispatch(RESET());
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate('/profile');
    }

    dispatch(RESET());
  }, [isSuccess, isLoggedIn, navigate, dispatch]);

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Box >
        <div className={styles.form}>
          <div className='--flex-center'>
            <CiUnlock size={40} color='#00695c' />
          </div>
          <h3>Enter Access Code</h3>
          <form onSubmit={loginUserWithCode} noValidate>
            <input
              type='text'
              placeholder='Access Code'
              required
              name='loginCode'
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
            />

            <button type='submit' className='--btn --btn-primary --btn-block'>
              Proceed To Login
            </button>
            <span className='--flex-center'>
              Check your email for login access code
            </span>
            <div className={styles.links}>
              <p>
                <Link to='/'>-Home</Link>
              </p>
              <p
                className='v-link --color-primary'
                onClick={resendUserLoginCode}
              >
                <b>Resend Code</b>
              </p>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
}

export default LoginWithCode;
