var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var datamodel = require('../models/map_data');

var testnaam = 'testnaamv1';
var carAmount = 0;
var carAmountString = 0;

router.get('/mapdata/:id', function(req, res){
  testnaam = "verbeterd!";
  console.log(testnaam);
  console.log(req.params.id);
  locatieID = req.params.id;



  datamodel.find({locatinID: locatieID}, {date: { $lte: new Date('2018-02-03T13:35:00.000Z') }}).count({}, function( err, count){
      console.log( "Number of cars:", count );
      carAmount = count;
      res.send(carAmount.toString());
  });
});

/* get MAP page */
router.get('/', ensureAuthenticated, function(req, res) {
    res.render('map',{ title: 'Pulse', Cars: carAmount});
});

router.get('/a', function (req, res) {
  res.send('Hello from A!')
})


function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()){
      return next();
  } else {
      req.flash('error_msg', 'You are not logged in');
      res.redirect('/users/login/');
  }

}

module.exports = router;
