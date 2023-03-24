import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import './PasswordInput.scss';

function Password({ placeholder, value, onChange, onPaste, name }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className='password'>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        required
        name={name}
        value={value}
        onChange={onChange}
        onPaste={onPaste}
      />
      <div className='icon' onClick={togglePassword}>
        {showPassword ? (
          <VisibilityIcon fontSize='medium' />
        ) : (
          <VisibilityOffIcon fontSize='medium' />
        )}
      </div>
    </div>
  );
}

export default Password;
