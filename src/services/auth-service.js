import axios from 'axios';

const api = axios.create({ withCredentials: true });
const apiBaseURL = 'http://localhost:4000';

export const register = async ({ username, password, email, role }) => { // Include email parameter
  const response = await api.post(`${apiBaseURL}/register`, { username, password, email, role }); // Include email in request payload
  return response.data;
};

export const login = async ({ username, password }) => {
  const response = await api.post(`${apiBaseURL}/login`, { username, password });
  const user = response.data;
  return user;
};

// Added getUser function to get user information by userId
export const getUser = async (userId) => {
  const response = await api.get(`${apiBaseURL}/user/${userId}`);
  return response.data;
};

// Added updateUser function to update user's email and username by userId
export const updateUser = async (userId, userUpdate) => {
  const response = await api.put(`${apiBaseURL}/user/${userId}`, userUpdate);
  return response.data;
};