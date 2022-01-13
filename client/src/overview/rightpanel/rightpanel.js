import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../../contexts/contexts.js'
import Axios from 'axios';
import StyleSelector from './styleselector.js';
import StarRatings from 'react-star-ratings';

var status;
var select_size = true;
function RightPanel() {
  const {products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productInformation, setProductInformation, styles, setStyles, currStyle, setCurrStyle, mainPicture, setMainPicture, mainPictures, setMainPictures, size, setSize, quantityList, setQuantityList, isActive, setIsActive, extend, setExtend, productStarRating, setProductStarRating} = useContext(MainContext);
  const [selectSizeWarning, setSelectSizeWarning] = useState(false);
  let sale = false;
  let price;
  let quantity = 1;
  let sku_id;

  if (productInformation == null) {
    return <div>Loading...</div>
  }

  if (size == null) {
    console.log('detroit')
    status = true;
  }

  if (currStyle == null) {
    setCurrStyle(styles[0].results[0]['style_id']);
    return <div>Loading styles...</div>
  }

  if (productStarRating == null) {
    return <div>Loading..</div>
  }

  let currentStyleData;
  styles[0].results.forEach(obj => {
    if (obj['style_id'] === currStyle) {
      currentStyleData = obj;
    }
  });

  if (currentStyleData['sale_price'] !== null) {
    var oldPrice = (<div style={{textDecoration: 'line-through'}}>${currentStyleData['original_price'].split('.')[0]}</div>)
    var newPrice = (<div style={{color: 'rgb(220,20,60)', fontWeight: 'bold', marginLeft: '5px'}}>${currentStyleData['sale_price'].split('.')[0]}</div>)
    var salePriceDiv = (<div style={{marginBottom: '20px', fontSize: '14px', color: 'RGB: (197, 49, 45)', display: 'flex'}}>{oldPrice}{newPrice}</div>);
    sale = true;
  } else {
    price = (<div style={{marginBottom: '20px', fontSize: '14px', color: 'RGB(82,82,82)', display: 'flex'}}>${currentStyleData['original_price'].split('.')[0]}</div>);
  }

  const {category, name} = productInformation[0];
  let styleName = currentStyleData.name;
  let sizes = [];
  let maxQuantities = [];
  let index = 0;
  let xlDuplicate = false;

  let currProdStyle;

  styles[0].results.forEach(style => {
    if (style["style_id"] === currStyle) {
      currProdStyle = style;
    }
  });

  Object.values(currProdStyle['skus']).forEach((obj) => {
    let quantity = [...Array(Number(obj['quantity'] + 1)).keys()].map((val) => {
      if (val === 0) {
        return;
      }
      if (val > 15) {
        return;
      }
      if (val === 1) {
        return;
      } else {
        return <option value={val}>{val}</option>
      }
      });
    if (obj['size'] === 'XL' && xlDuplicate === true) {
      sizes.push(<option value={'XXL'}>{'XXL'}</option>);
    } else if (obj['size'] === 'XL' && xlDuplicate === false) {
      sizes.push(<option value={obj['size']}>{obj['size']}</option>);
      xlDuplicate = true;
    } else {
      sizes.push(<option value={obj['size']}>{obj['size']}</option>);
    }
    maxQuantities.push(quantity);
  });

  if (size == null) {
    setSize(sizes[0].props.value);
    setQuantityList(maxQuantities[0]);
    return <div>Loading sizes...</div>
  };

  function changeSizeQuantity(e) {
    if (e.target.value === 'Select Size') {
      select_size = true;
    } else {
      select_size = false;
    }
      setSize(e.target.value);

        sizes.forEach((val) => {
          if (val.props.value === e.target.value) {
            setQuantityList(maxQuantities[index]);
          }
          index++;
        })

        status = e.target.value === 'Select Size' ? true:false;

        if (!select_size) {
          setSelectSizeWarning(false);
        }
  }

  function addToCart() {
    if (select_size) {
      setSelectSizeWarning(true);
    } else {
      setSelectSizeWarning(false);
      for(let key in currProdStyle['skus']) {
        if (size === 'XXL') {
          sku_id = Object.keys(currProdStyle['skus'])[Object.keys(currProdStyle['skus']).length - 1];
        }
        if (currProdStyle['skus'][key]['size'] === size) {
          sku_id = key;
        }
      }
      let body = {"sku_id": sku_id, "count":quantity};
      console.log(body);
      Axios.post('/cart', body);
      let pText = quantity > 1 ? 'products':'product';
      alert(quantity, ' ', pText, ' added to cart!')
    }
  }

  return (
      <div className="rightpanel" style={{display: extend === false ? '':'none', webkitTransition: 'display 1s ease'}}>
        <div style={{marginBottom: '8px', fontFamiliy: 'sans-serif', color: 'RGB(82,82,82)', fontSize: '13px', display: 'inline-flex', alignItems: 'baseline'}}><StarRatings rating={productStarRating} starDimension="17px" starSpacing="0px" starRatedColor="RGB(82,82,82)"/><a href="#rnr" style={{marginLeft: '5px', fontFamiliy: 'sans-serif', color: 'RGB(82,82,82)', fontSize: '11px', textDecoration: 'underline', cursor: 'pointer'}}>Read all reviews</a></div>
        <div style={{marginBottom: '-1px', fontFamiliy: 'sans-serif', fontSize: '13px', letterSpacing: '0.5px', color: 'RGB(82,82,82)'}}>{category.toUpperCase()}</div>
        <div style={{marginBottom: '15px', fontFamiliy: 'sans-serif', fontSize: '28px', fontWeight: 'bold', color: 'RGB(82,82,82)', letterSpacing: '0.5px'}}>{name}</div>
        {sale === true ? salePriceDiv:price}
        <div style={{marginBottom: '8px', fontFamiliy: 'sans-serif', letterSpacing: '0.5px', color: 'RGB(82,82,82)', fontSize: '14px'}}><b>STYLE</b> > {styleName}</div>
        <StyleSelector />
        <div style={{fontWeight: 'bold', color: 'rgb(139,0,0)', display: selectSizeWarning === true ? '':'none'}}>Please select size</div>
        <select onChange={changeSizeQuantity}className="selectsizetext"  style={{cursor: 'pointer'}}>
          <option value="Select Size">Select Size</option>
            {sizes}
          </select>
          <select onChange={(e)=>{quantity = e.target.value}} className="quantitycarttext" disabled={status}  style={{cursor: 'pointer'}}>
            <option value={status === true ? '-':1}>{status === true ? '-':1}</option>
            {quantityList}
          </select>
        <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px'}}>
          <button onClick={addToCart}type="button" className="addbagbutton" onClick={addToCart} style={{cursor: 'pointer'}}>ADD TO BAG</button>
          <button type="button" className="starbutton" style={{cursor: 'pointer'}}>☆</button>
        </div>
      </div>
  );
}

export default RightPanel;