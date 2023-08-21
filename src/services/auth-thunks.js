import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from "./auth-service";
import { fetchReviews } from "./details-thunks";

export const register = createAsyncThunk(
  "user/register", async (credentials) => {
    const user = await authService.register(credentials);
    return user;
});


export const login = createAsyncThunk(
  "user/login",
  async (credentials, { dispatch }) => {
    const user = await authService.login(credentials);
    if (user.role === 'reviewer') {
      await dispatch(fetchReviews(user._id)); // Fetch all reviews for the logged-in user
    }
    return user;
  }
);

 export const logout = createAsyncThunk(
  "user/logout", async () => {
  return await authService.logout();
 });


 export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile", async (profileId) => {
    const profile = await authService.getProfile(profileId);
    return profile;
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile", async ({id, profileUpdate}) => {
    const updatedProfile = await authService.updateProfile(id, profileUpdate);
    return updatedProfile;
  }
);

export const fetchDeletedReviews = createAsyncThunk(
  "admin/fetchDeletedReviews",
  async (searchTerm) => {
    const deletedReviews = await authService.fetchDeletedReviews(searchTerm);
    return deletedReviews;
  }
);

  export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async () => {
      const users = await authService.fetchUsers();
      return users;
    }
  );