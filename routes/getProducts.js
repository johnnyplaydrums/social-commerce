var express = require('express'),
    path = require('path'),
    router = express.Router(),
    Product = require(path.join(__dirname, '/../models/product')),
    Review = require(path.join(__dirname, '/../models/review'));

router.get('/getProducts', function(req, res) {
  Product.find(function (err, products) {
      if (err) {
        return console.error(err);
      }
      res.send(products);
    });
});

router.get('/getMyProducts', function(req, res) {
  if (!req.user) {
    return res.send({ status : 'no user'});
  }
  Product.find({ createdBy : req.user.username }, function(err, products) {
    if (err) {
      return res.send({ status : 'error'});
    }
    
    res.send(products);
    
  });
});

router.get('/getFriendProducts', function(req, res) {
  var productsArray = [];
  if (!req.user) {
    return res.send({ status : 'no user'});
  }
  
  Review.find({ createdBy : { $ne : req.user.username }}, function(err, reviews) {
    var i,
        friendReviews = [];
    if (err) {
      return res.send({ status : 'error'});
    }

    //remove reviews that weren't made by friends
    for (i = 0; i < reviews.length; i++) {
      if (req.user.friends.indexOf(reviews[i].createdBy) >= 0) {
        friendReviews.push(reviews[i]);
      }
    }

    Product.find(function(err, products) {
      var i,
          j;
      if (err) {
        return res.send({ status : 'error'});
      }
      for (i = 0; i < friendReviews.length; i++) {
        for (j = 0; j < products.length; j++) {
          if (friendReviews[i].productId  == products[j]._id) {
            if (productsArray.indexOf(products[j]) < 0) {
              productsArray.push(products[j]);  
            }
          }
        }
      }
      return res.send({ products : productsArray });
    });
  });
  
});

function getProduct(id) {
  Product.findById(id, function(err, product) {
    if (err) {
      return { status : 'error'};
    }
    return product;
  });
}

module.exports = router;