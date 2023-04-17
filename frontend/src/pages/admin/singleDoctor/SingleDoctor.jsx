import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PersonalInfo from '../../../components/doctors/doctor/personalInfo/PersonalInfo';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import Loader from '../../../components/loader/Loader';
import { getDoctor } from '../../../redux/features/booking/bookingSlice';

function SingleDoctor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, doctor } = useSelector((state) => state.booking);

  console.log(doctor);
  // ! -----------
  useEffect(() => {
    dispatch(getDoctor(id));
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <>
        <FormWrapper>
          <PersonalInfo doctor={doctor} />
        </FormWrapper>
      </>
    </>
  );
}

export default SingleDoctor;
