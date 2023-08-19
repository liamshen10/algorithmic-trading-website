import { createSlice } from "@reduxjs/toolkit";
import { register, login, getUser, updateUser } from "../services/auth-thunks";

const authSlice = createSlice({
  name: "auth",
  initialState: { currentUser: null },
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
    },
    [getUser.fulfilled]: (state, { payload }) => { // Handling the getUser thunk
      state.currentUser = payload;
    },
    [updateUser.fulfilled]: (state, { payload }) => { // Handling the updateUser thunk
      state.currentUser = payload; // Assuming the updated user is returned
    },
  },
});

export default authSlice.reducer;
