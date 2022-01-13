import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

function Style(props) {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures, size, setSize, quantityList, setQuantityList, isActive, setIsActive} = useContext(MainContext);

  var active = currStyle === props.style_id ? true:false;
  function setCurrentStyle(event) {
    setCurrStyle(props.style_id);
    setMainPicture(props.main);
    console.log(props.main);
    let sizesQuantities = {};
    active = true;
    Object.values(props.skus).forEach((obj) => {
      let quantity = [...Array(Number(obj['quantity'] + 1)).keys()].map((val) => {
        return <option value={val}>{val}</option>
        });
        sizesQuantities[obj['size']] = quantity;
    })
  }

  if (props.style_id === currStyle) {

  }


  return (
    <div>
    <img className="style" src={props.url} onClick={setCurrentStyle} style={{cursor: 'pointer'}} />
    <IoCheckmarkCircleOutline className="checkmark" style={{display: active === true ? '':'none'}}/>
    </div>
  );
}

export default Style;