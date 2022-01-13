import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import Thumbnails from './thumbnails.js';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
var localSlideIndex = 0;

function Arrows(props) {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures, thumbnailCount, setThumbnailCount, loadNextThumbnail, setLoadNextThumbnail, thumbnailIncrement, setThumbnailIncrement, slideIndex, setSlideIndex, extend, setExtend,  zoomEnabled, setZoomEnabled} = useContext(MainContext);
    var downActive = thumbnailCount > 5 ? true:false;
    var upActive = thumbnailIncrement > 0 ? true:false;

    let maxIndex = (thumbnailCount) - 5;

    if (thumbnailIncrement > maxIndex) {
      downActive = false;
    }

    if (thumbnailIncrement === maxIndex) {
      downActive = false;
    }


    function plusSlides(n) {
      showSlides(localSlideIndex += n);
      setSlideIndex(localSlideIndex);
    }

    function currentSlide(n) {
      showSlides(localSlideIndex = n);
      setSlideIndex(n);
    }

    function showSlides(n) {
      //var dots = document.getElementsByClassName("dot");
      if (n >= mainPictures.length) {localSlideIndex = 0; setSlideIndex(0);}
      if (n < 0) {localSlideIndex = mainPictures.length -1; setSlideIndex(mainPictures.length -1)}
      // for (i = 0; i < dots.length; i++) {
      //     dots[i].className = dots[i].className.replace(" downActive", "");
      // }
      setMainPicture(mainPictures[localSlideIndex]);
      //dots[slideIndex-1].className += " downActive";
    }

    function preventOutOfIndex(n, direction) {
      let currProdStyles;
      let photos;
      styles.forEach(p => {
        if (Number(p.product_id) === currentProductId) {
          currProdStyles = p;
        }
      });

      let stylesData = currProdStyles.results.map(style => {
        if (style.style_id === currStyle) {
           photos = style.photos;
        }
      });

      if (photos[0 + n] !== undefined && direction === 'up') {
        setThumbnailIncrement(n);
      } else if (photos[photos.length - 2 + n] !== undefined && direction === 'down') {
        setThumbnailIncrement(n);
      }
    }

    function renderThumbnails(direction) {
      if (direction === "up") {
        preventOutOfIndex(thumbnailIncrement-1, "up");
      } else {
        preventOutOfIndex(thumbnailIncrement+1, "down");
        localSlideIndex = slideIndex;
      }
    }

    if (mainPictures == null) {
      return <div>Loading</div>
    }

  return (
    <div>
      <a className="prev" onClick={() => {plusSlides(-1)}}><FiArrowLeft style={{display: zoomEnabled === true ? 'none':'', height: '23px', width: '23px', color: 'black'}}/></a>
      <a className="next" style={{display: zoomEnabled === true ? 'none':'', right: extend===true ? '-388px':'60px', webkitTransition: 'right 1s ease'}} onClick={() => {plusSlides(1)}}><FiArrowRight style={{height: '23px', width: '23px', color: 'black'}}/></a>
      <a className="down" onClick={() => {renderThumbnails('down')}}><RiArrowDownSLine style={{display: zoomEnabled === true ? 'none':'', height: '20px', width: '20px', color: 'black', display: downActive === true ? '':'none'}}/></a>
      <a className="up"   onClick={() => {renderThumbnails('up')}}><RiArrowUpSLine style={{display: zoomEnabled === true ? 'none':'', height: '20px', width: '20px', color: 'black', display: upActive === true ? '':'none'}}/></a>
    </div>
    )
  }

  export default Arrows;