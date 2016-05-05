//handle request to /deleteProduct
var express = require('express'),
    path = require('path'),
    router = express.Router(),
    Product = require(path.join(__dirname, '/../models/product'));

router.post('/deleteProduct', function(req, res) {
  if (!req.user) {
    res.sendFile(path.join(__dirname, '/../public/views/permissionError.html'));
  }
  
  var id = req.body.id;
  Product.remove({ _id : id }, function(err) {
    if (err) {
      res.send({ status : 'error' });
    }
    res.send({ status : 'success' });
  });
});

module.exports = router;