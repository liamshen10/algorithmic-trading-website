import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from "./auth-service";

export const register = createAsyncThunk(
  "user/register", async (credentials) => {
    const user = await authService.register(credentials);
    return user;
});


export const login= createAsyncThunk(
  "user/login", async (credentials) => {
    const user = await authService.login(credentials);
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
