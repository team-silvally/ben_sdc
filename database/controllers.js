// import db info
const {client} = require('./index.js'); // consider using pools???


const controllers = {

  // ============================================
  // PRODUCT HANDLERS
  // ============================================

  // get all products
  getAllProducts(req, res) {

    // fetch 5 products by default
    let count = req.query.count || 5;

    client.query(`SELECT * FROM products LIMIT ${count};`, (err, dbRes) => {
      if (err) {
        console.log('there was an error in getAllProducts db query');
        res.status(400).send(err);
      } else {
        res.status(200).send(dbRes.rows);
      }
    });
  },


  // get product info by its ID
  //  *** NEED TO GET FEATURES AND ATTACH THAT TO RETURN OBJ IN CORRECT FORMAT
  getProductById(req, res) {

    let {product_id} = req.params;

    // first query gets the product info
    client
      .query(`SELECT * FROM products WHERE id = ${product_id};`)
      .then( ({rows}) => {

        let productData = rows[0];

        // second query gets the feature info, combines into single obj, and returns it
        client
          .query(`SELECT name, value FROM features WHERE product_id = ${product_id}`)
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

    console.log('made it to getProductStyles');


  },


  // get all product_id's related to a specific product
  // *** EACH RELATED ITEM IS COMING BACK AS ITS OWN OBJ WITH KEY/VALUE PAIR INSTEAD OF AN ARRAY
  getRelatedProducts(req, res) {

    let {product_id} = req.params;
    // let queryString = `SELECT related_product_id FROM related WHERE current_product_id = $1;`;

    let queryString = `SELECT related_product_id FROM related WHERE current_product_id = $1::json->2`;


    let queryArgs = [product_id];

    client.query(queryString, queryArgs, (err, dbRes) => {
      if (err) {
        console.log('there was an error in getRelatedProducts db query');
        res.status(400).send(err);
      } else {
        res.status(200).send(dbRes.rows);
      }
    });
  }

















};

module.exports.controllers = controllers;
