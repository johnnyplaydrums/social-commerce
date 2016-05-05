//handle request to /createReview
var express = require('express'),
    path = require('path'),
    router = express.Router(),
    Product = require(path.join(__dirname, '/../models/product')),
    Review = require(path.join(__dirname, '/../models/review'));

router.get('/createReview', function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/views/createReview.html'));
});

router.post('/createReview', function(req, res) {
  //user has submitted review form
  //create new review object
  var review = new Review({
    productId : req.body.productId,
    title : req.body.title,
    description : req.body.description,
    rating : req.body.rating ? req.body.rating : 0,
    createdBy : req.user ? req.user.username : 'anonymous'
  });
  
  //save the review
  review.save(function(err) {
    if (err) {
      res.send({ status : 'error'});
    }
    
    //update the average rating of this product
    updateAverage(req, res);
  });
});
  
function updateAverage(req, res) {

  //find the product that was reviewed
  Product.findById(req.body.productId, function(err, product) {
    
    //used for average rating
    var sum = 0,
        average = 0,
        i;
    
    if (err) {
      res.send({ status : 'error'});
    }
    
    //increment the number of reviews for this product by 1
    product.numReviews += 1;
    
    //find all reviews for this product
    Review.find({ productId : req.body.productId }, function(err, reviews) {
      if (err) {
        res.send({ status : 'error'});
      }
      
      //loop through reviews and calculate average rating
      for (i = 0; i < reviews.length; i++) {
        sum += reviews[i].rating;
      }
      average = sum / reviews.length;
      
      //update average rating
      product.averageRating = average;

      //save the product
      product.save(function (err) {
        if (err) {
          res.send({ status : 'error'});
        }

        res.send({ status : 'success'});  
      });
      
    });
  });
}

module.exports = router;