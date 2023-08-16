import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from "./auth-service";

export const register = createAsyncThunk(
  "user/register", async (credentials) => {
    const user = await authService.register(credentials);
    return user;
});