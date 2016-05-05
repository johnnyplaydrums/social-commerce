//handle request to /deleteProduct
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// process the signup form
router.post('/signup', function(req, res, next) {
    passport.authenticate('signup', function(err, user, info) {
      if (err) { 
        res.send({ loggedIn : false, status : 'server error'});  
        return; 
      }
      if (!user) { 
        res.send({ loggedIn : false, status : 'username taken', user : user }); 
        return;
      }
      req.logIn(user, function(err) {
        if (err) { console.log(err); return; }
        res.send({ loggedIn : true, user : user });
      });
    })(req, res, next);
});

module.exports = router;