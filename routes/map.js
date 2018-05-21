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
  //query for calculating the total amount of car for a given date based upon
  // the idlocation


var CarsInfo = {};

  datamodel.find( {
  $and : [
      { locatieID: locatieID},
      {date: { $gte: new Date("2018-02-03"),
                    $lt: new Date("2018-02-04") }}
  ]
} ).count({}, function( err, count){
      console.log( "Number of cars:", count );
      CarsInfo.AmountTotal = count;

        datamodel.find( {
        $and : [
            { locatieID: locatieID},
            {date: { $gte: new Date("2018-02-03T00:00:00.000Z"),
                          $lt: new Date("2018-02-03T06:00:00.000Z") }}
        ]
        } ).count({}, function( err, count){
            console.log( "BLABLABLABLABLA:", count );
            CarsInfo.time01 = count;


              datamodel.find( {
              $and : [
                  { locatieID: locatieID},
                  {date: { $gte: new Date("2018-02-03T06:00:00.000Z"),
                                $lt: new Date("2018-02-03T12:00:00.000Z") }}
              ]
              } ).count({}, function( err, count){
                  console.log( "BLABLABLABLABLA:", count );
                  CarsInfo.time02 = count;

                  datamodel.find( {
                  $and : [
                      { locatieID: locatieID},
                      {date: { $gte: new Date("2018-02-03T12:00:00.000Z"),
                                    $lt: new Date("2018-02-03T18:00:00.000Z") }}
                  ]
                  } ).count({}, function( err, count){
                      console.log( "BLABLABLABLABLA:", count );
                      CarsInfo.time03 = count;
                        //res.send(CarsInfo);

                        datamodel.find( {
                        $and : [
                            { locatieID: locatieID},
                            {date: { $gte: new Date("2018-02-03T18:00:00.000Z"),
                                          $lt: new Date("2018-02-03T24:00:00.000Z") }}
                        ]
                        } ).count({}, function( err, count){
                            console.log( "BLABLABLABLABLA:", count );
                            CarsInfo.time04 = count;
                              res.send(CarsInfo);


                        });

                  });





              });

        });




  });




});

/* get MAP page */
router.get('/', ensureAuthenticated, function(req, res) {
    res.render('map',{ title: 'Pulse', Cars: carAmount});
      datamodel.find( {date: { $eq: new Date('2018-02-01T14:35:00.000') }}).count({}, function( err, counttest){
        console.log( "Number of cars test:", counttest );
    });
});


function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()){
      return next();
  } else {
      req.flash('error_msg', 'You are not logged in');
      res.redirect('/users/login/');
  }

}

module.exports = router;
