var mongoose = require('mongoose');
//database model for retrieving data from cars collection (OLD)
var CarsSchema = mongoose.Schema({
  locatieID: {
    type: Number,
    index: true

  },
  date: {
    type: Date,
    index: true
  },
  kenteken: {
    type: String,
    index: true
  },
  voertuigcategorie: {
    type: String,
    index: true
  },
  carrosserietype: {
    type: String,
    index: true
  },
  merk: {
    type: String,
    index: true
  },
  brandstof: {
    type: String,
    index: true
  }
});

var Cars = module.exports = mongoose.model('cars', CarsSchema);
