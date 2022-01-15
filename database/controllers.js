// import db info
const {pool} = require('./index.js'); // consider using pools???


const controllers = {

  // ============================================
  // PRODUCT HANDLERS
  // ============================================

  // get all products
  getAllProducts(req, res) {

    // fetch 5 products by default
    let count = req.query.count || 5;

    pool.query(`SELECT * FROM products LIMIT ${count};`, (err, dbRes) => {
      if (err) {
        console.log('there was an error in getAllProducts db query');
        res.status(400).send(err);
      } else {
        res.status(200).send(dbRes.rows);
      }
    });
  },


  // get product info by its ID (using query promise format)
  getProductById(req, res) {

    let {product_id} = req.params;

    // first query gets the product info
    pool
      .query(`SELECT * FROM products WHERE id = ${product_id};`)
      .then( ({rows}) => {

        let productData = rows[0];

        // second query gets the feature info, combines into single obj, and returns it
        pool
          .query(`SELECT feature, value FROM features WHERE product_id = ${product_id}`)
          .then( ({rows}) => {
            productData.features = rows;
            res.status(200).send(productData);
          })
          .catch( (err) => {
            console.log('there was an error in getProductById db query');
            res.status(400).send(err);
          });

      })
      .catch( (err) => {
        console.log('there was an error in getProductById db query');
        res.status(400).send(err);
      });
  },


  // get a product style information
  getProductStyles(req, res) {

    let {product_id} = req.params;
    let queryString = `SELECT id AS style_id, name, original_price, sale_price, default_style AS "default?" FROM styles WHERE product_id = $1;`;
    let queryArgs = [product_id];

    // first query gathers all style info from styles table
    pool
      .query(queryString, queryArgs)
      .then( ({rows}) => {

        // create an object to be returned
        let returnObj = {
          product_id: product_id,
          results: rows
        };

        // create list of styles to prevent redundant future queries
        let productStyleIdsList = rows.map( style => style.style_id );

        // set up query string and args for second query
        queryString = `SELECT style_id, url, thumbnail_url FROM photos WHERE style_id = ANY($1)`;
        queryArgs = [productStyleIdsList];

        // second query gathers photo data for all styles
        pool
          .query(queryString, queryArgs)
          .then( ({rows}) => {

            // iterate through array of style objects
            for (let i = 0; i < returnObj.results.length; i++) {

              // create an photo property in the style object to store photo data
              returnObj.results[i].photos = [];

              // iterate through the array of photo urls and add them to matching style object photos
              for (let j = 0; j < rows.length; j++) {

                if (rows[j].style_id == returnObj.results[i].style_id) { // used == instead of === since its comparing strings/numbers
                  returnObj.results[i].photos.push({
                    thumbnail_url: rows[j].thumbnail_url,
                    url: rows[j].url
                  });
                }
              }
            }

            // set up query string and args for third query
            queryString = `SELECT style_id, id, size, quantity FROM skus WHERE style_id = ANY($1)`;
            queryArgs = [productStyleIdsList];

            // third query gathers sku data for all styles
            pool
              .query(queryString, queryArgs)
              .then( ({rows}) => {

                // iterate through array of style objects
                for (let i = 0; i < returnObj.results.length; i++) {

                  // create an sku property in the style object to store sku data
                  returnObj.results[i].skus = {};

                  // iterate through the array of sku objects and add them to matching style object sku property
                  for (let j = 0; j < rows.length; j++) {

                    if (rows[j].style_id == returnObj.results[i].style_id) { // used == instead of === since its comparing strings/numbers
                      returnObj.results[i].skus[rows[j].id] = {
                        size: rows[j].size,
                        quantity: rows[j].quantity
                      };
                    }
                  }
                }

                // return the http request with the correctly formatted data
                // i should probably find a way to gather all the data in a single query then filter out all the trash data
                // and format it into an acceptable return object.
                res.status(200).send(returnObj);


              })
              .catch( (err) => {
                console.log('error in getProductStyles third query');
                res.status(400).send(err);
              });

          })
          .catch( (err) => {
            console.log('error in getProductStyles second query');
            res.status(400).send(err);
          });

      })
      .catch( (err) => {
        console.log('error in getProductStyles first query');
        res.status(400).send(err);
      });

  },


  // get all product_id's related to a specific product (using query callback format)
  getRelatedProducts(req, res) {

    let {product_id} = req.params;
    let queryString = `SELECT (json_agg(related_product_id)) FROM related WHERE current_product_id = $1;`;
    let queryArgs = [product_id];

    pool.query(queryString, queryArgs, (err, dbRes) => {
      if (err) {
        console.log('there was an error in getRelatedProducts db query');
        res.status(400).send(err);
      } else {
        res.status(200).send(dbRes.rows[0].json_agg);
      }
    });
  }





};

module.exports.controllers = controllers;

