import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminRoutes = ({ children }) => {
  const {  user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isAdmin = user?.role === 'patient';
  //   console.log(isAdmin);
  useEffect(() => {
    if (!isAdmin) {
      toast.error('You are logged in not as Admin!');
      navigate('/profile');
    }
  }, [navigate]);
  return children;
};

export default AdminRoutes;
