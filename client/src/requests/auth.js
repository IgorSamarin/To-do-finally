import axios from 'axios';
import jwt_decode from 'jwt-decode';

const apiUrl = process.env.REACT_APP_BASE_URL;

export const loginUser = async (username, password) => {
  try {
    const result = await axios.post(`${apiUrl}/user/login`, {
      username,
      password,
    });
    if (result.data) {
      console.log(result.data);
      localStorage.setItem('token', result.data);
    }
    return result.data;
  } catch (e) {
    return e.response.data;
  }
};

export const registrationUser = async (username, password) => {
  try {
    const result = await axios.post(`${apiUrl}/user/registration`, {
      username,
      password,
    });
    if (result.data) {
      localStorage.setItem('token', result.data);
    }
    return result.data;
  } catch (e) {
    return e.response.data;
  }
};
export const signOut = () => {
  localStorage.removeItem('token');
};
export const checkUser = () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      return jwt_decode(token);
    }
  } catch (err) {
    alert(err.message);
  }
};

