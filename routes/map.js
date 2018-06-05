var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var datamodel = require('../models/map_data');
var datamodel2 = require('../models/map_data_pi');
var carAmount = 0;
var carAmountString = 0;

//get current day and the day after that
var today = new Date();
var todayplus = new Date();
todayplus.setDate(todayplus.getDate() + 1);
var curday = today.getDate();
var curmonth = today.getMonth() + 1; //January is 0!
var curyear = today.getFullYear();
var curday2 = todayplus.getDate();
var curmonth2 = todayplus.getMonth() + 1; //January is 0!
var curyear2 = todayplus.getFullYear();

if (curday < 10) {
  curday = '0' + curday
}
if (curmonth < 10) {
  curmonth = '0' + curmonth
}

if (curday2 < 10) {
  curday2 = '0' + curday2
}
if (curmonth2 < 10) {
  curmonth2 = '0' + curmonth2
}

today = curyear + '-' + curmonth + '-' + curday;
todayplus = curyear2 + '-' + curmonth2 + '-' + curday2;

// get request for current total of cars based upon the id of the pulse
router.get('/mapdata/:id', function(req, res) {
  console.log(req.params.id);
  locatieID = req.params.id;
  //query for calculating the total amount of car for a given date based upon
  // the idlocation


  var CarsInfo = {};

  datamodel2.find({
    $and: [{
        siteSpotted: "Pulse" + locatieID
      },
      {
        timeSpotted: {
          $gte: new Date(today),
          $lt: new Date(todayplus)
        }
      }
    ]
  }).count({}, function(err, count) {
    console.log("Number of cars:", count);
    CarsInfo.AmountTotal = count;
    datamodel2.find({
      $and: [{
          siteSpotted: "Pulse" + locatieID
        },
        {
          timeSpotted: {
            $gte: new Date(today + "T00:00:00.000Z"),
            $lt: new Date(today + "T06:00:00.000Z")
          }
        }
      ]
    }).count({}, function(err, count) {

      CarsInfo.time01 = count;


      datamodel2.find({
        $and: [{
            siteSpotted: "Pulse" + locatieID
          },
          {
            timeSpotted: {
              $gte: new Date(today + "T06:00:00.000Z"),
              $lt: new Date(today + "T12:00:00.000Z")
            }
          }
        ]
      }).count({}, function(err, count) {

        CarsInfo.time02 = count;

        datamodel2.find({
          $and: [{
              siteSpotted: "Pulse" + locatieID
            },
            {
              timeSpotted: {
                $gte: new Date(today + "T12:00:00.000Z"),
                $lt: new Date(today + "T18:00:00.000Z")
              }
            }
          ]
        }).count({}, function(err, count) {

          CarsInfo.time03 = count;
          //res.send(CarsInfo);

          datamodel2.find({
            $and: [{
                siteSpotted: "Pulse" + locatieID
              },
              {
                siteSpotted: {
                  $gte: new Date(today + "T18:00:00.000Z"),
                  $lt: new Date(today + "T24:00:00.000Z")
                }
              }
            ]
          }).count({}, function(err, count) {

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
      res.render('map',{ title: 'Pulse', currentUser: req.user.username, Cars: carAmount});
      datamodel.find( {date: { $eq: new Date('2018-02-01T14:35:00.000') }}).count({}, function( err, counttest){
        console.log( "Number of cars test:", counttest );
    });
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login/');
  }

}

module.exports = router;
