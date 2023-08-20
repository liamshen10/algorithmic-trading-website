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
  const viewedProfile = useSelector(state => state.user.viewedProfile);
  const [editableProfile, setEditableProfile] = useState({});
  const { profileId } = useParams();
  const id = user._id;
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const viewOnly = profileId && profileId !== id;

  useEffect(() => {
    if (profileId) {
      console.log("Dispatching fetchProfile with profileId:", profileId);
      dispatch(fetchProfile(profileId));
    } else {
      console.log("No profileId provided.");
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Editable Profile: ', editableProfile);
    dispatch(updateProfile({id, profileUpdate: editableProfile}));
  };

  const handleBackClick = () => {
    navigate(-1); // Go back one step in the history
  };


  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = [];
      const profile = viewOnly ? viewedProfile : user;
      console.log("Fetching reviews for profile:", profile);
      if (profile && profile.role !== 'administrator') {
        for (let i = 0; i < profile.reviews.length; i++) {
          const result = await dispatch(getReviewById(profile.reviews[i]));
          if (result.payload) {
            fetchedReviews.push(result.payload);
          }
        }
        setReviews(fetchedReviews);
      }
    };
    if ((viewOnly && viewedProfile) || (!viewOnly && user)) {
      fetchReviews();
    }
  }, [user, viewedProfile, dispatch, viewOnly]);

  const profile = viewOnly ? viewedProfile : user;

  const filteredReviews = reviews.filter(review =>
    review.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Profile Screen</h1>
      {viewOnly && <button onClick={handleBackClick}>Back</button>}
      {profile ? (
        <div>
          <h2>
            {viewOnly ? `${profile.username}'s Profile` : `Welcome, ${profile.username}`}
          </h2>
          <div>
            <label>Search posts:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {searchTerm && (
            <ul>
              {filteredReviews.map((review, index) => (
                <li key={index}>
                  <p>{review.content}</p>
                  <p>Stars: {'⭐'.repeat(review.stars)}</p>
                  <p>Date: {new Date(review.timestamp).toLocaleDateString()}</p>
                  {review.location_id && (
                    <p>
                      Location:
                      <a href={`/details/${review.location_id}`}>
                        {review.location_id}
                      </a>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
          {!viewOnly && (
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
                }}
              >
                Logout
              </button>
              <button type="submit">Save Changes</button>
            </form>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileScreen;
