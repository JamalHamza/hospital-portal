import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import '../../pages/auth/auth-mui-overwrited.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Password({ placeholder, value, onChange, onPaste, name }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    // <div className='password'>
    //   <input
    //     type={showPassword ? 'text' : 'password'}
    //     placeholder={placeholder}
    //     required
    //     name={name}
    //     value={value}
    //     onChange={onChange}
    //     onPaste={onPaste}
    //   />
    //   <div className='icon' onClick={togglePassword}>
    //     {showPassword ? (
    //       <VisibilityIcon fontSize='medium' />
    //     ) : (
    //       <VisibilityOffIcon fontSize='medium' />
    //     )}
    //   </div>
    // </div>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
      <TextField
        size='small'
        type={showPassword ? 'text' : 'password'}
        label={placeholder}
        value={value}
        onChange={onChange}
        onPaste={onPaste}
        name={name}
        style={{ margin: '8px', width: '100%' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={togglePassword}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default Password;
