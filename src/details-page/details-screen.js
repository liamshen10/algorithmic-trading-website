import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetails, fetchReviews, addReview, deleteReview } from '../services/details-thunks';
import { v4 as uuidv4 } from 'uuid';
import './details-screen.css';

const DetailsScreen = () => {
  const { uniqueIdentifier } = useParams();
  const dispatch = useDispatch();
  const details = useSelector(state => state.details.details);
  const reviews = useSelector(state => state.details.reviews);
console.log("Reviews in Component: ", reviews);

  const user = useSelector(state => state.user.currentUser);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [streetViewImageURL, setStreetViewImageURL] = useState('');

  useEffect(() => {
    dispatch(fetchDetails(uniqueIdentifier));
    dispatch(fetchReviews(uniqueIdentifier));
  }, [dispatch, uniqueIdentifier]);

  useEffect(() => {
    if (details) {
      const latitude = details.geometry.coordinates[1];
      const longitude = details.geometry.coordinates[0];
      const streetViewURL = `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${latitude},${longitude}&fov=80&heading=70&pitch=0&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
      setStreetViewImageURL(streetViewURL);
    }
  }, [details]);

  const handleAddReview = () => {
    const review = {
      userId: user._id,
      review_id: uuidv4(),
      location_id: uniqueIdentifier,
      content: newReview,
      stars: newRating
    };
    dispatch(addReview(review));
    setNewRating(0); // Reset the rating after submitting the review
  };

  const handleDeleteReview = (_id) => {
    console.log("handleDeleteReview called with ID:", _id);
    dispatch(deleteReview(_id));
  };
  
  if (!details) return <p>Loading...</p>;
  console.log(user.role);
  return (
    <div className="details-details-container">
      <div className="details-header">
        <h2>{details.place_name}</h2>
        <Link to="/search" className="details-back-button">Back to Search</Link>
      </div>
      <img src={streetViewImageURL} alt="Street View of the Address" className="details-img" />
      <div className="details-reviews-section">
      
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
  reviews.map((review, index) => (
    <div key={index} className="details-review">
      <p>{'⭐'.repeat(review.stars)}</p>
      <Link to={review.userId === user._id ? "/profile" : `/profile/${review.userId}`}>View User Profile</Link>
      <p>{review.content}</p>
      {user.role === 'administrator' && (
        <>
        <button onClick={() => {
    console.log("Delete button clicked");
    console.log('user_id: ', user._id)
    handleDeleteReview(review._id);
}}>Delete Review</button>
          {console.log("Review object:", review._id)}
        </>
      )}
    </div>
  ))
) : (
  <p>No reviews yet.</p>
)}
      </div>
      {user.role !== 'administrator' && (
        <div className="details-add-review">
          <h3>Add a review</h3>
          <div className="details-star-rating">
            {Array.from({ length: 5 }, (_, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={index + 1}
                  checked={newRating === index + 1}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="details-input"
                />
                <span className="details-star">&#9733;</span>
              </label>
            ))}
          </div>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here"
            className="details-textarea"
          />
          <button onClick={handleAddReview} className="details-button">Add Review</button>
        </div>
      )}
    </div>
  );
};

export default DetailsScreen;
