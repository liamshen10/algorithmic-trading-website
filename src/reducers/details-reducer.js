import { createSlice } from "@reduxjs/toolkit";
import { fetchDetails, fetchReviews, addReview, getReviewById } from "../services/details-thunks";



const detailsSlice = createSlice({
    name: "details",
    initialState: {
        details: null,
        reviews: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: {
        [fetchDetails.fulfilled]: (state, { payload }) => {
            state.details = payload;
        },
        [fetchReviews.fulfilled]: (state, { payload }) => {
            state.reviews = payload;
        },
        [addReview.fulfilled]: (state, { payload }) => {
            state.reviews.push(payload);
        },
        [getReviewById.fulfilled]: (state, { payload }) => {
            console.log("getReviewById Payload:", payload);
            state.reviews.push(payload)},
    }
});

export default detailsSlice.reducer;
