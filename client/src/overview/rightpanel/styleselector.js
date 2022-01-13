import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import Style from './style.js';

function StyleSelector() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures, size, setSize, quantityList, setQuantityList, isActive, setIsActive, slideIndex, setSlideIndex} = useContext(MainContext);
  let currProdStyles;
  //Find currentProduct in styles
  styles.forEach(p => {
    if (Number(p.product_id) === currentProductId) {
      currProdStyles = p;
    }
  });

  console.log('slideIndex:', slideIndex)

  let stylesData = currProdStyles.results.map(style => {
    return <Style url={style.photos[0]['thumbnail_url']} main={style.photos[slideIndex]['url']} style_id={style.style_id} skus={style.skus}/>
  });

  useEffect(() => {
    if (currStyle == null) {
      console.log('null');
      setCurrStyle(currProdStyles.results[0].style_id);
    }
    if (mainPicture == null) {
      setMainPicture(currProdStyles.results[0].photos[slideIndex]['url']);
    }
  }, []);

  return (
    <div className="styles-wrap">
      {stylesData}
    </div>
  );
}

export default StyleSelector;