import { Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { updateDoctorShift } from '../../../../../redux/features/booking/bookingSlice';
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
  const { startDate, endDate, startTime, endTime } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ! handleChange for TimerPicker
  const handleTimeChange = (fieldName) => (time) => {
    // const hour = moment(time.$d).format('HH');
    // const min = moment(time.$d).format('mm');
    // const formattedTime = `${hour}:${min}`;
    formik.setFieldValue(fieldName, time);
    setFormData({ ...formData, [fieldName]: time });
  };
  // ! handleChange For DatePicker ------
  const handleFieldChange = (fieldName) => (value) => {
    // const formattedDate = value?.toISOString();
    formik.setFieldValue(fieldName, value);
    setFormData({ ...formData, [fieldName]: value });
  };

  // ! ------ Update Doctor Shift -------------
  const UpdateDoctorShift = async () => {
    const userData = {
      startTime,
      endTime,
      startDate,
      endDate,
      id,
    };

    await dispatch(updateDoctorShift(userData));
    navigate(`/admin/doctors/${id}`);
  };

  // !----------- userFormik ------------------
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      UpdateDoctorShift(values);
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
            borderRadius: '10px',
            padding: '8px 20px',
            fontWeight: 'bold',
            fontSize: '1.4rem',
            color: 'primary.dark',
            minWidth: '8em',
            bgcolor: 'fourth.main',
            textTransform: 'uppercase',
            m: '1em 0',
            '&:hover': {
              backgroundColor: '#ccc6b4',
              color: '#fff',
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
