import React from 'react';
import AllDoctors from '../../../assets/admin/medical-team.png';
import FormWrapper from '../../../components/formWrapper/FormWrapper';

function Doctors() {
  return (
    <FormWrapper img={AllDoctors} altImg='medical team' title='Doctors List' >
      Doctors
    </FormWrapper>
  );
}

export default Doctors;
