import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../components/card/Card';
import { Spinner } from '../../components/loader/Loader';
import PageMenu from '../../components/pageMenu/PageMenu';
import Password from '../../components/showPassword/Password';
import useRedirectLoggedOutUser from '../../customHooks/useRedirectLoggedOutUser';
import {
  changePassword,
  logout,
  RESET,
} from '../../redux/features/auth/authSlice';
import { sendAutomatedEmail } from '../../redux/features/email/emailSlice';
import './ChangePassword.scss';

const initialState = {
  oldPassword: '',
  password: '',
  password2: '',
};

function ChangePassword() {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !password2) {
      return toast.error('All fields are required');
    }

    if (password !== password2) {
      return toast.error('Passwords do not match');
    }

    const userData = {
      oldPassword,
      password,
    };

    const emailData = {
      subject: 'Password Changed',
      send_to: user.email,
      reply_to: 'noreply@zino',
      template: 'changePassword',
      url: '/forgot',
    };

    await dispatch(changePassword(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(logout());
    await dispatch(RESET(userData));
    navigate('/login');
  };

  return (
    <>
      <section>
        <div className='container'>
          <PageMenu />
          <h4>Change Password</h4>
          <div className='--flex-start change-password'>
            <Card cardclass={'card'}>
              <form noValidate onSubmit={updatePassword}>
                <>
                  <label>Current Password </label>
                  <Password
                    placeholder='Old Password'
                    name='oldPassword'
                    value={oldPassword}
                    onChange={handleInputChange}
                  />
                  <label>New Password: </label>
                  <Password
                    placeholder='New password'
                    name='password'
                    value={password}
                    onChange={handleInputChange}
                  />
                  <label>Confirm New Password: </label>
                  <Password
                    placeholder='Confirm New Password'
                    name='password2'
                    value={password2}
                    onChange={handleInputChange}
                  />
                </>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <button
                    type='submit'
                    className='--btn --btn-danger --btn-block'
                  >
                    Change Password
                  </button>
                )}
              </form>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChangePassword;
