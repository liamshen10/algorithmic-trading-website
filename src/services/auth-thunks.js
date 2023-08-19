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

 // Thunk to get user information by userId
export const getUser = createAsyncThunk(
  "user/getUser", async (userId) => {
    const user = await authService.getUser(userId);
    return user;
  }
);

// Thunk to update user's email and username by userId
export const updateUser = createAsyncThunk(
  "user/updateUser", async (userUpdateData) => {
    const { userId, email, username } = userUpdateData;
    const updatedUser = await authService.updateUser(userId, { email, username });
    return updatedUser;
  }
);
