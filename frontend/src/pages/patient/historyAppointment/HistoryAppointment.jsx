import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Box, Grid, IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HistoryImg from '../../../assets/patient/history.png';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import Loader from '../../../components/loader/Loader';
import { getAppointments } from '../../../redux/features/booking/bookingSlice';
import './HistoryAppointment.css';

function HistoryAppointment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.auth);
  const { appointments } = useSelector((state) => state.booking);
  //  ! ----------------------------------------------------------

  // ! filterAppointments that is old
  const todayDate = moment(new Date()).format('YYYY:MM:DD');
  const oldDate = appointments?.filter((date) => {
    const formattedDate = moment(date.appointmentDate).format('YYYY:MM:DD');
    return formattedDate < todayDate;
  });

  const upComing = appointments?.filter((date) => {
    const formattedDate = moment(date.appointmentDate).format('YYYY:MM:DD');
    return formattedDate >= todayDate;
  });

  // ! ----------------------------------------------------------
  useEffect(() => {
    if (user?._id) {
      const userData = { patientId: user._id };
      dispatch(getAppointments(userData));
    }
  }, [dispatch, user]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <FormWrapper
          title={'Your Appointment History'}
          img={HistoryImg}
          altImg={'Your Appointment History'}
        >
          <Box sx={{ width: '90%', m: '0 auto' }}>
            <Grid container minWidth='100%'>
              {appointments.length < 1 ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    width: '20rem',
                    m: '0 auto',
                  }}
                >
                  <SentimentVeryDissatisfiedIcon
                    sx={{ fontSize: '3rem', color: 'secondary.dark' }}
                  />
                  <Typography
                    sx={{
                      fontSize: '2rem',
                      color: 'third.dark',
                      ml: '0.4em',
                      textAlign: 'center',
                    }}
                  >
                    History is empty
                  </Typography>
                </Box>
              ) : (
                <>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography
                      sx={{
                        fontSize: '2rem',
                        color: 'primary.main',
                        ml: '0.4em',
                      }}
                    >
                      Upcoming Appointments
                    </Typography>

                    {upComing.length < 1 ? (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          width: '20rem',
                          m: '0 auto',
                        }}
                      >
                        <SentimentVeryDissatisfiedIcon
                          sx={{ fontSize: '3rem', color: 'secondary.dark' }}
                        />
                        <Typography
                          sx={{
                            fontSize: '2rem',
                            color: 'third.dark',
                            ml: '0.4em',
                            textAlign: 'center',
                          }}
                        >
                          Upcoming Appointments is empty
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        {upComing?.map((appointment) => {
                          const formattedDate = moment(
                            appointment.appointmentDate
                          ).format('MMM Do YY');
                          const formattedTime = moment(
                            appointment.appointmentTime
                          ).format('HH:mm');
                          return (
                            <Accordion
                              key={appointment._id}
                              sx={{ bgcolor: 'secondary.light' }}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='panel1a-content'
                                id='panel1a-header'
                              >
                                <Typography
                                  sx={{
                                    color: 'secondary.dark',
                                    fontSize: '1.6rem',
                                    fontWeight: '700',
                                  }}
                                >
                                  {formattedDate}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Box
                                  sx={{
                                    border: '1px solid',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    borderColor: 'third.dark',
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      color: 'primary.dark',
                                      fontSize: '1.5rem',
                                      fontWeight: '500',
                                    }}
                                  >
                                    {formattedTime}
                                  </Typography>
                                  <IconButton>
                                    <ContentPasteGoIcon
                                      sx={{
                                        fontSize: '2.6rem',
                                        color: 'secondary.dark',
                                      }}
                                    />
                                  </IconButton>
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          );
                        })}
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography
                      sx={{
                        fontSize: '2rem',
                        color: 'primary.main',
                        m: '0.4em',
                        mt: '1em',
                      }}
                    >
                      Archived
                    </Typography>
                    {oldDate.length < 1 ? (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          width: '20rem',
                          m: '0 auto',
                        }}
                      >
                        <SentimentVeryDissatisfiedIcon
                          sx={{ fontSize: '3rem', color: 'secondary.dark' }}
                        />
                        <Typography
                          sx={{
                            fontSize: '2rem',
                            color: 'third.dark',
                            ml: '0.4em',
                            textAlign: 'center',
                          }}
                        >
                          Archive is empty
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        {oldDate?.map((appointment) => {
                          const formattedDate = moment(
                            appointment.appointmentDate
                          ).format('MMM Do YY');
                          const formattedTime = moment(
                            appointment.appointmentTime
                          ).format('HH:mm');
                          return (
                            <Accordion
                              key={appointment._id}
                              sx={{ bgcolor: 'third.main' }}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='panel1a-content'
                                id='panel1a-header'
                              >
                                <Typography
                                  sx={{
                                    color: 'secondary.dark',
                                    fontSize: '1.6rem',
                                    fontWeight: '700',
                                  }}
                                >
                                  {formattedDate}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Box
                                  sx={{
                                    border: '1px solid',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    borderColor: 'secondary.main',
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      color: 'primary.dark',
                                      fontSize: '1.5rem',
                                      fontWeight: '500',
                                    }}
                                  >
                                    {formattedTime}
                                  </Typography>
                                  <IconButton>
                                    <ContentPasteGoIcon
                                      sx={{
                                        fontSize: '2.6rem',
                                        color: 'secondary.dark',
                                      }}
                                    />
                                  </IconButton>
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          );
                        })}
                      </>
                    )}
                  </Grid>{' '}
                </>
              )}
            </Grid>
          </Box>
        </FormWrapper>
      )}
    </>
  );
}

export default HistoryAppointment;
