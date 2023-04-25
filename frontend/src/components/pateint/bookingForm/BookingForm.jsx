import { Box, Button, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

// ! -------- Form Validation ----------------
const validationSchema = Yup.object().shape({
  appointmentDate: Yup.date().required('Please select a date'),
  appointmentTime: Yup.string().required('Please select the time'),
});

const initialValues = {
  appointmentDate: '',
  appointmentTime: '',
};

function BookingForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, doctor } = useSelector((state) => state.booking);
  // TODO LATER !
  // ! getting min/maxDate for DatePicker
  const mongodb = doctor?.endDate;
  const formattedDate = new Date(mongodb);
  const asdfasf = moment(formattedDate).format('YYYY-MM-DD');

  const [formData, setFormData] = useState(initialValues);
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
    const formattedDate = value?.toISOString();
    console.log('hhe');
    formik.setFieldValue(fieldName, value);
    setFormData({ ...formData, [fieldName]: formattedDate });
  };

  //  ! --------------------
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Grid item xs={12} sm={6} md={6}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ m: '0 auto', width: '80%' }}>
          <Box>
            <Typography
              variant='h5'
              sx={{
                color: 'secondary.dark',
                p: '1.2em 0.2em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4em',
                ml: '0.4rem',
                fontWeight: '700',
              }}
            >
              <BsFillCalendar2WeekFill fontSize={26} />
              Please, select date:
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ width: '100%' }}>
                  <DatePicker
                    label='Appointment Date'
                    name='appointmentDate'
                    inputFormat='DD/MM/yyyy'
                    value={formik.values.appointmentDate}
                    disablePast={true}
                    // minDate={dayjs(asdfasf)}
                    onBlur={formik.handleBlur}
                    onChange={handleFieldChange('appointmentDate')}
                    sx={{ width: '100%', m: '4px' }}
                  />
                  <Typography sx={{ color: '#D62F8D', ml: '1.6rem' }}>
                    {formik.errors.appointmentDate &&
                    formik.touched.appointmentDate ? (
                      <>{formik.errors.appointmentDate}</>
                    ) : null}
                  </Typography>
                </Box>
              </LocalizationProvider>
            </Grid>
            {/* ---------------------------------------------------- */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={12} md={6}>
                <MobileTimePicker
                  sx={{ width: '100%', margin: '4px' }}
                  label='Appointment Time'
                  minutesStep={30}
                  ampm={false}
                  name='appointmentTime'
                  value={formik.values.appointmentTime}
                  onChange={handleTimeChange('appointmentTime')}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.endDate && Boolean(formik.errors.endDate)
                  }
                  helperText={formik.touched.endDate && formik.errors.endDate}
                />
                <Typography sx={{ color: '#D62F8D', ml: '1.6rem' }}>
                  {formik.errors.appointmentTime &&
                  formik.touched.appointmentTime ? (
                    <>{formik.errors.appointmentTime}</>
                  ) : null}
                </Typography>
              </Grid>
            </LocalizationProvider>
          </Grid>
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
            Book
          </Button>
        </Box>
      </form>
    </Grid>
  );
}
export default BookingForm;
