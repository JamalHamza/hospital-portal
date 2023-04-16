import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import bookingService from './bookingServices';

const initialState = {
  isLoggedIn: false,
  doctor: null,
  doctors: [],
  isError: false,
  isSuccess: false,
  is: false,
  // towFactors: false,
  // isLoading: false,
  message: '',
};

// ! Add Doctor ----------------
export const addDoctor = createAsyncThunk(
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

// ! Get Doctors ---------------
export const getDoctors = createAsyncThunk(
  'auth/getDoctors',
  async (_, thunkAPI) => {
    try {
      return await bookingService.getDoctors();
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

// * ---------------------------------------

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ! Add New Doctor -----------
      .addCase(addDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.doctor = action.payload;
        console.log(action.payload);
        toast.success('New Doctor Added');
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.doctor = null;
        toast.error(action.payload);
      })
      // ! Get All Doctors
      .addCase(getDoctors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.doctors = action.payload;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

// ~ ------------------------------------------
export const {} = bookingSlice.actions;
export default bookingSlice.reducer;
