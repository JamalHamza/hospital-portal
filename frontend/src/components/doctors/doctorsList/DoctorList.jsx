import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function DoctorList() {
  const dispatch = useDispatch();
  const { isLoading, doctors } = useSelector((state) => state.booking);
  console.log(doctors);

  //  ! -------------
  return (
    <div>
      DoctorList <button onClick={() => handleCick()}>Get doctors</button>
    </div>
  );
}

export default DoctorList;
