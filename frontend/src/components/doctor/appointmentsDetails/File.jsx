import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addFile } from '../../../redux/features/booking/bookingSlice';

const styleText = {
  fontSize: '1.6rem',
  fontWeight: '700',
  color: 'primary.dark',
};

function File({ patient, doctor }) {
  const values = ['Item 1', 'Item 2', 'Item 3'];
  const data = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Mary', age: 25 },
    { id: 3, name: 'Bob', age: 40 },
    { id: 3, name: 'Bob', age: 40 },

  ];
  const { id } = useParams();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const { items } = useSelector((state) => state.booking);
  console.log(items?.item?._id);

  // ! ----------------------------------------

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        appointmentId: id,
        patientId: patient?._id,
        doctorId: doctor?._id,
        name,
        file,
      };
      await dispatch(addFile(userData));
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  // ! Download appointments----------------------------
  // ! Download appointments----------------------------
  const downloadFile = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/doctor/download/${id}`,
        { responseType: 'blob' }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'file.pdf';
      link.click();
    } catch (error) {
      console.log(error);
    }
  };
  // ! --------------------------------------------
  return (
    <Grid item xs={12} sm={12} md={12}>
      <Typography sx={styleText}>Results or Analysis</Typography>
      <form onSubmit={addItem}>
        <TextField
          name='name'
          label='File Title'
          type='text'
          variant='outlined'
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ margin: '4px', width: '20%' }}
        />
        <TextField
          name='file'
          type='file'
          onChange={(e) => setFile(e.target.files[0])}
          style={{ margin: '4px', width: '20%' }}
        />
        <Button variant='contained' onClick={addItem} sx={{ mt: '1.3em' }}>
          Add
        </Button>
      </form>
      {/* {<div className='items'>
         {items &&
          items?.map((item) => (  */}
        <div className='item'>
          <h3>{items?.item?.name}</h3>
          <button onClick={() => downloadFile(items?.item?._id)}>
            Download File
          </button>
        {/* </div> */}
        
      </div> 
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
}

export default File;
