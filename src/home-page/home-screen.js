import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviewById } from '../services/details-thunks'; // Import the appropriate thunk to fetch reviews by ID\
import './home-screen.css';

const HomeScreen = () => {
  const [details, setDetails] = useState([]);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const deletedReviews = useSelector(state => state.details.deletedReviews);
  
  useEffect(() => {
    console.log("State of deletedReviews:", deletedReviews);
  }, [deletedReviews]);
  
  useEffect(() => {
    const fetchReviews = async () => {
      const reviewIds = currentUser.reviews.slice(0, 5);
      const reviews = await Promise.all(
        reviewIds.map(async reviewId => {
          const result = await dispatch(getReviewById(reviewId));
          return result.payload;
        })
      );
      setDetails(reviews);
    };
    
    if (currentUser && currentUser.reviews) {
      fetchReviews();
    }
  }, [currentUser, dispatch]);

  return (
    <div className="home-container">
      <h1>Welcome to our website!</h1>
      <div className="activity-container">
        <div>
          <h2>Latest Activity:</h2>
          {/* ... code to display latest activity for all users ... */}
        </div>
        {currentUser && (
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
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
