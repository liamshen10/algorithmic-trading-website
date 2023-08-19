import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProfile, updateProfile } from '../services/auth-thunks';
import { getReviewById } from '../services/details-thunks';
import { useNavigate } from "react-router";
import { logout } from "../services/auth-thunks";
import './profile-screen.css'; // Importing the CSS file

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
    <div className="profile-container">
      <h1 className="welcome-message">Welcome {user.username}</h1>
      {user ? (
        <div className="profile-content">
          <div className="user-details">
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={editableProfile.email || ''}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={editableProfile.phone || ''}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <button type="submit" className="button-save">Save Changes</button>
              <button
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                }}
                className="button-logout">Logout</button>
            </form>
          </div>
          <div className="reviews-section">
            <h3 className="reviews-header">Recent Reviews:</h3>
            <ul className="reviews-list">
              {reviews.map((review, index) => (
                <li key={index} className="review-item">
                  <p>{review.content}</p>
                  <p>Stars: {review.stars}</p>
                  <p>Date: {new Date(review.timestamp).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileScreen;
