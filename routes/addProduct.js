//handle request to /addProducts
var express = require('express'),
    path = require('path'),
    router = express.Router(),
    multer  = require('multer'),
    Product = require(path.join(__dirname, '/../models/product')),
    Review = require(path.join(__dirname, '/../models/review'));

router.get('/addProduct', function(req, res) {
  if (!req.user) {
    res.sendFile(path.join(__dirname, '/../public/views/permissionError.html'));
  }
  
  res.sendFile(path.join(__dirname, '/../public/views/addProduct.html'));
});

router.post('/addProduct', multer({ dest: path.join(__dirname, '/../public/img/')}).single('picture'), function(req, res) {
  if (!req.user) {
    res.sendFile(path.join(__dirname, '/../public/views/permissionError.html'));
  }
  
  //create new product object
  var product = new Product({
    name : req.body.name,
    description : req.body.description,
    techSpecs : req.body.techSpecs,
    averageRating : req.body.rating ? req.body.rating : 0,
    img : req.file ? req.file.filename : 'placeholder.jpg',
    numReviews : 1,
    createdBy : req.body.username
  });


  //save product object to database
  product.save(function(err) {
    if (err) {
      res.send({ status : 'error'});
    }
  });
  
  //create new review for product
  var review = new Review({
    productId : product._id,
    title : req.body.reviewTitle,
    description : req.body.reviewDescription,
    rating : req.body.rating ? req.body.rating : 0
  });
  
  //save review object to database
  review.save(function(err) {
    if (err) {
      res.send({ status : 'error'});
    }
    res.sendFile(path.join(__dirname, '/../public/views/index.html'));
  });
  
});

module.exports = router;