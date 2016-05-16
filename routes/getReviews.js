//handle request to /getReviews
var express = require('express'),
    path = require('path'),
    router = express.Router(),
    Review = require(path.join(__dirname, '/../models/review'));

router.get('/getReviews', function(req, res) {
  Review.find({ productId : req.query.id }, function(err, reviews) {
    if (err) {
      res.send({ status : 'error' });
    }    
    res.send(reviews);
  });
});

module.exports = router;