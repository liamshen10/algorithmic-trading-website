import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviewById } from '../services/details-thunks'; // Import the appropriate thunk to fetch reviews by ID and fetch users
import { fetchUsers } from '../services/auth-thunks';
import './home-screen.css';

const HomeScreen = () => {
  const [details, setDetails] = useState([]);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [users, setUsers] = useState([]);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "reviewer") {
        const fetchReviews = async () => {
          let reviewIds = currentUser.reviews.slice(0, 5);
          const reviews = await Promise.all(
            reviewIds.map(async (reviewId) => {
              const result = await dispatch(getReviewById(reviewId));
              return result.payload;
            })
          );
          setDetails(reviews);
        };
        fetchReviews();
      } else if (currentUser.role === "administrator") {
        setWelcomeMessage(`Welcome back, ${currentUser.username}`);
      }
    } else {
      const fetchRandomUsers = async () => {
        const first = await dispatch(fetchUsers());
        const users = first.payload;
        console.log('Users:', users);
        if (Array.isArray(users)) {
          setUsers(users.sort(() => Math.random() - 0.5));
        } else {
          console.error('Error: users is not an array:', users);
        }
      };
      fetchRandomUsers();
    }
  }, [currentUser, dispatch]);

  return (
    <div className="home-container">
      <h1>Welcome to our website!</h1>
      {welcomeMessage && <h2>{welcomeMessage}</h2>}
      <div className="activity-container">
        <div>
          <h2>Latest Activity:</h2>
          {/* ... code to display latest activity for all users ... */}
        </div>
        {currentUser ? (
          <div>
            <h2>Your Recent Activity:</h2>
            <ul>
              {details.map((review, index) => (
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
          </div>
        ) : (
          <div>
            <h2>Random Reviewers:</h2>
            <ul>
              {users.map((user, index) => (
                <li key={index}>
                  <p>Username: {user.username}</p>
                  <p>Number of Reviews: {user.reviews.length}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
