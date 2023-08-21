import axios from 'axios';
const api = axios.create({ withCredentials: true });
const apiBaseURL = 'http://localhost:4000';

export const register = async ({ username, password, role }) => {
  const response = await api.post(`${apiBaseURL}/register`, { username, password, role });
  return response.data;
};

export const logout = async () => {
  const response = await api.post(`${apiBaseURL}/logout`);
  return response.data;
 };


export const login = async ({ username, password }) => {
  const response = await api.post(`${apiBaseURL}/login`, { username, password });
  return response.data;
 };

 export const getProfile = async (profileId) => {
  const response = await api.get(`${apiBaseURL}/profile/${profileId}`);
  return response.data;
};

export const updateProfile = async (id, profileUpdate) => {
  const response = await api.put(`${apiBaseURL}/profile/${id}`, profileUpdate);
  console.log(response.data);
  return response.data;
};

export const fetchDeletedReviews = async (searchTerm) => {
  const response = await api.get(`${apiBaseURL}/reviews-deleted/${searchTerm}`);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await api.get(`${apiBaseURL}/users`);
  return response.data;
};
