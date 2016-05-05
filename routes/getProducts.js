//handle request to /getProducts

var express = require('express'),
    path = require('path'),
    router = express.Router(),
    Product = require(path.join(__dirname, '/../models/product'));

router.get('/getProducts', function(request, response) {
  Product.find(function (err, products) {
      if (err) {
        return console.error(err);
      }
      response.send(products);
    });
});

module.exports = router;