import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../redux/features/auth/authServices';

const AdminRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let user;
    let admin;
    const isAdmin = async () => {
      try {
        user = await authService.getUser();
        admin = user.role == 'admin';
        console.log(admin);
      } catch (error) {
        console.log(error.message);
      }

      if (!admin) {
        toast.error('You are not logged in as Admin!');
        navigate('/login');
        return;
      }
    };
    isAdmin();
  }, [navigate]);

  // ! =============================

  return <Outlet />;
};

export default AdminRoutes;
