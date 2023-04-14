import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookingService from './bookingServices';

const initialState = {
  isLoggedIn: false,
  doctor: null,
  doctors: [],
  towFactors: false,
  isError: false,
  isSuccess: false,
  is: false,
  isLoading: false,
  message: '',
};

// ! Register User ----------------
export const register = createAsyncThunk(
  'booking/addDoctor',
  async (userData, thunkAPI) => {
    try {
      return await bookingService.addDcotor(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * ---------------------------------------

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ! ADD NEW DOCTOR
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.doctor = action.payload;
        console.log(action.payload);
        toast.success('New Doctor Added');
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      });
  },
});

// ~ ------------------------------------------
export const {} = bookingSlice.actions;
export default bookingSlice.reducer;
