import React from 'react';
import AllDoctorsList from '../../../assets/patient/medical-team.png';
import DoctorsSearchBar from '../../../components/admin/doctorSearchbar/DoctorsSearchbar';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import PatientDoctorsList from '../../../components/pateint/patientDoctorsList/PatientDoctorsList';

function AllDoctors() {
  return (
    <FormWrapper
      img={AllDoctorsList}
      altImg='medical team'
      title='Doctors List'
    >
      <DoctorsSearchBar />
      <PatientDoctorsList />
    </FormWrapper>
  );
}

export default AllDoctors;
