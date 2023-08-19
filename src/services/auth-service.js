import axios from 'axios';
const api = axios.create({ withCredentials: true });
const apiBaseURL = 'http://localhost:4000';

export const register = async ({ username, password, role }) => {
  const response = await api.post(`${apiBaseURL}/register`, { username, password, role });
  return response.data;
};


export const login = async ({ username, password }) => {
  const response = await api.post(`${apiBaseURL}/login`, { username, password });
  return response.data;
 };