import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser, updateUser } from '../services/auth-thunks'; // Import user thunks

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser); // Get user from the store
  const [editableUser, setEditableUser] = useState({});
  const { userId } = useParams(); // Assume userId is in the URL parameters

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId)); // Fetch user information
    } else {
      // Handle the case where the user ID is not specified
    }
  }, [userId, dispatch]);

  useEffect(() => {
    setEditableUser(user); // Set editable user state
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({
      ...editableUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ userId, ...editableUser })); // Update user information
  };

  return (
    <div>
      <h1>Profile Screen</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.username}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={editableUser.username || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={editableUser.email || ''}
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
