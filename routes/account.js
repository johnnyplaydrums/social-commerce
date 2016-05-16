//user account page
var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    path = require('path'),
    User = require(path.join(__dirname, '/../models/user'));

router.get('/account', function(req, res) {
  if (!req.user) {
    return res.sendFile(path.join(__dirname + '/../public/views/permissionError.html'));
  }
  
  return res.sendFile(path.join(__dirname + '/../public/views/account.html'));
  
});

router.get('/getUser', function(req, res) {
  return res.send(req.user);
});

router.post('/updateUsername', function(req, res) {
  if (!req.user) {
    return res.sendFile(path.join(__dirname + '/../public/views/permissionError.html'));
  }
  
  User.findOne({ username : req.body.newUsername }, function(err, user) {
    if (err) {
      return res.send({ status : 'error'});
    }
    if (user) {
      return res.send({ status : 'username taken'}); 
    } else {
      User.findById(req.user._id, function(err, user) {
        if (err) {
          return res.send({ status : 'error'});
        }
        if (!user) {
          return res.send({ status : 'error'});
        }
        
        user.username = req.body.newUsername;
        user.save(function(err) {
          if (err) {
            return res.send({ status : 'error'});
          }
          return res.send({ status : 'success'});
        });
      });
    }
  });
  
});

router.post('/changePassword', function(req, res) {
  if (!req.user) {
    return res.sendFile(path.join(__dirname + '/../public/views/permissionError.html'));
  }
  
  User.findOne({ _id : req.user._id}, function(err, user) {
    if (err) {
      return res.send({ status : 'error'});
    }
    user.password = user.generateHash(req.body.password);
    user.save(function(err) {
      if (err) {
        return res.send({ status : 'error'});
      }
      return res.send({ status : 'success' });
    });
  });
});

module.exports = router;