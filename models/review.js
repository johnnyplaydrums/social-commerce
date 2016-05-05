var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  productId : String,
  title : String,
  description : String,
  rating : Number,
  createdBy : String
});

module.exports = mongoose.model('Review', reviewSchema);