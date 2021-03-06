//Use this headers object when doing an axios call to the API.
const express = require('express');
const Axios = require('axios');
const path = require('path');
// const {TOKEN, URL} = require('../config.js');
const {controllers} = require('../database/controllers.js');

var app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// let config = {
//   headers: {
//   'Authorization': TOKEN,
//   'Content-Type': 'application/json'
//   }
// }

// product endpoints
app.get('/products', (req, res) => { controllers.getAllProducts(req, res); });
app.get('/products/:product_id', (req, res) => { controllers.getProductById(req, res); });
app.get('/products/:product_id/styles', (req, res) => { controllers.getProductStyles(req, res); });
app.get('/products/:product_id/related', (req, res) => { controllers.getRelatedProducts(req, res); });

// endpoint to check load balancer
app.get('/products/test/load_balancer', (req, res) => { res.status(200).send('server_1')});

// loader.io endpoint (for load testing)
app.get('/loaderio-c3429f7240c40ad2d84698a67f2f0472/', (req, res) => { res.status(200).send('loaderio-c3429f7240c40ad2d84698a67f2f0472')});



// app.get('/*', (req, res) => {
//     Axios.get(URL + req.originalUrl, config).then((response) => {res.send(response.data)});
// });

// app.post('/*', (req, res) => {
//   Axios.post(URL + req.originalUrl, req.body, config).then((response) => {res.send(response.data)});
// });

// app.put('/*', (req, res) => {
//   Axios.put(URL + req.originalUrl, req.body, config).then((response) => {res.send("success")});
// });

app.listen(3000, () => {console.log('Server listening on port 3000')});