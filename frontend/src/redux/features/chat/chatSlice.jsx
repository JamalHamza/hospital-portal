import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import chatServices from './chatServices';

const initialState = {
  isLoading: false,
  selectedChat: null,
  doctors: [],
  chats: [],
  notification: [],
};

// ! Search Doctors ---------------
export const searchDoctor = createAsyncThunk(
  '/searchDoctor',
  async (userData, thunkAPI) => {
    try {
      return await chatServices.searchDoctor(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ! Get Chats ---------------
export const getChats = createAsyncThunk(
  '/getChats',
  async (userData, thunkAPI) => {
    try {
      return await chatServices.getChats(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ! Access/Create Chat ------------
export const accessChat = createAsyncThunk(
  '/accessChat',
  async (userData, thunkAPI) => {
    try {
      return await chatServices.searchDoctor(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const bookingSLice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ! Search Doctor -----------
      .addCase(searchDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload;
      })
      .addCase(searchDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Get Chats -----------
      .addCase(getChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload;
      })
      .addCase(getChats.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Access/Create Chat ------------
      .addCase(accessChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(accessChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload;
      })
      .addCase(accessChat.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

// ~ ----------------------------------------------
export const {} = bookingSLice.actions;
export default bookingSLice.reducer;
