import React, { useState, useContext, useEffect } from 'react';
import Rnr from '../../rnr.js';
import Reviews from './reviews.js';
import { MainContext } from '../../../contexts/contexts.js';
import StarRatings from 'react-star-ratings';

function Review(reviewData) {
  console.log('reviewData', reviewData);

  //   reviewData:
  // body: "Great outfit for huntin clams!"
  // date: "2021-11-09T00:00:00.000Z"
  // helpfulness: 5
  // photos: []
  // rating: 5
  // recommend: true
  // response: null
  // review_id: 1094634
  // reviewer_name: "Clamboni"
  // summary: "Clams"

  let reviewYear = reviewData.reviewData.date.slice(0, 4);
  let reviewMonth = reviewData.reviewData.date.slice(5, 7);
  let reviewDay = reviewData.reviewData.date.slice(8, 10);

  let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  if (reviewMonth[0] === '0') {
    reviewMonth = monthArray[reviewMonth[1] - 1];
  } else {
    reviewMonth = monthArray[reviewMonth - 1];
  }

  if (reviewDay[0] === '0') {
    reviewDay = reviewDay[1];
  }

  return (
    <div className="review">
      <div className="review-star-rating">
        <StarRatings
          rating={reviewData.reviewData.rating}
          starDimension="15px"
          starSpacing="0px"
          starRatedColor="green"
        />
      </div>
      <div className="review-user-header">
        Verified, {reviewData.reviewData.reviewer_name}, {reviewMonth} {reviewDay}, {reviewYear}
      </div>
      <div className="review-summary">
        {reviewData.reviewData.summary}
      </div>
      <div className="review-body">
        {reviewData.reviewData.body}
      </div>
      <div className="review-recommend">
        {reviewData.reviewData.recommend === true ? 'I recommend this product' : ''}
      </div>
      <div className="review-response">
        {reviewData.reviewData.response === null ? '' : reviewData.reviewData.response}
      </div>
      <div className="review-footer">
        <div className="review-helpful">
          Helfpul?
        </div>
        <div className="review-yes">
          Yes
        </div>
        <div className="review-helpful-count">
          &#40;{reviewData.reviewData.helpfulness}&#41;
        </div>
        <div className="review-spacer">
          |
        </div>
        <div className="review-report">
          Report
        </div>
      </div>
      <hr className="review-horizontal-spacer"></hr>
    </div>
  )
}

export default Review;