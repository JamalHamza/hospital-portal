import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// *-----------------------------
// *-------CHAT-----------------
// *-----------------------------

// ! Search Doctor -------------
const searchDoctor = async (userData) => {
  const response = await axios.get(BACKEND_URL + '/api/chat/doctors', {
    params: userData,
  });
  return response.data;
};
// ! Get Chats ------------------
const getChats = async () => {
  const response = await axios.get(BACKEND_URL + '/api/chat');
  return response.data;
};
// ! Access/Create Chat ---------
const accessChat = async (userData) => {
  console.log(userData);
  const response = await axios.post(BACKEND_URL + '/api/chat', userData);
  return response.data;
};

// * -----------------------------
const chatServices = {
  searchDoctor,
  accessChat,
  getChats,
};

export default chatServices;
