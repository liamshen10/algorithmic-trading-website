import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProfile, updateProfile } from '../services/profile-thunks';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile.profile);
  const user = useSelector(state => state.user.currentUser);
  const [editableProfile, setEditableProfile] = useState({});
  const { profileId } = useParams();

  useEffect(() => {
    if (profileId) {
      dispatch(fetchProfile(profileId));
    } else {
      // Handle the case where the profile ID is not specified
    }
  }, [profileId, dispatch]);

  useEffect(() => {
    setEditableProfile(profile);
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({
      ...editableProfile,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(editableProfile));
  };

  return (
    <div>
      <h1>Profile Screen</h1>
      {profile ? (
        <div>
          <h2>Welcome, {user.username}</h2>
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
