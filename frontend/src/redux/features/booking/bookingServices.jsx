import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/admin`;

// ! Register(Add Doctor) ---------------------
const addDcotor = async (userData) => {
  const response = await axios.post(API_URL + '/addDoctor', userData);
  return response.data;
};

// ! Get All Doctors --------------------------
const getDoctors = async () => {
  const response = await axios.get(API_URL + '/getDoctors');
  return response.data;
};

const bookingService = {
  addDcotor,
  getDoctors,
};

export default bookingService;
