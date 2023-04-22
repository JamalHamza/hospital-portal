import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/admin`;

// *-----------------------------
// *-------ADMIN-----------------
// *-----------------------------

// ! Register(Add Doctor) ---------------------
const addDoctor = async (userData) => {
  const response = await axios.post(API_URL + '/addDoctor', userData);
  return response.data;
};

// ! Get All Doctors --------------------------
const getDoctors = async () => {
  const response = await axios.get(API_URL + '/getDoctors');
  return response.data;
};

// ! Get Single Doctor -----------------------
const getDoctor = async (id) => {
  const response = await axios.get(API_URL + `/getDoctors/${id}`);
  return response.data;
};

// ! Delete Doctor ---------------------------
const deleteDoctor = async (id) => {
  const response = await axios.delete(API_URL + `/getDoctors/${id}`);
  return response.data;
};
// ! Delete Doctor ---------------------------
const updateDoctorShift = async (userData) => {
  const { id } = userData;
  const response = await axios.patch(API_URL + `/getDoctors/${id}`, userData);
  return response.data;
};

// *-----------------------------
// *-------PATIENT---------------
// *-----------------------------

const bookingService = {
  addDoctor,
  getDoctors,
  getDoctor,
  deleteDoctor,
  updateDoctorShift,
};

export default bookingService;
