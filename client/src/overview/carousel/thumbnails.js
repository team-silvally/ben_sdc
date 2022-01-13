import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import Thumbnail from './thumbnail.js'
import Arrows from './arrows.js';

function Thumbnails() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures, thumbnailCount, setThumbnailCount, loadNextThumbnail, setLoadNextThumbnail, thumbnailIncrement, setThumbnailIncrement, slideIndex, setSlideIndex} = useContext(MainContext);
  //Local variables in realation to current product
  let photos;
  let currProdStyles;
  var mainPhotosArr = [];
  let thumbnailsArr = [];

   //Find currentProduct in styles
   styles.forEach(p => {
    if (Number(p.product_id) === currentProductId) {
      currProdStyles = p;
    }
  });

  let stylesData = currProdStyles.results.map(style => {
    //Set photos of current style to local variable.
    if (style.style_id === currStyle) {
      photos = style.photos;
      setThumbnailCount(photos.length);
    }
  });

    if (thumbnailsArr.length === 0) {
      for (let i = 0; i < photos.length - 1; i++) {
        //Increment index of photo according to thumbnail increment.
        let photo = photos[i + thumbnailIncrement];
        mainPhotosArr.push(photo['url']);
        thumbnailsArr.push(<Thumbnail url={photo['thumbnail_url']} photo={photo} count={photo.length}/>);
      }
    }

  //Default main pictures will be the first 5 photos in array.
  //Default main slide picture will be at slideIndex's default value (0).
  if (mainPictures == null) {
    setMainPictures(mainPhotosArr);
    setMainPicture(mainPhotosArr[slideIndex]);
    return <div>Loading gallery image...</div>
  }

  //If pictures array state and local array don't match, set state.
  if (mainPictures[0] !== mainPhotosArr[0]) {
    setMainPictures(mainPhotosArr);
    setMainPicture(mainPhotosArr[slideIndex]);
    return <div>Updating photos...</div>
  }

  return (
    <div className="dot-container">
      {thumbnailsArr}
    </div>
  );
}

export default Thumbnails;