import axios from 'axios';
const api = axios.create({ withCredentials: true });
const apiBaseURL = 'http://localhost:4000';

export const getProfile = async (profileId) => {
  const response = await api.get(`${apiBaseURL}/profile/${profileId}`);
  return response.data;
};

export const updateProfile = async (id, profileUpdate) => {
  const response = await api.put(`${apiBaseURL}/profile/${id}`, profileUpdate);
  console.log(response.data);
  return response.data;
};
