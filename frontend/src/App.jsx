import { createTheme, ThemeProvider } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layout/Layout';
import Forgot from './pages/auth/Forgot';
import Login from './pages/auth/Login';
import LoginWithCode from './pages/auth/LoginWithCode';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';
import Verify from './pages/auth/Verify';
import ChangePassword from './pages/changePassword/ChangePassword';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
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
    primary: {
      main: '#ADA2FF',
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
          style={{ fontSize: '1.4rem' }}
          hideProgressBar
          position='bottom-left'
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
              path='/profile'
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            <Route
              path='/verify/:verificationToken'
              element={
                <Layout>
                  <Verify />
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
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
