import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { MainContext } from './contexts/contexts.js';
import Overview from './overview/overview.js';
import Qna from './qna/qna.js';
import Rnr from './rnr/rnr.js';

const App = () => {
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('normal');
  const [productStarRating, setProductStarRating] = useState(null);
  let getRequests = [];

  useEffect(() => {
      getRequests.push(Axios.get('/products').then((result) => { return result.data; }));
      getRequests.push(Axios.get('/cart').then((result) => { return result.data; }));

    Promise.all(getRequests).then((values) => {
      setProducts(values[0]);
      setCart(values[1]);
      let productKey = values[0][0]['id'];
      setCurrentProductId(productKey);
    });
  }, []);


  if (currentProductId == null) {
    return <h1>Loading...</h1>
  }

  return (
    <div className='main'>
    <MainContext.Provider value={{products, setProducts, cart, setCart, currentProductId, setCurrentProductId, currentTheme, setCurrentTheme, productStarRating, setProductStarRating }}>
      <Overview />
      <Qna />
      <Rnr />
    </MainContext.Provider>
    </div>
  );
};

export default App;


