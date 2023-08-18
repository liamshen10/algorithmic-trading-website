import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile, updateProfile } from "../services/profile-thunks.js";

const profileSlice = createSlice({
  name: "profile",
  initialState: { profile: {} },
  reducers: {},
  extraReducers: {
    [fetchProfile.fulfilled]: (state, { payload }) => {
      state.profile = payload;
    },
    [updateProfile.fulfilled]: (state, { payload }) => {
      state.profile = payload;
    },
  },
});

export default profileSlice.reducer;
