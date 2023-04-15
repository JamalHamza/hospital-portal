import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import PersonalInformation from '../../components/doctorForm/personalInfo/PersonalInformation';
import SpecialistAndExperience from '../../components/doctorForm/specialistInfo/SpecialistAndExperience';
// import '../../dateRangePicker/DatePicker.css';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import DatePickerForm from '../../components/doctorForm/timings/DatePickerForm';
import TimePickerForm from '../../components/doctorForm/timings/TimePickerForm';
import useRedirectLoggedOutUser from '../../customHooks/useRedirectLoggedOutUser';
import { addDoctor } from '../../redux/features/booking/bookingSlice';

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
  useRedirectLoggedOutUser('/login');
  const [formData, setFormData] = useState(initialValues);
  const [experiences, setExperiences] = useState([]);
  const dispatch = useDispatch();
  const {
    password,
    password2,
    hospitalName,
    years,
    startDate,
    endDate,
    name,
    email,
    phone,
    fee,
    startTime,
    endTime,
    specialist,
  } = formData;
  console.log(formData);

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

  // ! handleChange For DatePicker ------
  const handleFieldChange = (fieldName) => (value) => {
    const formatedDate = value?.toISOString();
    // ! this just for formik validation
    formik.setFieldValue(fieldName, value);
    // ! bug fixed after 6 hours I forgot to setFormData
    setFormData({ ...formData, [fieldName]: formatedDate });
  };

  // ! handleChange for TimerPicker
  const handleTimeChange = (fieldName) => (time) => {
    const hour = moment(time.$d).format('HH');
    const min = moment(time.$d).format('mm');
    const formatedTime = `${hour}:${min}`;
    // console.log(`${hour}:${min}`);

    formik.setFieldValue(fieldName, time);
    // ! bug fixed after 6 hours I forgot to setFormData
    setFormData({ ...formData, [fieldName]: formatedTime });
  };

  // ! ----------------
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // ! ----- Add Doctor function -----
  const AddDoctor = async () => {
    const userData = {
      name,
      password,
      startDate,
      endDate,
      email,
      phone,
      fee,
      startTime,
      endTime,
      specialist,

      experiences,
    };

    await dispatch(addDoctor(userData));
  };

  // ! -----useFormik -----------------
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      AddDoctor(values);
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
              Add Doctor
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default AddDoctor;
