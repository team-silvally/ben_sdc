import React, { useState, useContext, useEffect } from 'react';
import Rnr from '../../rnr.js';
import { MainContext } from '../../../contexts/contexts.js';
import Ratings from './ratings.js';

function Rating({ starData }) {
  const {productRatings} = useContext(MainContext);

  let containerClassName = "ratings-" + starData.stars + "-star";
  let textClassName = "ratings-" + starData.stars + "-star-text";
  let greenBarClassName = "ratings-" + starData.stars + "-star-green-bar";
  let grayBarClassName = "ratings-" + starData.stars + "-star-gray-bar";
  let greenBarPercentage = (starData.percentage * 200).toString() + "px";
  let grayBarPercentage = (200 - (starData.percentage * 200)).toString() + "px";



  return (
    <div className={containerClassName}>
        <span className={textClassName}>
          {starData.stars} stars
        </span>
        <span className={greenBarClassName} style={{display: "inline-block", marginLeft: "15px", backgroundColor: "green", height: "10px", width: greenBarPercentage}}></span>
        <span className={grayBarClassName} style={{display: "inline-block", marginLeft: "0px", backgroundColor: "#a5acb8", height: "10px", width: grayBarPercentage}}></span>
      </div>
  )
}

export default Rating;