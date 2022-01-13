import React, { useState, useContext, useEffect } from 'react';
import Rnr from '../../rnr.js';
import { MainContext } from '../../../contexts/contexts.js';
import Rating from './rating.js';
import StarRatings from 'react-star-ratings';

function Ratings() {
  const { products, setProducts, currentProduct, setCurrentProduct, productReviews, setProductReviews, productRatings, setProductRatings, productStarRating, setProductStarRating } = useContext(MainContext);

  // Object
  // config: {url: '/reviews/meta?product_id=44388', method: 'get', headers: {…}, transformRequest: Array(1), transformResponse: Array(1), …}
  // data:
  // characteristics:
  // Comfort: {id: 148892, value: '2.5000000000000000'}
  // Fit: {id: 148890, value: '2.2826086956521739'}
  // Length: {id: 148891, value: '2.4565217391304348'}
  // Quality: {id: 148893, value: '2.8163265306122449'}
  // [[Prototype]]: Object
  // product_id: "44388"
  // ratings:
  // 1: "8"
  // 2: "20"
  // 3: "15"
  // 4: "17"
  // 5: "29"
  // [[Prototype]]: Object
  // recommended:
  // false: "8"
  // true: "81"
  // [[Prototype]]: Object
  // [[Prototype]]: Object
  // headers: {content-length: '345', content-type: 'application/json; charset=utf-8', date: 'Tue, 04 Jan 2022 02:47:19 GMT', etag: 'W/"159-sHgBP00Iljbj1vVdMhOfsOX0XQU"', x-powered-by: 'Express'}
  // request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
  // status: 200
  // statusText: "OK"
  // [[Prototype]]: Object

  //Creating position for slider to appear on each characteristic bar
  let comfortRating = productRatings.data.characteristics.Comfort.value || null;
  let fitRating = productRatings.data.characteristics.Fit.value || null;
  let lengthRating = productRatings.data.characteristics.Length.value || null;
  let qualityRating = productRatings.data.characteristics.Quality.value || null;

  let comfortSliderPosition = (comfortRating * 52).toString() + 'px';
  let fitSliderPosition = (fitRating * 52).toString() + 'px';
  let lengthSliderPosition = (lengthRating * 52).toString() + 'px';
  let qualitySliderPosition = (qualityRating * 52).toString() + 'px';

  //Create overall product rating decimal number
  let oneStarRatings = Number(productRatings.data.ratings[1]);
  let twoStarRatings = Number(productRatings.data.ratings[2]);
  let threeStarRatings = Number(productRatings.data.ratings[3]);
  let fourStarRatings = Number(productRatings.data.ratings[4]);
  let fiveStarRatings = Number(productRatings.data.ratings[5]);

  let totalRatingsCount = oneStarRatings + twoStarRatings + threeStarRatings + fourStarRatings + fiveStarRatings;

  let oneStarRatingsWeighted = oneStarRatings;
  let twoStarRatingsWeighted = twoStarRatings * 2;
  let threeStarRatingsWeighted = twoStarRatings * 3;
  let fourStarRatingsWeighted = twoStarRatings * 4;
  let fiveStarRatingsWeighted = twoStarRatings * 5;

  let totalRatingsWeighted = oneStarRatingsWeighted + twoStarRatingsWeighted + threeStarRatingsWeighted + fourStarRatingsWeighted + fiveStarRatingsWeighted;

  let overallProductRating = totalRatingsWeighted / totalRatingsCount;
  overallProductRating = Math.round(overallProductRating * 10) / 10;

  //Create the recommended percentage
  let recommendedTrue = Number(productRatings.data.recommended.true);
  let recommendedFalse = Number(productRatings.data.recommended.false);
  let recommendedPercentage = (recommendedTrue / (recommendedTrue + recommendedFalse)) * 100;
  let recommendedPercentageAsAString = recommendedPercentage.toString();

  //REALLY create the recommended percentage
  if (Number(recommendedPercentageAsAString[4]) >= 5) {
    if (recommendedPercentageAsAString[3] === '9') {
      if (recommendedPercentageAsAString[1] === '9') {
        if (recommendedPercentageAsAString[0] === '9') {
          recommendedPercentageAsAString = '100%';
        } else {
          recommendedPercentageAsAString = (Number(recommendedPercentageAsAString[0]) + 1).toString() + '0%';
        }
      } else {
        recommendedPercentageAsAString = recommendedPercentageAsAString[0] + (Number(recommendedPercentageAsAString[1]) + 1).toString() + '%';
      }
    } else {
      recommendedPercentageAsAString = recommendedPercentageAsAString.slice(0, 3) + (Number(recommendedPercentageAsAString[3]) + 1).toString() + '%';
    }
  } else {
    recommendedPercentageAsAString = recommendedPercentageAsAString.slice(0, 4) + '%';
  }

  if (recommendedPercentageAsAString[3] === '0') {
    recommendedPercentageAsAString = recommendedPercentageAsAString.slice(0, 2) + '%';
  }

  //Create star percentage bar data
  let starRatingsArray = [];

  for (let i = 5; i > 0; i--) {
    let stars = i.toString();
    let starPercentage = productRatings.data.ratings[i] / totalRatingsCount;
    let starPercentageRounded = Math.round(starPercentage * 100) / 100;
    starRatingsArray.push({ stars: stars, numberOfRatings: productRatings.data.ratings[i.toString()], percentage: starPercentageRounded });
  }

  //Create star rating icon
  let numberToProduceStar;
  let overallProductRatingToTheHundreth = Math.round(overallProductRating * 100) / 100;
  let overallStarRatingAsAString = overallProductRatingToTheHundreth.toString();
  let overallStarRatingAsAStringFirstDigit = overallStarRatingAsAString[0];
  let overallStarRatingAsAStringAfterDecimal = overallStarRatingAsAString.slice(1);

  if (Number(overallStarRatingAsAStringAfterDecimal) < 0.13) {
    numberToProduceStar = Number(overallStarRatingAsAStringFirstDigit);
  } else if (Number(overallStarRatingAsAStringAfterDecimal) >= 0.13 && Number(overallStarRatingAsAStringAfterDecimal) < 0.38) {
    numberToProduceStar = Number(overallStarRatingAsAStringFirstDigit) + 0.25;
  } else if (Number(overallStarRatingAsAStringAfterDecimal) >= 0.38 && Number(overallStarRatingAsAStringAfterDecimal) < 0.63) {
    numberToProduceStar = Number(overallStarRatingAsAStringFirstDigit) + 0.5;
  } else if (Number(overallStarRatingAsAStringAfterDecimal) >= 0.63 && Number(overallStarRatingAsAStringAfterDecimal) < 0.88) {
    numberToProduceStar = Number(overallStarRatingAsAStringFirstDigit) + 0.75;
  } else {
    numberToProduceStar = Number(overallStarRatingAsAStringFirstDigit) + 1;
  }

  let starRatingImage = <StarRatings
  rating={numberToProduceStar}
  starDimension="15px"
  starSpacing="0px"
  starRatedColor="green"
/>;

  if (productStarRating == null) {
    setProductStarRating(numberToProduceStar);
    return <div>Loading...</div>
  }

  return (
    <MainContext.Provider value={{ productRatings }}>
      <div className="ratings-container" style={{ padding: "10px" }}>
        <div className="ratings-number-and-stars">
          <div className="ratings-decimal">
            {overallProductRating}
          </div>
          <div className="ratings-overall-star" style={{ marginLeft: "15px" }}>
            {starRatingImage}
          </div>
        </div>
        <div className="ratings-recommend-percentage" style={{ fontSize: "10px", marginTop: "10px" }}>
          {recommendedPercentageAsAString} of reviewers recommend this product
        </div>
        <div>
          {starRatingsArray.map((starData) => {
            return <Rating starData={starData} />
          })}
        </div>
        <div className="ratings-sliders" style={{ marginTop: "10px" }}>
          {comfortRating !== null ?
            <div className="ratings-comfort">
              <div className="ratings-comfort-text" style={{ marginTop: "20px" }}>
                Comfort
              </div>
              <span className="comfort-bar" style={{ position: "absolute", display: "inline-block", marginTop: "4px", marginLeft: "0px", backgroundColor: "#a5acb8", height: "10px", width: "270px" }}></span>
              <span style={{ display: "inline-block", position: "absolute", marginLeft: comfortSliderPosition }}>&nabla;</span>
              <div className="comfort-descriptors" style={{ marginTop: "12px" }}>
                <span style={{ fontSize: "10px" }}>Poor</span>
                <span style={{ fontSize: "10px", marginLeft: "212px" }}>Perfect</span>
              </div>
            </div> : ''}
          {fitRating !== null ?
            <div className="ratings-fit" style={{ marginTop: "10px" }}>
              <div className="ratings-fit-text">
                Fit
              </div>
              <span className="fit-bar" style={{ position: "absolute", display: "inline-block", marginTop: "4px", marginLeft: "0px", backgroundColor: "#a5acb8", height: "10px", width: "270px" }}></span>
              <span style={{ display: "inline-block", position: "absolute", marginLeft: fitSliderPosition }}>&nabla;</span>
              <div className="fit-descriptors" style={{ marginTop: "12px" }}>
                <span style={{ fontSize: "10px" }}>Poor</span>
                <span style={{ fontSize: "10px", marginLeft: "212px" }}>Perfect</span>
              </div>
            </div> : ''}
          {lengthRating !== null ?
            <div className="ratings-length" style={{ marginTop: "10px" }}>
              <div className="ratings-length-text">
                Length
              </div>
              <span className="length-bar" style={{ position: "absolute", display: "inline-block", marginTop: "4px", marginLeft: "0px", backgroundColor: "#a5acb8", height: "10px", width: "270px" }}></span>
              <span style={{ display: "inline-block", position: "absolute", marginLeft: lengthSliderPosition }}>&nabla;</span>
              <div className="length-descriptors" style={{ marginTop: "12px" }}>
                <span style={{ fontSize: "10px" }}>Too Short</span>
                <span style={{ fontSize: "10px", marginLeft: "72px" }}>Perfect</span>
                <span style={{ fontSize: "10px", marginLeft: "72px" }}>Too Long</span>
              </div>
            </div> : ''}
          {qualityRating !== null ?
            <div className="ratings-quality" style={{ marginTop: "10px" }}>
              <div className="ratings-quality-text">
                Quality
              </div>
              <span className="quaility-bar" style={{ position: "absolute", display: "inline-block", marginTop: "4px", marginLeft: "0px", backgroundColor: "#a5acb8", height: "10px", width: "270px" }}></span>
              <span style={{ display: "inline-block", position: "absolute", marginLeft: qualitySliderPosition }}>&nabla;</span>
              <div className="quality-descriptors" style={{ marginTop: "12px" }}>
                <span style={{ fontSize: "10px" }}>Poor</span>
                <span style={{ fontSize: "10px", marginLeft: "212px" }}>Perfect</span>
              </div>
            </div> : ''}
        </div>
      </div>
    </MainContext.Provider>
  )
}

export default Ratings;