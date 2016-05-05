//handle request to /editProducts
var express = require('express'),
    path = require('path'),
    router = express.Router(),
    multer  = require('multer'),
    Product = require(path.join(__dirname, '/../models/product'));

router.get('/editProduct', function(req, res) {
  if (!req.user) {
    res.sendFile(path.join(__dirname, '/../public/views/permissionError.html'));
  }
  res.sendFile(path.join(__dirname + '/../public/views/editProduct.html'));
});

router.post('/editProduct', multer({ dest: path.join(__dirname, '/../public/img/')}).single('newPicture'), function(req, res) {
  if (!req.user) {
    res.sendFile(path.join(__dirname, '/../public/views/permissionError.html'));
  }
  
  //update Product document
  var query = { _id : req.body.id },
      update = {
        name : req.body.name,
        description : req.body.description,
        techSpecs : req.body.techSpecs,
        img : req.file ? req.file.filename : req.body.currentPicture,
      };

  Product.update(query, update, function(err, numAffected) {
    if (err) {
      res.send({ status : 'error'});
    }
    res.sendFile(path.join(__dirname, '/../public/views/index.html'));
  });
});

module.exports = router;