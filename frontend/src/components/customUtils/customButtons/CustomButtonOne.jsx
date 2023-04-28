import { Button } from '@mui/material';
import React from 'react';

export const CustomButtonOne = (props) => {
  const { label, ...rest } = props;
  return (
    <Button
      type='submit'
      variant='contained'
      sx={{
        borderRadius: '10px',
        padding: '8px 20px',
        fontWeight: 'bold',
        fontSize: '1.4rem',
        minWidth: '8em',
        color: 'primary.dark',
        bgcolor: 'third.main',
        textTransform: 'uppercase',
        m: '1em 0',
        '&:hover': {
          backgroundColor: '#ccb7c0',
          color: '#fff',
        },
      }}
      {...rest}
    >
      {label}
    </Button>
  );
};

export const CustomButtonTwo = (props) => {
  const { label, ...rest } = props;
  return (
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
        margin: '0.8em',
        '&:hover': {
          backgroundColor: '#ccc6b4',
          color: '#fff',
        },
      }}
      {...rest}
    >
      {label}
    </Button>
  );
};
