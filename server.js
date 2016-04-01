// Babel ES6/JSX Compiler
require('babel-register');

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var multer  = require('multer');

var config = require('./config');
var mongoose = require('mongoose');
var Product = require('./models/product');


/***** Database connection *****/
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

/***** Express middleware *****/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/***** Routes *****/
app.route('/')
  .all(function(request, response) {
    response.sendFile(__dirname + '/app/views/index.html');
});

app.route('/getProducts')
  .get(function(request, response) {
    Product.find(function (err, products) {
      if (err) {
        return console.error(err);
      }
      response.setHeader('Content-Type', 'application/json');
      response.send(products);
    });
});

app.route('/products')
  .get(function(request, response) {
    response.sendFile(__dirname + '/app/views/products.html');
});

app.route('/addProduct')
  .get(function(request, response) {
    response.sendFile(__dirname + '/app/views/addProduct.html');
  })
  .post(multer({ dest: __dirname + '/public/img/'}).single('picture'), function(request, response) {
  
    //create new product object
    var product = new Product({
      name : request.body.name,
      description : request.body.description,
      techSpecs : request.body.techSpecs,
      averageRating : request.body.rating ? request.body.rating : 0,
      img : request.file ? request.file.filename : 'placeholder.jpg',
      reviews : [
        {
          title : request.body.reviewTitle,
          description : request.body.reviewDescription,
          rating : request.body.rating ? request.body.rating : 0
        }
      ]
    });
  
    //save product object to database
    product.save(function(err) {
      if (err) {
        //if there's an error, log it to console
        //TODO: handle error on the front end
        console.log(err);
      } else {
        //on success, reload the addProduct page
        response.sendFile(__dirname + '/app/views/addProduct.html');
      }
    });
});

app.route('/editProduct')
  .get(function(request, response) {
    response.sendFile(__dirname + '/app/views/editProduct.html');
  })
  .post(function(request, response) {
    //update Product document
    var query = { _id : request.body.id},
        update = {
          name : request.body.name,
          description : request.body.description,
          techSpecs : request.body.techSpecs,
        };
  
    Product.update(query, update, function(err, numAffected) {
      response.setHeader('Content-Type', 'application/json');
      response.send({ status : 'success', numAffected : numAffected });
    });
});

app.route('/getProduct')
  .get(function(request, response) {
    //get productId from request
    var id = request.query.id;
    Product.findById(id, function (err, product) {
      if (err) {
        return console.error(err);
      }
      response.setHeader('Content-Type', 'application/json');
      response.send(product);
    });
});

app.route('*')
  .all(function(request, response) {
    response.status(404).sendFile(__dirname + '/app/views/404.html');
});

/***** Startup app *****/
app.listen(9000, function() {
  console.log('Listening on port 9000...'); 
});