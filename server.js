// Babel ES6/JSX Compiler
require('babel-register');

var express = require('express');
var app = express();
var config = require('./config/dbconfig');

var bodyParser = require('body-parser');
var path = require('path');
var multer  = require('multer');
var cookieParser = require('cookie-parser');
var passport = require('passport');

var session = require('express-session');

var mongoose = require('mongoose');
var Product = require('./models/product');

require('./config/passport')(passport);

/***** Database connection *****/
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

/***** Express middleware *****/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

/***** Passport *****/
app.use(session({ secret: 'ilovescotch', resave: false })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

/***** Router *****/
var router = express.Router();

router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next(); 
});

/***** Routes *****/
//pages
app.use(require('./routes/index'));
app.use(require('./routes/product'));
app.use(require('./routes/products'));

//methods
app.use(require('./routes/getProduct'));
app.use(require('./routes/getProducts'));
app.use(require('./routes/signup'));
app.use(require('./routes/login'));
app.use(require('./routes/logout'));
app.use(require('./routes/isLoggedIn'));
app.use(require('./routes/addProduct'));
app.use(require('./routes/editProduct'));
app.use(require('./routes/deleteProduct'));
app.use(require('./routes/createReview'));
app.use(require('./routes/getReviews'));
app.use(require('./routes/users'));

app.use('/', router);

//send any uncaught route to the 404 page
app.route('*')
  .all(function(request, response) {
    response.status(404).sendFile(__dirname + '/app/views/404.html');
});

/***** Startup app *****/
app.listen(9000, function() {
  console.log('Listening on port 9000...'); 
});