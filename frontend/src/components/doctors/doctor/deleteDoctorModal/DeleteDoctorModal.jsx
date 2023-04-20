import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'form.main',
  borderRadius: '10px',
  border: 'none',
  boxShadow: 24,
  p: 3,
};

export default function DeleteDoctorModal(props) {
  const { open, handleClose, handleDelete, doctorId } = props;

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box sx={{ maxWidth: '90%', m: '0 auto' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PersonRemoveIcon
                sx={{ color: 'red', fontSize: '3rem', mr: '0.5em' }}
              />
              <Typography
                id='modal-modal-description'
                variant='h4'
                sx={{ color: 'secondary.dark' }}
              >
                Delete Doctor Account
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h6' sx={{ color: 'primary.dark' }}>
                Are you sure you want to delete your account?
              </Typography>
              <Button
                onClick={handleClose}
                sx={{
                  bgcolor: 'secondary.main',
                  margin: '0.8em',
                  padding: '0.4em 2em',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  color: 'primary.dark',
                  '&:hover': {
                    background: '#D9EBFF',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(doctorId)}
                sx={{
                  bgcolor: 'third.main',
                  margin: '0.8em',
                  padding: '0.4em 2em',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  color: 'primary.dark',
                  '&:hover': {
                    background: '#ccb7c0',
                  },
                }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
