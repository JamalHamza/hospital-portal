// import { Grid, TextField } from '@mui/material';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import React from 'react';
// // import './DataPicker.css';/

// function DatePickerDoc(props) {
//   const { values, handleChange, startDate, touched, handleBlur, errors } =
//     props;

//   // const ss = startDate?.toISOString();

//   // const formattedStartDate = startDate
//   //   ? moment(startDate).format('DD/MM/YYYY')
//   //   : '';

//   // const handleStartDateChange = (date, Start) => {
//   //   setStartDate(date);
//   // };

//   // const handleEndDateChange = (date) => {
//   //   setEndDate(date);
//   // };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={4}>
//           <DatePicker
//             sx={{ width: '100%' }}
//             label='Start Date'
//             name='startDate'
//             value={values.startDate}
//             onChange={handleChange}
//             disablePast={true}
//             TextField={(params) => <TextField {...params} />}
//             onBlur={handleBlur}
//             error={touched.startDate && Boolean(errors.startDate)}
//             helperText={touched.startDate && errors.startDate}
//           />
//         </Grid>
//         {/* <Grid item xs={12} md={4}>
//           <DatePicker
//             sx={{ width: '100%' }}
//             label='End Date'
//             name='endDate'
//             value={values.endDate}
//             disablePast={true}
//             onChange={handleChange}
//             // TextField={(params) => <TextField {...params} />}
//             onBlur={handleBlur}
//             error={touched.endDate && Boolean(errors.endDate)}
//             helperText={touched.endDate && errors.endDate}
//           />
//         </Grid> */}
//         {/* <div>Formatted Start Date: {formattedStartDate}</div> */}
//       </Grid>
//     </LocalizationProvider>
//   );
// }

// export default DatePickerDoc;
