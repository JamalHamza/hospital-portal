import React, { useEffect, useState } from 'react';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { ImCheckmark, ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../components/card/Card';
import Loader from '../../components/loader/Loader';
import Password from '../../components/showPassword/Password';
import { validateEmail } from '../../redux/features/auth/authServices';
import {
  register,
  RESET,
  sendVerificationEmail,
} from '../../redux/features/auth/authSlice';
import styles from './auth.module.scss';

const initialState = {
  name: '',
  email: '',
  password: '',
  password2: '',
};

function Register() {
  const [formData, setFormData] = useState(initialState);
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

  const RegisterUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error('All field are required!');
    }
    if (password.length < 6) {
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

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <HiOutlineUserAdd size={40} color='#00695c' />
          </div>
          <h2>Register</h2>
          <br />
          <form onSubmit={RegisterUser} noValidate>
            <input
              type='text'
              placeholder='Name'
              required
              name='name'
              value={name}
              onChange={handleInputChange}
            />
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
            <Password
              placeholder='Confirm Password'
              name='password2'
              value={password2}
              onChange={handleInputChange}
              onPaste={(e) => {
                e.preventDefault();
                toast.error('Can not paste into confirm password field');
                return false;
              }}
            />
            {/* Password Stregth Indicator */}
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
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Register
            </button>
          </form>
          <span className={styles.register}>
            <Link to='/'>Home |</Link>
            <p className='text'>&nbsp; Already have an account?</p>
            <Link to='/login'> &nbsp; Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
}

export default Register;
