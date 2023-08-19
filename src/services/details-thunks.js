import { createAsyncThunk } from "@reduxjs/toolkit";
import { getReviewByIdApi, fetchDetailsApi, fetchReviewsApi, addReviewApi } from "./details-services";

export const fetchDetails = createAsyncThunk(
    "details/fetchDetails",
    async (uniqueIdentifier) => {
        const response = await fetchDetailsApi(uniqueIdentifier);
        return response;
    }
);

export const fetchReviews = createAsyncThunk(
    "details/fetchReviews",
    async (uniqueIdentifier) => {
        const response = await fetchReviewsApi(uniqueIdentifier);
        return response;
    }
);

export const addReview = createAsyncThunk(
    "details/addReview",
    async (review) => {
        const response = await addReviewApi(review);
        return response;
    }
);

export const getReviewById = createAsyncThunk(
    "details/getReviewById",
    async (reviewId) => {
        const response = await getReviewByIdApi(reviewId);
        return response;
    }
);