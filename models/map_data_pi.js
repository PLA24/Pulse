var mongoose = require('mongoose');
//database model for retrieving data from vehicles collection
var CarsSchemaPi = mongoose.Schema({
  vehicletype: {
    type: String,
    index: true
  },
  maincolor: {
    type: String,
    index: true
  },
  economylabel: {
    type: String,
    index: true
  },
  timeSpotted: {
    type: Date,
    index: true
  },
  siteSpotted: {
    type: String,
    index: true
  },
  numberplate: {
    type: String,
    index: true
  },
  brand: {
    type: String,
    index: true
  },
  tradename: {
    type: String,
    index: true
  },
  __v: {
    type: Number,
    index: true
  }
});

var CarsPi = module.exports = mongoose.model('vehicles', CarsSchemaPi);
