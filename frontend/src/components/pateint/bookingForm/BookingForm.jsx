import { Box, Button, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useState } from 'react';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { checkAvailability } from '../../../redux/features/booking/bookingSlice';

// ! -------- Form Validation ----------------
const validationSchema = Yup.object().shape({
  appointmentDate: Yup.date().required('Please select a date'),
});

function BookingForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, doctor, appointmentBooks, isSuccess } = useSelector(
    (state) => state.booking
  );

  // ! Checking for Doctor's workday 
  const checkForTodayDate =
    dayjs(doctor?.startDate) > dayjs(new Date())
      ? dayjs(doctor?.startDate)
      : dayjs(new Date());

  const initialValues = {
    appointmentDate: checkForTodayDate,
  };

  const [formData, setFormData] = useState(initialValues.appointmentDate);

  // ! handleChange For DatePicker ------
  const handleFieldChange = (fieldName) => (value) => {
    formik.setFieldValue(fieldName, value);
    setFormData(value);
  };

  // ! Submit Function ---------------
  const submitDate = async () => {
    const doctorId = id;
    const getDateFromDatePicker = new Date(formData);
    // ! save it to localStorage to use it in BookingTime page
    localStorage.setItem('bookingTime', JSON.stringify(getDateFromDatePicker));
    // ! -----------------------------------------------------
    const userData = { doctorId, appointmentDate: getDateFromDatePicker };
    await dispatch(checkAvailability(userData));
    navigate(`/patient/allDoctors/booking/time/${id}`);
  };

  //  ! --------------------
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      submitDate(values);
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
                    value={formData}
                    disablePast={true}
                    minDate={checkForTodayDate}
                    maxDate={dayjs(doctor?.endDate)}
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
              m: '1em auto',
              '&:hover': {
                backgroundColor: '#ccc6b4',
                color: '#fff',
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Grid>
  );
}
export default BookingForm;
