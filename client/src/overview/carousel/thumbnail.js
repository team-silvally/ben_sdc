import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';

function Thumbnail(props) {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture} = useContext(MainContext);

  if (mainPicture == null) {
    setMainPicture(props.photo['url']);
    return <div>Loading main picture...</div>
  }

  var active = mainPicture.split('?ixlib')[0] === props.photo['thumbnail_url'].split('?ixlib')[0] ? true:false;

  function replaceMainPicture() {
    setMainPicture(props.photo['url']);
    active = true;
  }

  return (
    <div>
      <img className="dot" src={props.url} onClick={replaceMainPicture}/>
      <hr style={{position: 'relative', top: '-18px', height: '4px', backgroundColor: 'RGB(82,82,82)', width: '63px', marginBottom: '0px', marginTop: '0px', marginLeft: '1px', border: 'none', display: active === true ? '':'none'}}/>
    </div>
  );
}

export default Thumbnail;