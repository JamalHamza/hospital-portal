import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import PersonalInformation from '../../components/doctorForm/personalInfo/PersonalInformation';
import SpecialistAndExperience from '../../components/doctorForm/specialistInfo/SpecialistAndExperience';
// import '../../dateRangePicker/DatePicker.css';
import DatePickerForm from '../../components/doctorForm/timings/DatePickerForm';
import TimePickerForm from '../../components/doctorForm/timings/TimePickerForm';

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
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
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
  startDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date().required('Start Date is required'),
  startTime: Yup.string().required('Start Time is required'),
  endTime: Yup.string().required('End Time is required'),
});

function AddDoctor() {
  const [formData, setFormData] = useState(initialValues);
  const [experiences, setExperiences] = useState([]);
  const { password, password2, hospitalName, years, startDate, endDate } =
    formData;

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

  const handleFieldChange = (fieldName) => (value) => {
    formik.setFieldValue(fieldName, value);
  };

  const handleTimeChange = (fieldName) => (time) => {
    formik.setFieldValue(fieldName, time);
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
            <DatePickerForm
              values={formik.values}
              handleChange={handleChange}
              handleBlur={formik.handleBlur}
              touched={formik.touched}
              errors={formik.errors}
              handleFieldChange={handleFieldChange}
            />
            <TimePickerForm
              values={formik.values}
              handleChange={handleChange}
              handleBlur={formik.handleBlur}
              touched={formik.touched}
              errors={formik.errors}
              handleTimeChange={handleTimeChange}
            />
            {/* ! ------------------------------------ */}
            <Button
              type='submit'
              variant='contained'
              sx={{
                m: '2rem',
                bgcolor: 'third.main',
                padding: '1.2em 2em',
                fontWeight: 800,
                fontSize: '1.2rem',
                color: 'primary.dark',
                '&:hover': {
                  background: '#ccb7c0',
                },
              }}
            >
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default AddDoctor;
