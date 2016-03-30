// Babel ES6/JSX Compiler
require('babel-register');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var config = require('./config');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId; 
var Product = require('./models/product');

mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

/***** Express middleware *****/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

/***** Routes *****/
app.route('/')
  .all(function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
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
  .post(function(request, response) {
    var product = new Product({
      name : request.body.name,
      description : request.body.description,
      techSpecs : request.body.techSpecs,
      averageRating : request.body.rating,
      reviews : [
        {
          title : request.body.reviewTitle,
          description : request.body.reviewDescription,
          rating : request.body.rating
        }
      ]
    });
  
    product.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        response.setHeader('Content-Type', 'application/json');
        response.send({ status : 'success' });
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