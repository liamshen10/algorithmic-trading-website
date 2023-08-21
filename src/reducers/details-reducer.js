import { createSlice } from "@reduxjs/toolkit";
import { fetchDetails, fetchReviews, addReview, getReviewById, deleteReview } from "../services/details-thunks";
import { login } from "../services/auth-thunks";

const detailsSlice = createSlice({
    name: "details",
    initialState: {
      details: null,
      reviews: [],
      deletedReviews: [],
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
        console.log("Checking the sourcePage", payload);
        state.reviews.push(payload);
      },
      [deleteReview.fulfilled]: (state, { payload }) => {
        console.log('Previous state of deletedReviews:', state.deletedReviews);
        const updatedReviews = state.reviews.filter(review => review._id !== payload._id);
        state.reviews = updatedReviews;
        console.log("Deleted Payload Check:", payload.deletedReview); 
        console.log('New state of deletedReviews:', state.deletedReviews);
      },
      
      [login.fulfilled]: (state, { payload }) => {
        if (payload.user.role === 'reviewer') {
          state.reviews = payload.reviews;
        } else if (payload.user.role === 'administrator') {
          if (payload.reviews && payload.reviews.length > 0) {
            state.deletedReviews = payload.reviews;
          }
        }
      }      
    }
  });
  
  export default detailsSlice.reducer;
  