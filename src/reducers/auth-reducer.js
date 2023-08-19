import { createSlice } from "@reduxjs/toolkit";
import { register, login, fetchProfile, updateProfile } from "../services/auth-thunks";

const authSlice = createSlice({
    name: "auth",
    initialState: { currentUser: null },
    reducers: {},
    extraReducers: {
    [register.fulfilled]: (state, { payload }) => {
        console.log("Register Paylod: ", payload);
        state.currentUser = payload;
        },
    [login.fulfilled]: (state, { payload }) => {
        console.log("Login Paylod: ", payload);
            state.currentUser = payload;
          },
    [fetchProfile.fulfilled]: (state, { payload }) => {
            console.log("Get Profile payload: ", payload);
            state.currentUser = payload;
          },
    [updateProfile.fulfilled]: (state, { payload }) => {
            console.log("Update Profile payload: ", payload);
            state.currentUser = payload;
          },
    },
    });

export default authSlice.reducer;
