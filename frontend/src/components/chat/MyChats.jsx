import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react';

const MyChats = () => {
  const handleSearch = (event) => {
    event.preventDefault();
    // Handle search logic here
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <TextField
          id='search'
          label='Search User'
          variant='filled'
          fullWidth
          InputProps={{
            endAdornment: (
              <Button type='submit' variant='contained'>
                <SearchIcon />
              </Button>
            ),
          }}
        />
      </form>
      {/* Add the rest of your MyChats component content here */}
    </div>
  );
};

export default MyChats;
