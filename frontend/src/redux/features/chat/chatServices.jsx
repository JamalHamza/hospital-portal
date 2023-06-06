import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// *-----------------------------
// *-------CHAT-----------------
// *-----------------------------

// ! Search Chat/Create Chat ----

const searchDoctor = async (userData) => {
  const response = await axios.get(BACKEND_URL + '/api/chat/doctors', {
    params: userData,
  });
  return response.data;
};

// * -----------------------------
const chatServices = {
  searchDoctor,
};

export default chatServices;
