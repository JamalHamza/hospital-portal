import React, { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getUsers, upgradeUser } from '../../redux/features/auth/authSlice';
import {
  EMAIL_RESET,
  sendAutomatedEmail,
} from '../../redux/features/email/emailSlice';

function ChangeRole({ id, email }) {
  const [userRole, setUserRole] = useState('');
  const dispatch = useDispatch();

  const changeRole = async (e) => {
    e.preventDefault();

    if (!userRole) {
      toast.error('Please select a role');
      return;
    }

    const userData = {
      role: userRole,
      id: id,
    };

    const emailData = {
      subject: 'Account Role Changed - AUTH:Z',
      send_to: email,
      reply_to: 'noreply@zino',
      template: 'changeRole',
      url: '/login',
    };

    await dispatch(upgradeUser(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(getUsers());
    await dispatch(EMAIL_RESET());
  };

  return (
    <div className='sort'>
      <form
        className='--flex-start'
        onSubmit={(e) => changeRole(e, id, userRole)}
      >
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value=''>--Selecet--</option>
          <option value='admin'>Admin</option>
          <option value='subscriber'>Doctor</option>
          <option value='subscriber'>Patient</option>
          <option value='suspended'>Suspended</option>
        </select>
        <button className='--btn --btn-primary'>
          <BsCheckLg size={14} color='white' />
        </button>
      </form>
    </div>
  );
}

export default ChangeRole;
