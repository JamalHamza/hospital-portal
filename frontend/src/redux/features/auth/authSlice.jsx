import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authService from './authServices';

const initialState = {
  isLoggedIn: false,
  user: null,
  users: [],
  towFactors: false,
  isError: false,
  isSuccess: false,
  is: false,
  isLoading: false,
  message: '',
  verifiedUsers: 0,
  suspendedUsers: 0,
};

// ! Register User ----------------
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
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

// ! Login User -----------------
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
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
// ! Logout User -----------------
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString() ||
      response.message;
    return thunkAPI.rejectWithValue(message);
  }
});
// ! LoginStatus User -----------------
export const loginStatus = createAsyncThunk(
  'auth/loginStatus',
  async (_, thunkAPI) => {
    try {
      return await authService.loginStatus();
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
// ! Get User Profile -----------------
export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    return await authService.getUser();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString() ||
      response.message;
    return thunkAPI.rejectWithValue(message);
  }
});
// ! Update User -----------------
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData);
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
// ! Send Verification Eamil -----------------
export const sendVerificationEmail = createAsyncThunk(
  'auth/sendVerificationEmail',
  async (_, thunkAPI) => {
    try {
      return await authService.sendVerificationEmail();
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
// ! Change Password -----------------
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (userData, thunkAPI) => {
    try {
      return await authService.changePassword(userData);
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
// ! Verify User -----------------
export const verifyUser = createAsyncThunk(
  'auth/verifyUser',
  async (verificationToken, thunkAPI) => {
    try {
      return await authService.verifyUser(verificationToken);
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

// ! Forgot User -----------------
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (verificationToken, thunkAPI) => {
    try {
      return await authService.forgotPassword(verificationToken);
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

// ! Reset password -----------------
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ userData, resetToken }, thunkAPI) => {
    try {
      console.log(userData, resetToken);
      return await authService.resetPassword(userData, resetToken);
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
// ! Get Users -----------------
export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async (_, thunkAPI) => {
    try {
      return await authService.getUsers();
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
// ! Delete User -----------------
export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (id, thunkAPI) => {
    try {
      return await authService.deleteUser(id);
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
// ! Upgrade User -----------------
export const upgradeUser = createAsyncThunk(
  'auth/upgradeUser',
  async (userData, thunkAPI) => {
    try {
      return await authService.upgradeUser(userData);
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
// ! Send Login Code -----------------
export const sendLoginCode = createAsyncThunk(
  'auth/sendLoginCode',
  async (email, thunkAPI) => {
    try {
      return await authService.sendLoginCode(email);
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
// ! Login With Code -----------------
export const loginWithCode = createAsyncThunk(
  'auth/loginWithCode',
  async ({ code, email }, thunkAPI) => {
    try {
      return await authService.loginWithCode(code, email);
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
// ! Login With Google -----------------
export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (userToken, thunkAPI) => {
    try {
      return await authService.loginWithGoogle(userToken);
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

// * -------------------------------

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    RESET(state) {
      state.towFactors = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    CALC_VERIFIED_USER(state) {
      const array = [];
      state.users.map((user) => {
        const { isVerified } = user;
        return array.push(isVerified);
      });
      let count = 0;
      array.forEach((item) => {
        if (item === true) {
          count += 1;
        }
      });
      state.verifiedUsers = count;
    },
    CALC_SUSPENDED_USER(state, action) {
      const array = [];
      state.users.map((user) => {
        const { role } = user;
        return array.push(role);
      });
      let count = 0;
      array.forEach((item) => {
        if (item === 'suspended') {
          count += 1;
        }
      });
      state.suspendedUsers = count;
    },
  },
  extraReducers: (builder) => {
    builder
      // ! REGISTER USER ------------------
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        console.log(action.payload);
        toast.success('Registration successful');
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })
      // ! LOGIN USER -----------------
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success('Login  successful');
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
        if (action.payload.includes('New browser')) {
          state.towFactors = true;
        }
      })
      // ! LOGOUT USER -----------------
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        toast.success(action.payload);
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! LoginStatus USER ---------------
      .addCase(loginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
        toast.success(action.payload);
      })
      .addCase(loginStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
      })
      // ! Get User Profile ---------------
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Update User ---------------
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success('User Updated');
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Send Verification Email--------------
      .addCase(sendVerificationEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendVerificationEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Verify User--------------
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Change Password --------------
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Forgot Password --------------
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Reset Password --------------
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Get Users --------------
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Delete User --------------
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Upgrade User --------------
      .addCase(upgradeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upgradeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(upgradeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Send Login Code --------------
      .addCase(sendLoginCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendLoginCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(sendLoginCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // ! Login With Code --------------
      .addCase(loginWithCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.towFactors = false;
        state.user = action.payload;
        toast.success(action.payload);
      })
      .addCase(loginWithCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })
      // ! Login With Google --------------
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success('Login Successful');
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectorUser = (state) => state.auth.user;

// ~ -----------------------------------
export const { RESET, CALC_VERIFIED_USER, CALC_SUSPENDED_USER } =
  authSlice.actions;
export default authSlice.reducer;
