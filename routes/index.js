var express = require('express'),
    path = require('path'),
    router = express.Router();

router.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/../public/views/index.html'));
});

module.exports = router;