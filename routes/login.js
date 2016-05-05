//handle request to /login
var express = require('express'),
    router = express.Router(),
    passport = require('passport');

//process the login form
router.post('/login', function(req, res, next) {
  passport.authenticate('login', function(err, user, info) {
    if (err) { 
      res.send({ loggedIn : false, status : 'server error'}); 
      return; 
    }
    if (!user) { 
      res.send({ loggedIn : false, status : 'no user' }); 
      return; 
    }
    req.logIn(user, function(err) {
      if (err) {
        res.send({ loggedIn : false, status : 'server error'});
        return;
      }
      res.send({ loggedIn : true, user : user });
    });
  })(req, res, next);
});

module.exports = router;