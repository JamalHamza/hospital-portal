import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminRoutes = ({ children }) => {
  const { isLoading, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
    console.log(user);
  let aut = { token: false };

  useEffect(() => {
    if (!aut.token) {
      toast.error('You are logged in not as Admin!');
      navigate('/profile');
    }
  }, []);

  return children;
};

export default AdminRoutes;
