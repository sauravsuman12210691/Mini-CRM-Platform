import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const checkSession = async () => {
  try {
    const res = await axios.get(`${apiUrl}/auth/check-session`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const logoutUser = async () => {
  try {
    await axios.get(`${apiUrl}/auth/logout`, {
      withCredentials: true,
    });
  } catch (err) {
    throw err;
  }
};
