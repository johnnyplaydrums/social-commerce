var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  title : String,
  description : String,
  rating : String,
});

var productSchema = new mongoose.Schema({
  name : String,
  description : String,
  techSpecs : String,
  averageRating : {type : Number, default: 0},
  reviews : [reviewSchema],
  createdBy : String
});

module.exports = mongoose.model('Product', productSchema);
