import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import { getAppointments } from '../../../redux/features/booking/bookingSlice';

function HistoryAppointment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.auth);
  const { appointments } = useSelector((state) => state.booking);

  useEffect(() => {
    if (user?._id) {
      const userData = { patientId: user._id };
      dispatch(getAppointments(userData));
    }
  }, [dispatch]);
  console.log(appointments);
  return (
    <>
      <FormWrapper
      ></FormWrapper>
    </>
  );
}

export default HistoryAppointment;
