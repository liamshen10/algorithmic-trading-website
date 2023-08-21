import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviewById } from '../services/details-thunks';
import { fetchUsers } from '../services/auth-thunks';
import './home-screen.css';

const HomeScreen = () => {
  const [details, setDetails] = useState([]);
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
      <h1 className="home-welcome-title">Welcome to The Boston Reviewer!</h1>
      <div className="home-content">
        <div className="home-description">
          <h2>Why The Boston Reviewer?</h2>
          <p>Discover the heart of Boston through the eyes of locals and travelers alike. Boston Location Review is your go-to platform for exploring the city's hidden gems, iconic landmarks, and vibrant neighborhoods. Whether you're a food lover seeking the best clam chowder, a history buff exploring the Freedom Trail, or an adventurer looking for the next thrilling experience, we've got you covered!</p>
          <p>Join our community of reviewers and share your insights, experiences, and recommendations. Together, we're creating a comprehensive guide to Boston's must-visit places, tailored to every taste and interest. Dive into the rich culture, savor the culinary delights, and make unforgettable memories with Boston Location Review. Your next adventure starts here!</p>
        </div>
        <div className="home-activity-container">
          {currentUser ? (
            currentUser.role === "administrator" ? (
                <div className="home-admin-description">
                    <h2>Administrator Role:</h2>
                    <p>As an administrator, you have access to advanced features that help manage the Boston Location Review platform. This includes the ability to monitor user activity, manage reviews, and oversee the overall functioning of the platform. Thank you for helping ensure a positive experience for all users!</p>
                    <p className="home-admin-signature">- The Boston Reviewer Team</p>
                </div>

            ) : (
              <div className="home-recent-activity">
                <h2>Recent Activity</h2>
                <ul className="home-recent-activity-list">
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
            )
          ) : (
            <div className="home-random-reviewers">
              <h2>Join These Reviewers!</h2>
              <ul className="home-random-reviewers-list">
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
    </div>
  );
};

export default HomeScreen;
