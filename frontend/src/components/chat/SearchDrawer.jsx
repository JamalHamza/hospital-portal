import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchDoctor } from '../../redux/features/chat/chatSlice';

function SearchDrawer() {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.chat);
  console.log(doctors);
  const [search, setSearch] = useState('');
  const handleSearch = async (e) => {
    e.preventDefault();
    const searchData = {
      search,
    };
    await dispatch(searchDoctor(searchData));
  };
  return (
    <>
      <form onSubmit={handleSearch}>
        <TextField
          id='search'
          label='Search User'
          variant='filled'
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button type='submit' variant='contained'>
                <SearchIcon />
              </Button>
            ),
          }}
        />
      </form>
    </>
  );
}

export default SearchDrawer;
