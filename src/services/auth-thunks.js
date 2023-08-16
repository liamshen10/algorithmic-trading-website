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

