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
  isLoading: false,
  message: '',
  appointmentBooks: [],
  appointmentBooked: [],
};

// *-----------------------------
// *-------ADMIN-----------------
// *-----------------------------

// ! Add Doctor ----------------
export const addDoctor = createAsyncThunk(
  'booking/addDoctor',
  async (userData, thunkAPI) => {
    try {
      return await bookingService.addDoctor(userData);
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
  'booking/getDoctors',
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

// ! Get Doctors ---------------
export const getDoctor = createAsyncThunk(
  'booking/getDoctor',
  async (id, thunkAPI) => {
    try {
      return await bookingService.getDoctor(id);
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

// ! Delete Doctor ------------
export const deleteDoctor = createAsyncThunk(
  'booking/delete',
  async (id, thunkAPI) => {
    try {
      return await bookingService.deleteDoctor(id);
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

// ! Update Doctor Shift -----------------
export const updateDoctorShift = createAsyncThunk(
  'booking/updateDoctorShift',
  async (userData, thunkAPI) => {
    try {
      return await bookingService.updateDoctorShift(userData);
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

// *-----------------------------
// *-------PATIENT---------------
// *-----------------------------
// ! checkAvailability -----------------
export const checkAvailability = createAsyncThunk(
  'booking/checkAvailability',
  async (userData, thunkAPI) => {
    try {
      return await bookingService.checkAvailability(userData);
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
// ! Check Availability -----------------
export const bookingAnAppointment = createAsyncThunk(
  'booking/bookingAnAppointment',
  async (userData, thunkAPI) => {
    try {
      return await bookingService.bookingAnAppointment(userData);
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
        toast.success('New Doctor Added');
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.doctor = null;
        toast.error(action.payload);
      })
      // ! Get All Doctors --------
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
      })
      // ! Get Doctor ------------
      .addCase(getDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.doctor = action.payload;
      })
      .addCase(getDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Delete Doctor ---------
      .addCase(deleteDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Update User ---------------
      .addCase(updateDoctorShift.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDoctorShift.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(updateDoctorShift.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Check Availability -----------
      .addCase(checkAvailability.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAvailability.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.appointmentBooks = action.payload;
      })
      .addCase(checkAvailability.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Booking an Appointment.. -----------
      .addCase(bookingAnAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookingAnAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.appointmentBooked = action.payload;
      })
      .addCase(bookingAnAppointment.rejected, (state, action) => {
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
