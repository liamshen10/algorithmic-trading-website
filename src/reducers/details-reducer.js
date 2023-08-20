    import { createSlice } from "@reduxjs/toolkit";
    import { fetchDetails, fetchReviews, addReview, getReviewById, deleteReview } from "../services/details-thunks";

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
        state.reviews.push(payload);
        },
        [deleteReview.fulfilled]: (state, { payload }) => {
            const updatedReviews = state.reviews.filter(review => review._id !== payload._id);
            state.reviews = updatedReviews;
        },
        
        
    }
    });

    export default detailsSlice.reducer;
