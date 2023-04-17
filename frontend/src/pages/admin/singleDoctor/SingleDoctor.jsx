import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDoctor } from '../../../redux/features/booking/bookingSlice';

function SingleDoctor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, doctor } = useSelector((state) => state.booking);
  console.log(doctor);
  console.log(id);

  // ! -----------
  useEffect(() => {
    dispatch(getDoctor(id));
  }, []);

  return <div>SingleDoctor</div>;
}

export default SingleDoctor;
