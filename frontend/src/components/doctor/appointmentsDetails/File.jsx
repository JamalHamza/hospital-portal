import { Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { CustomButtonOne } from '../../customUtils/customButtons/CustomButtonOne';

const styleText = {
  fontSize: '1.6rem',
  fontWeight: '700',
  color: 'primary.dark',
};

const styleForm = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

const initialValues = {
  name: '',
  file: '',
};

// ! ------ Yup Validation ------------------
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Title is required'),
  file: Yup.string().required('File is required'),
});

function File() {
  // ! --------------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    setFormData({ ...formData, [name]: value });
  };
  // ! --------------------------------------------
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
    },
  });
  return (
    <Grid item xs={12} sm={12} md={5.8}>
      <Typography sx={styleText}>Results or Analysis</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          name='name'
          label='File Title'
          type='text'
          variant='outlined'
          value={formik.values.name}
          onChange={handleChange}
          style={{ margin: '4px', width: '40%' }}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          name='file'
          type='file'
          variant='outlined'
          value={formik.values.email}
          onChange={handleChange}
          style={{ margin: '4px', width: '40%' }}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <CustomButtonOne label='Add' />
      </form>
    </Grid>
  );
}

export default File;
