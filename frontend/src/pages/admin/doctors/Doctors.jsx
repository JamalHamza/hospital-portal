import React from 'react';
import AllDoctors from '../../../assets/admin/medical-team.png';
import DoctorsSearchBar from '../../../components/admin/doctorSearchbar/DoctorsSearchbar';
import DoctorList from '../../../components/admin/doctorsList/DoctorList';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import {t} from 'i18next';

function Doctors() {
  return (
    <FormWrapper img={AllDoctors} altImg='medical team' title={`${t('admin.doctorList')}`}>
      <DoctorsSearchBar />
      <DoctorList />
    </FormWrapper>
  );
}

export default Doctors;
