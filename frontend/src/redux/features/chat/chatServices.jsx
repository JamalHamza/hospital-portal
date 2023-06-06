import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// *-----------------------------
// *-------CHAT-----------------
// *-----------------------------

// ! Search Chat/Create Chat ----
const getChat = async (search) => {
    const response = await axios.get(BACKEND_URL + '/chat')
}