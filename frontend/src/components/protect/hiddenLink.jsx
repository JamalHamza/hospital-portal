import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectorUser,
} from '../../redux/features/auth/authSlice';

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log(isLoggedIn);
  if (isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

export const AdminAutoLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectorUser);
  const role = userRole?.role;
  if (isLoggedIn && (role === 'admin' || role === 'author')) {
    return <>{children}</>;
  }
  return null;
};
