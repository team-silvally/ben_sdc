import React, { useState, useContext, useEffect } from 'react';
import { MainContext } from '../contexts/contexts.js';
import Axios from 'axios';
import Reviews from './components/reviews/reviews.js';
import Ratings from './components/ratings/ratings.js';
import Review from './components/reviews/review.js';
import Rating from './components/ratings/rating.js';

function Rnr() {
  const { products, setProducts, currentProductId, setCurrentProductId, productStarRating, setProductStarRating } = useContext(MainContext);

  const [productReviews, setProductReviews] = useState(null);
  const [reviewsRendered, setReviewsRendered] = useState(2);
  const [productRatings, setProductRatings] = useState(null);
  const [sortedNewest, setSortedNewest] = useState(null);
  const [sortedHelpful, setSortedHelpful] = useState(null);
  const [sortedRelevant, setSortedRelevant] = useState(null);
  const [currentSort, setCurrentSort] = useState(null);

  useEffect(() => {
    Axios.get(`/reviews?product_id=${currentProductId}`).then((response) => {
      setProductReviews(response.data);
    });
    Axios.get(`/reviews/meta?product_id=${currentProductId}`).then((response) => {
      setProductRatings(response);
    });
    Axios.get(`/reviews?product_id=${currentProductId}&sort=newest`).then((response) => {
      setSortedNewest(response.data.results);
    });
    Axios.get(`/reviews?product_id=${currentProductId}&sort=helpful`).then((response) => {
      setSortedHelpful(response.data.results);
    });
    Axios.get(`/reviews?product_id=${currentProductId}&sort=relevant`).then((response) => {
      setSortedRelevant(response.data.results);
      setCurrentSort(response.data.results);
    });
  }, [currentProductId]);

  if (productReviews == null || productRatings == null || sortedNewest == null || sortedHelpful == null || sortedRelevant == null || currentSort == null) {
    return (<div>Loading...</div>);
  } else {
    return (
      <MainContext.Provider value={{ products, setProducts, currentProductId, setCurrentProductId, productReviews, setProductReviews, reviewsRendered, setReviewsRendered, productRatings, setProductRatings, sortedNewest, sortedHelpful, sortedRelevant, currentSort, setCurrentSort, productStarRating, setProductStarRating }}>
        <div id="rnr" className="ratingsAndReviews">
          <div className="ratingsAndReviews-title">
            Ratings and Reviews
          </div>
          <div className="ratings">
            <Ratings />
          </div>
          <div className="reviews">
            <Reviews />
          </div>
        </div>
      </MainContext.Provider>
    )
  }


}

export default Rnr;