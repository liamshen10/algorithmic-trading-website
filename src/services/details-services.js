import axios from 'axios';
const apiBaseURL = 'http://localhost:4000';
const api = axios.create({
    baseURL: apiBaseURL,
    withCredentials: true
});

export const fetchDetailsApi = async (uniqueIdentifier) => {
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${uniqueIdentifier}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`);
    return response.data.features[0];
};

export const fetchReviewsApi = async (uniqueIdentifier) => {
    const response = await api.get(`/reviews/${uniqueIdentifier}`);
    return response.data;
};

export const addReviewApi = async (review) => {
    const response = await api.post("/reviews", review);
    return response.data;
};
