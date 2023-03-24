import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RESET, verifyUser } from '../../redux/features/auth/authSlice';

function Verify() {
  const dispatch = useDispatch();
  const { verificationToken } = useParams();
  console.log(verificationToken);

  const verifyUserAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
  };

  return (
    <section>
      <div className='--center-all'>
        <h3>Account Verification</h3>
        <p>To verify your account, click the button below...</p>
        <br />
        <button className='--btn --btn-primary' onClick={verifyUserAccount}>
          Verify Account
        </button>
      </div>
    </section>
  );
}

export default Verify;
