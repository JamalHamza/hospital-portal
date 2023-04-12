import { Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';

import * as Yup from 'yup';
import PersonalInformation from '../../components/doctorForm/personalInformation/PersonalInformation';
import SpecialistAndExperience from '../../components/doctorForm/specialistAndExperience/SpecialistAndExperience';
import WorkingDayAndTime from '../../components/doctorForm/workingDayAndTime/workingDayAndTime';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  password2: '',

  hospitalName: '',
  years: '',

  fee: '',
  specialist: '',
};

// ! ------ Yup Validation ------------------
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 8 characters')
    .required('Password is required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  specialist: Yup.string().required('Specialist is required'),
  fee: Yup.number().required('Fee is required'),
  hospitalName: Yup.string().required('Hospital is required'),
  years: Yup.number().required('Years is required'),
});

function AddDoctor() {
  const [formData, setFormData] = useState(initialValues);
  const [experiences, setExperiences] = useState([]);
  const { name, email, password, password2, hospitalName, years } = formData;

  // ! Add Experince -----------------
  function addExperience(hospitalName, years) {
    setExperiences((prevExperiences) => [
      ...prevExperiences,
      { hospitalName, years },
    ]);
  }

  // ! -----------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    setFormData({ ...formData, [name]: value });
  };

  // ! ----------------
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // ! -----useFormik -----------------

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Handle form submission here
      console.log(values);
    },
  });

  return (
    <div>
      <Box
        sx={{
          bgcolor: 'form.main',
          width: '96%',
          maxWidth: '100rem',
          m: '2em auto',
          p: '2em 2em',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5em',
        }}
      >
        <Typography
          variant='h4'
          sx={{ color: 'primary.main', textAlign: 'center', p: '0.2em' }}
        >
          Add New Doctor
        </Typography>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <hr color='#ccb7c0' />
            <PersonalInformation
              values={formik.values}
              handleChange={handleChange}
              handleBlur={formik.handleBlur}
              touched={formik.touched}
              errors={formik.errors}
              password={password}
              password2={password2}
              handleImageChange={handleImageChange}
            />
            <hr color='#ccb7c0' />
            <SpecialistAndExperience
              values={formik.values}
              handleChange={handleChange}
              handleBlur={formik.handleBlur}
              touched={formik.touched}
              errors={formik.errors}
              hospitalName={hospitalName}
              years={years}
              experiences={experiences}
              setExperiences={setExperiences}
              addExperience={addExperience}
            />
            <hr color='#ccb7c0' />

            <WorkingDayAndTime />
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default AddDoctor;
