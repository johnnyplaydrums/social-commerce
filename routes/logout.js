var express = require('express'),
    router = express.Router(),
    passport = require('passport');

router.get('/logout', function(req, res) {
    req.logout();
    res.end();
});

module.exports = router;