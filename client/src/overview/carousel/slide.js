import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import { FaExpand } from 'react-icons/fa';
import Zoom from 'react-img-zoom';
var freeze = false;
function Slide() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures, extend, setExtend, zoomEnabled, setZoomEnabled} = useContext(MainContext);

  function extendToggle() {
    if (extend === false) {
      setExtend(true);
    } else {
      setExtend(false);
    }
  }

  function extendView(e) {
    if (extend === false) {
      setExtend(true);
      return;
    }
    if (zoomEnabled) {
      setZoomEnabled(false);
    } else {
      setZoomEnabled(true);
    }
  }

  function zoom(e) {
    let original = e.target,
    magnified = e.target,
    style = original.style,
    x = e.pageX - e.target.offsetLeft,
    y = e.pageY - e.target.offsetTop,
    imgWidth = original.offsetWidth ,
    imgHeight = original.offsetHeight,
    xperc = ((x/imgWidth) * 100),
    yperc = ((y/imgHeight) * 100);

    let xLimitLeft = 60;
    let yLimitRight = 33;

    var img = new Image();
    img.src = mainPicture;

    if (img.width > 668) {
      xLimitLeft = 100;
      yLimitRight = 0;
    }
    if (xperc-30 < xLimitLeft && xperc-30 > yLimitRight) {
      style.backgroundPositionX = (xperc - 30) + '%';
    }


    if (yperc-30 < 100 && yperc-30 > 0) {
      style.backgroundPositionY = (yperc - 30) + '%';
    }

      style.left = (x - 180) + 'px';
      style.top = (y - 180) + 'px';
  }

  let zoomDiv = zoomEnabled === true ? <div style={{backgroundImage: 'URL(' + mainPicture + ')', backgroundRepeat: 'no-repeat', transform:'scale(2.5)', backgroundPositionX: '50%', cursor: extend === true ? 'crosshair':'zoom-in', height: '100%', width: '100%'}} onMouseMove={zoom} onClick={extendView}> </div>:<img src={mainPicture} style={{cursor: extend === true ? 'crosshair':'zoom-in', height: '100%', width: extend===true ? '160%':'100%', objectFit: 'cover', webkitTransition: 'width 1s ease, height 1s ease'}} onClick={extendView}/>
  return (
    <div className="mySlides fade" style={{width: zoomEnabled===true ? '1205px':'94%', backgroundColor:'white', height:'590px', display: 'block', overflow: zoomEnabled === true ? 'hidden':''}}>
      <FaExpand className="extend" style={{display: zoomEnabled === true ? 'none':'', color: 'black', right: extend===true ? '-371px':'77px', webkitTransition: 'right 1s ease'}} onClick={extendToggle}/>
      {zoomDiv}
    </div>
  );
}

export default Slide;