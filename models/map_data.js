var mongoose = require('mongoose');

var CarsSchema = mongoose.Schema({
  locatinID: {
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
  }
});

var Cars = module.exports = mongoose.model('cars', CarsSchema);
