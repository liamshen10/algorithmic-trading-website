import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProfile, updateProfile } from '../services/auth-thunks';
import { useNavigate } from "react-router";
import { logout } from "../services/auth-thunks";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const viewedProfile = useSelector(state => state.user.viewedProfile);
  const reviews = useSelector(state => state.details.reviews); // Get reviews from Redux store
  const deletedReviews = useSelector(state => state.details.deletedReviews); // Get deletedReviews from Redux store
  console.log('User: ',  user);
  console.log("Reviews: ", reviews);
  console.log("Deleted Reviews:", deletedReviews)
  const [editableProfile, setEditableProfile] = useState({});
  const { profileId } = useParams();
  const id = user._id;
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

  const profile = viewOnly ? viewedProfile : user;
  console.log("profile here", profile);

  const reviewList = user.role === 'administrator' ? deletedReviews : reviews; // Use deletedReviews if the user is an administrator
  const filteredReviews = reviewList.filter(review =>
    review.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Profile Screen</h1>
      {viewOnly && <button onClick={handleBackClick}>Back</button>}
      {profile ? (
        <div>
          <h2>
            {viewOnly
              ? viewedProfile
                ? `${viewedProfile.username}'s Profile`
                : "Loading..."
              : user
              ? `Welcome, ${user.username}`
              : "Loading..."}
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
          {user && !viewOnly && (
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