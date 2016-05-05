var express = require('express'),
    path = require('path'),
    router = express.Router();

router.get('/products', function(request, response) {
    response.sendFile(path.join(__dirname + '/../public/views/products.html'));
});

module.exports = router;
