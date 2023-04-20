import { createTheme, ThemeProvider } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layout/Layout';
import AddDoctor from './pages/admin/addDoctor/AddDoctor';
import Doctors from './pages/admin/doctors/Doctors';
import SingleDoctor from './pages/admin/singleDoctor/SingleDoctor';
import UpdateDoctorShift from './pages/admin/updateDoctorShift/UpdateDoctorShift';
import Forgot from './pages/auth/Forgot';
import Login from './pages/auth/Login';
import LoginWithCode from './pages/auth/LoginWithCode';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';
import Verify from './pages/auth/Verify';
import ChangePassword from './pages/changePassword/ChangePassword';
import Home from './pages/home/Home';
import ProfileAdmin from './pages/profile/Profile';
import UserList from './pages/userList/UserList';
import {
  getUser,
  loginStatus,
  selectIsLoggedIn,
  selectorUser,
} from './redux/features/auth/authSlice';
axios.defaults.withCredentials = true;

const theme = createTheme({
  palette: {
    menu: {
      main: '#537FE7',
      light: '#537FE7',
    },
    form: {
      main: '#fff',
    },
    primary: {
      dart: '#454066',
      main: '#ADA2FF',
      light: '#dcd7ff',
    },
    secondary: {
      main: '#C0DEFF',
      light: '#d2e7ff',
    },
    third: {
      dark: '#ccb7c0',
      main: '#FFE5F1',
      light: '#ffeff6',
    },
    fourth: {
      dark: '#ccc6b4',
      main: '#FFF8E1',
      light: '#fffaea',
    },
    btn: {
      main: '#000205',
    },
    btnAlert: {
      main: '#D61355',
    },
  },
});

function App() {
  const dispatch = useDispatch();

  const isLogin = useSelector(selectIsLoggedIn);
  const user = useSelector(selectorUser);

  useEffect(() => {
    dispatch(loginStatus());
    if (isLogin && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLogin, user]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer
          pauseOnHover='false'
          hideProgressBar
          autoClose={400}
          position='center'
          theme='colored'
          bodyClassName='toast'
        />
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_REACT_GOOGLE_CLIENT_ID}
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot' element={<Forgot />} />
            <Route path='/resetPassword/:resetToken' element={<Reset />} />
            <Route path='/loginWithCode/:email' element={<LoginWithCode />} />
            <Route
              path='/verify/:verificationToken'
              element={
                <Layout>
                  <Verify />
                </Layout>
              }
            />
            <Route
              path='/profile'
              element={
                <Layout>
                  <ProfileAdmin />
                </Layout>
              }
            />
            <Route
              path='/changePassword'
              element={
                <Layout>
                  <ChangePassword />
                </Layout>
              }
            />
            <Route
              path='/users'
              element={
                <Layout>
                  <UserList />
                </Layout>
              }
            />
            {/* ________________ */}
            <Route
              path='/admin/addDoctor'
              element={
                <Layout>
                  <AddDoctor />
                </Layout>
              }
            />
            <Route
              path='/admin/doctors'
              element={
                <Layout>
                  <Doctors />
                </Layout>
              }
            />
            <Route
              path='/admin/doctors/:id'
              element={
                <Layout>
                  <SingleDoctor />
                </Layout>
              }
            />
            <Route
              path='/admin/doctors/updateShift/:id'
              element={
                <Layout>
                  <UpdateDoctorShift />
                </Layout>
              }
            />
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
