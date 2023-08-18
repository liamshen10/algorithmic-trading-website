import axios from 'axios';
const api = axios.create({ withCredentials: true });
const apiBaseURL = 'http://localhost:4000';

export const getProfile = async (profileId) => {
  const response = await api.get(`${apiBaseURL}/profile/${profileId}`);
  return response.data;
};

export const updateProfile = async (profileUpdate) => {
  const response = await api.put(`${apiBaseURL}/profile`, profileUpdate);
  return response.data;
};
