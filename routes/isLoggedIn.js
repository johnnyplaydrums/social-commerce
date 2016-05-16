var express = require('express'),
    router = express.Router(),
    passport = require('passport');

router.get('/isLoggedIn', function(req, res) {
    var status = {};
    if (req.isAuthenticated()) {
      status.loggedIn = true;
      status.user = req.user;
    } else {
      status.loggedIn = false;
    }
    res.send(status);
});

module.exports = router;