var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
  image_term: String,
  date: Date
});

module.exports = mongoose.model('Image', Image);
