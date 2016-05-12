//user account page
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.get('/account', function(req, res) {
  if (!req.user) {
    return res.sendFile(path.join(__dirname + '/../public/views/permissionError.html'));
  }
  
  return res.sendFile(path.join(__dirname + '/../public/views/account.html'));
  
});

router.get('/getUser', function(req, res) {
  return res.send(req.user);
});

module.exports = router;