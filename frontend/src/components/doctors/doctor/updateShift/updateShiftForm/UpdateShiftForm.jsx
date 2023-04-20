import { Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import DatePickerForm from '../../../../doctorAddForm/timings/DatePickerForm';
import TimePickerForm from '../../../../doctorAddForm/timings/TimePickerForm';

// ! -------- Form Validation ----------------
const validationSchema = Yup.object().shape({
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'End date must be after start date')
    .required('End date is required'),
  startTime: Yup.string().required('Start Time is required'),
  endTime: Yup.string().required('End Time is required'),
});

const initialValues = {
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
};

function UpdateShiftForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState(initialValues);
  const { endDate } = formData;
  console.log(formData);

  // ! handleChange for TimerPicker
  const handleTimeChange = (fieldName) => (time) => {
    const hour = moment(time.$d).format('HH');
    const min = moment(time.$d).format('mm');
    const formattedTime = `${hour}:${min}`;
    formik.setFieldValue(fieldName, time);
    setFormData({ ...formData, [fieldName]: formattedTime });
  };
  // ! handleChange For DatePicker ------
  const handleFieldChange = (fieldName) => (value) => {
    const formatedDate = value?.toISOString();
    formik.setFieldValue(fieldName, value);
    setFormData({ ...formData, [fieldName]: formatedDate });
  };

  // !----------- userFormik ------------------
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Grid item xs={12} md={6} sx={{ p: '0 em', m: '0 auto' }}>
      <form onSubmit={formik.handleSubmit}>
        <DatePickerForm
          values={formik.values}
          handleBlur={formik.handleBlur}
          touched={formik.touched}
          errors={formik.errors}
          handleFieldChange={handleFieldChange}
        />
        {/* -------------------------------- */}
        <TimePickerForm
          values={formik.values}
          handleBlur={formik.handleBlur}
          touched={formik.touched}
          errors={formik.errors}
          handleTimeChange={handleTimeChange}
        />

        <Button
          type='submit'
          variant='contained'
          sx={{
            m: '2rem',
            bgcolor: 'third.main',
            padding: '0.4em 2em',
            fontWeight: 700,
            fontSize: '1.2rem',
            color: 'primary.dark',
            '&:hover': {
              background: '#ccb7c0',
            },
          }}
        >
          Update
        </Button>
      </form>
    </Grid>
  );
}

export default UpdateShiftForm;
