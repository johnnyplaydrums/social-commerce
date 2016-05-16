var mongoose = require('mongoose');
var Review = require('./review.js');

var productSchema = new mongoose.Schema({
  name : String,
  description : String,
  techSpecs : String,
  averageRating : { type : Number, default : 0},
  img : String,
  numReviews : Number,
  createdBy : String
});

module.exports = mongoose.model('Product', productSchema);
