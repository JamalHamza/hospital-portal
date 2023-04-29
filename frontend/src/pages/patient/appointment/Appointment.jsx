import { Box } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HistoryImg from '../../../assets/patient/history.png';
import BackNav from '../../../components/customUtils/backNav/BackNav';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import Loader from '../../../components/loader/Loader';

function Appointment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.auth);
  const { appointments } = useSelector((state) => state.booking);
  //  ! ----------------------------------------------------------
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <FormWrapper
          title={'Your Appointment History'}
          img={HistoryImg}
          altImg={'Your Appointment History'}
        >
          <Box sx={{ width: '90%', m: '0 auto' }}>
            <BackNav />
          </Box>
        </FormWrapper>
      )}
    </>
  );
}

export default Appointment;
