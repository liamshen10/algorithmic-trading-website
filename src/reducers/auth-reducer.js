import { createSlice } from "@reduxjs/toolkit";
import { register } from "../services/auth-thunks";

const authSlice = createSlice({
    name: "auth",
    initialState: { currentUser: null },
    reducers: {},
    extraReducers: {
    [register.fulfilled]: (state, { payload }) => {
        state.currentUser = payload;
        },
    },
    });

export default authSlice.reducer;
