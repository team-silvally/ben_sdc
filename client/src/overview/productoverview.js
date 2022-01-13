import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../contexts/contexts.js'
import Axios from 'axios';
import { BiCheck } from 'react-icons/bi';

function ProductOverview() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures} = useContext(MainContext);

  if (productInformation == null) {
    return <div>Loading...</div>
  }

  let {slogan, description, features} = productInformation[0];
  let featuresList = features.map(feature => {
    let text = ' ' + feature['value'] + ' ' + feature['feature'];
    return <div className="feat" style={{fontFamiliy: 'sans-serif', fontSize: '12.5px', color: 'RGB(82,82,82)'}}><BiCheck style={{fontWeight: 'bold', color: 'black', verticalAlign: 'middle', fontSize: '25px'}}/>{text}</div>
  });

  return (
  <div className="poverview">
    <div style={{width: '625px', marginRight: '32px'}}>
      <div style={{fontFamiliy: 'sans-serif', fontSize: '17px', fontWeight: 'bold', color: 'RGB(82,82,82)'}}>{slogan}</div>
      <br />
      <div style={{fontFamiliy: 'sans-serif', fontSize: '12px', color: 'RGB(82,82,82)'}}>{description}</div>
    </div>
    <div className="featureslist">
      {featuresList}
    </div>
  </div>
  );
}

export default ProductOverview;