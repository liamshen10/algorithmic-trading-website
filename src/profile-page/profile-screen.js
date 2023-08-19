import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProfile, updateProfile } from '../services/auth-thunks';
import { getReviewById } from '../services/details-thunks';
import { useNavigate } from "react-router";
import { logout } from "../services/auth-thunks";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const [editableProfile, setEditableProfile] = useState({});
  const { profileId } = useParams();
  const id  = user._id;
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (profileId) {
      dispatch(fetchProfile( profileId));
    } else {
      // Handle the case where the profile ID is not specified  
    }
  }, [profileId, dispatch]);

  useEffect(() => {
    setEditableProfile(user);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({
      ...editableProfile,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Editable Profile: ', editableProfile);
    dispatch(updateProfile({id, profileUpdate: editableProfile}));
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = [];
      for (let i = 0; i < user.reviews.length && i < 5; i++) {
        const result = await dispatch(getReviewById(user.reviews[i]));
        if (result.payload) {
          console.log("paylod: ", result.payload);
          fetchedReviews.push(result.payload);
        }
      }
      setReviews(fetchedReviews);
    };
    if (user && user.reviews) {
      fetchReviews();
    }
  }, [user, dispatch]);

  return (
    <div>
      <h1>Profile Screen</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.username}</h2>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
          <h3>Recent Reviews:</h3>
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <p>{review.content}</p>
                <p>Stars: {review.stars}</p>
                <p>Date: {new Date(review.timestamp).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={editableProfile.email || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={editableProfile.phone || ''}
                onChange={handleInputChange}
              />
            </div>
            <button
                      onClick={() => {
                        dispatch(logout());
                        navigate("/login");
                      }}>                   Logout</button>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileScreen;
