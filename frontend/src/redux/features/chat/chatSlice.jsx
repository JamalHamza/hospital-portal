import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedChat: null,
  chats: [],
  notification: [],
};

const bookingSLice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
    // ! ------
  },
});

// ~ ----------------------------------------------
export const {} = bookingSLice.actions;
export default bookingSLice.reducer;
