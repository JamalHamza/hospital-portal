import React, { useEffect, useState } from 'react';
import { MdOutlinePassword } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../components/card/Card';
import Loader from '../../components/loader/Loader';
import Password from '../../components/showPassword/Password';
import { RESET, resetPassword } from '../../redux/features/auth/authSlice';
import styles from './auth.module.scss';

const initialState = {
  password: '',
  password2: '',
};

function Reset() {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const { isLoading, message, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  console.log(typeof resetToken);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  useEffect(() => {
    if (isSuccess && message.includes('Reset Successful')) {
      navigate('/login');
    }

    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);

  // ! --------------
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
              <Password
                placeholder='New Password'
                name='password'
                value={password}
                onChange={handleInputChange}
              />
              <Password
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={handleInputChange}
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

export default Reset;
