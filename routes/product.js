var express = require('express'),
    path = require('path'),
    router = express.Router();

router.get('/product', function(request, response) {
    response.sendFile(path.join(__dirname + '/../public/views/product.html'));
});

module.exports = router;
