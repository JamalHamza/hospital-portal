import DownloadIcon from '@mui/icons-material/Download';
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFiles } from '../../../redux/features/booking/bookingSlice';

const styleText = {
  fontSize: '1.6rem',
  fontWeight: '700',
  color: 'primary.dark',
  ml: '2em',
};
const styleIcon = {
  download: {
    fontSize: '2rem',
    color: 'green',
  },
  delete: {
    fontSize: '2rem',
    color: 'red',
  },
};

function File() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { files, isLoading } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);

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

  //   ! ------------------------------------------------
  useEffect(() => {
    const appointmentId = localStorage.getItem('appointmentId').slice(1, -1);

    console.log(appointmentId);
    if (user) {
      const userData = {
        appointmentId,
      };
      dispatch(getFiles(userData));
    }
  }, [dispatch, user]);
  return (
    <Grid item xs={12} sm={12} md={12} mt={3}>
      {!isLoading || !files ? (
        <>
          <Typography sx={styleText}>Results or Analysis</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Download</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files?.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => downloadFile(item?._id)}>
                      <DownloadIcon sx={styleIcon.download} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        ''
      )}
    </Grid>
  );
}

export default File;
