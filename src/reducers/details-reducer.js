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
        console.log("ReviewById payload", payload);
  
        // Check if the payload already exists in the reviews state
        const alreadyExists = state.reviews.some(review => {
          // Compare the properties of the payload with the properties of the existing reviews
          return Object.keys(payload).every(key => payload[key] === review[key]);
        });
  
        // If the payload does not already exist, push it into the reviews state
        if (!alreadyExists) {
          state.reviews.push(payload);
        }
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
  