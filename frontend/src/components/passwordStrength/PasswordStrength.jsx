import { Box } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { ImCheckmark, ImCross } from 'react-icons/im';

function PasswordStrength({password, password2}) {
  // ! ------- Password Strength Indicator ------------
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passMatch, setPassMatch] = useState(false);
  // ! -----------------------------------------------

  // ! ---- Dynamic function for passwrod stength ----
  const timesIcon = <ImCross size={8} color='red' />;
  const checkIcon = <ImCheckmark size={8} color='green' />;
  ImCross;

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    } else {
      return timesIcon;
    }
  };

  // ! ------------------------

  // ! ----- password & password2 check -------
  useEffect(() => {
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    // Check for special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
    // Check for PASSWORD LENGTH
    if (password.length > 6) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
    // Check for Password Match
    if (password === password2 && password.length > 0 && password2.length > 0) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  }, [password, password2]);


  // ! ------------------------------

  return (
    <Box sx={{border: '1px solid orange'}}>
      <ul className='form-list'>
        <li>
          <span>
            {switchIcon(uCase)}
            &nbsp; Lowercase & UpperCase
          </span>
        </li>
        <li>
          <span>
            {switchIcon(num)}
            &nbsp; Number (0-9)
          </span>
        </li>
        <li>
          <span>
            {switchIcon(sChar)}
            &nbsp; Special Character(!@#$%^&*)
          </span>
        </li>
        <li>
          <span>
            {switchIcon(passLength)}
            &nbsp; At least 6 Character
          </span>
        </li>
        <li>
          <span>
            {switchIcon(passMatch)}
            &nbsp; Password Match
          </span>
        </li>
      </ul>
    </Box>
  );
}

export default PasswordStrength;
