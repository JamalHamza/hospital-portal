import React, { useState } from 'react';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../components/card/Card';
import Loader from '../../components/loader/Loader';
import { validateEmail } from '../../redux/features/auth/authServices';
import { forgotPassword, RESET } from '../../redux/features/auth/authSlice';
import styles from './auth.module.scss';

function Forgot() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error('All fields are required');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter valid email');
    }
    const userData = {
      email,
    };
    await dispatch(forgotPassword(userData));
    await dispatch(RESET(userData));
  };
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <Card>
          <div className={styles.form}>
            <div className='--flex-center'>
              <MdOutlineMarkEmailUnread size={40} color='#00695c' />
            </div>
            <h2>Forgot Password</h2>
            <form onSubmit={forgot} noValidate>
              <input
                type='email'
                placeholder='Your email'
                required
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button type='submit' className='--btn --btn-primary --btn-block'>
                Get Reset Email
              </button>
              <div className={styles.links}>
                <p>
                  <Link to='/'>-Home</Link>
                </p>
                <p>
                  <Link to='/login'> &nbsp; -Login</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      )}
    </div>
  );
}

export default Forgot;
