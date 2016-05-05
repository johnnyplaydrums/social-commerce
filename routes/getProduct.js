//handle request to /getProduct
var express = require('express'),
    path = require('path'),
    router = express.Router(),
    Product = require(path.join(__dirname, '/../models/product'));

router.get('/getProduct', function(req, res) {
    //get productId from request
    var id = req.query.id;
    Product.findById(id, function (err, product) {
      if (err) {
        return console.error(err);
      }
      res.send(product);
    });
});

module.exports = router;