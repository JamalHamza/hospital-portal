import { Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import PersonalInformation from '../../../components/doctorAddForm/personalInfo/PersonalInformation';
import SpecialistAndExperience from '../../../components/doctorAddForm/specialistInfo/SpecialistAndExperience';
// import '../../dateRangePicker/DatePicker.css';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddNewDoctor from '../../../assets/admin/logo2.png';
import DatePickerForm from '../../../components/doctorAddForm/timings/DatePickerForm';
import TimePickerForm from '../../../components/doctorAddForm/timings/TimePickerForm';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import useRedirectLoggedOutUser from '../../../customHooks/useRedirectLoggedOutUser';
import { addDoctor } from '../../../redux/features/booking/bookingSlice';
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
  const navigate = useNavigate();
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
    setFormData({ ...formData, [fieldName]: value });
  };

  // ! handleChange for TimerPicker
  const handleTimeChange = (fieldName) => (time) => {
    const hour = moment(time.$d).format('HH');
    const min = moment(time.$d).format('mm');
    const formatedTime = `${hour}:${min}`;
    // console.log(`${hour}:${min}`);
    formik.setFieldValue(fieldName, time);
    // ! bug fixed after 6 hours I forgot to setFormData
    setFormData({ ...formData, [fieldName]: time });
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
    navigate('/admin/doctors');
  };

  // ! -----useFormik -----------------
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      AddDoctor(values);
      console.log(values);
    },
  });
  return (
    <FormWrapper
      title={'Add New Doctor'}
      img={AddNewDoctor}
      altImg={'Add new Doctor'}
    >
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

          <Button
            type='submit'
            variant='contained'
            sx={{
              borderRadius: '10px',
              padding: '8px 20px',
              fontWeight: 'bold',
              fontSize: '1.4rem',
              minWidth: '8dem',
              color: 'primary.dark',
              bgcolor: 'third.main',
              textTransform: 'uppercase',
              m: '1em',
              '&:hover': {
                backgroundColor: '#ccb7c0',
                color: '#fff',
              },
            }}
          >
            Add Doctor
          </Button>
        </form>
      </Box>
    </FormWrapper>
  );
}

export default AddDoctor;
