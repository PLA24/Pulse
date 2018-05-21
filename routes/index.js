var express = require('express');
var mongoose = require('mongoose');
var datamodel = require('../models/map_data');
var router = express.Router();
/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) {
  res.render('index', {
    title: "Pulse",
    currentUser: req.user.username
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/homepage');
  }
}

router.get('/livecountday', function(req, res) {
  var livecounter = {};
  datamodel.find({
    $and: [{
        voertuigcategorie: "Personenauto"
      },
      {
        date: {
          $gte: new Date("2018-02-03"),
          $lt: new Date("2018-02-04")
        }
      }
    ]
  }).count({}, function(err, count) {
    livecounter.personenauto = count.toString();

    datamodel.find({
      $and: [{
          voertuigcategorie: "Bedrijfsauto"
        },
        {
          date: {
            $gte: new Date("2018-02-03"),
            $lt: new Date("2018-02-04")
          }
        }
      ]
    }).count({}, function(err, count) {
      livecounter.bedrijfsauto = count.toString();

      datamodel.find({
        $and: [{
            voertuigcategorie: "Aanhangwagen"
          },
          {
            date: {
              $gte: new Date("2018-02-03"),
              $lt: new Date("2018-02-04")
            }
          }
        ]
      }).count({}, function(err, count) {
        livecounter.aanhangwagen = count.toString();

        datamodel.find({
          $and: [{
              voertuigcategorie: "Motorfiets"
            },
            {
              date: {
                $gte: new Date("2018-02-03"),
                $lt: new Date("2018-02-04")
              }
            }
          ]
        }).count({}, function(err, count) {
          livecounter.motorfiets = count.toString();

          datamodel.find({
            $and: [{
                voertuigcategorie: "Bromfiets"
              },
              {
                date: {
                  $gte: new Date("2018-02-03"),
                  $lt: new Date("2018-02-04")
                }
              }
            ]
          }).count({}, function(err, count) {
            livecounter.bromfiets = count.toString();
            res.send(livecounter);
          })
        })
      })
    })
  })

})

router.get('/livecountweek', function(req, res) {
  var livecounter = {};
  datamodel.find({
    $and: [{
        voertuigcategorie: "Personenauto"
      },
      {
        date: {
          $gte: new Date("2018-02-03"),
          $lt: new Date("2018-02-04")
        }
      }
    ]
  }).count({}, function(err, count) {
    livecounter.personenauto = count.toString();

    datamodel.find({
      $and: [{
          voertuigcategorie: "Bedrijfsauto"
        },
        {
          date: {
            $gte: new Date("2018-02-03"),
            $lt: new Date("2018-02-04")
          }
        }
      ]
    }).count({}, function(err, count) {
      livecounter.bedrijfsauto = count.toString();

      datamodel.find({
        $and: [{
            voertuigcategorie: "Aanhangwagen"
          },
          {
            date: {
              $gte: new Date("2018-02-03"),
              $lt: new Date("2018-02-04")
            }
          }
        ]
      }).count({}, function(err, count) {
        livecounter.aanhangwagen = count.toString();

        datamodel.find({
          $and: [{
              voertuigcategorie: "Motorfiets"
            },
            {
              date: {
                $gte: new Date("2018-02-03"),
                $lt: new Date("2018-02-04")
              }
            }
          ]
        }).count({}, function(err, count) {
          livecounter.motorfiets = count.toString();

          datamodel.find({
            $and: [{
                voertuigcategorie: "Bromfiets"
              },
              {
                date: {
                  $gte: new Date("2018-02-03"),
                  $lt: new Date("2018-02-04")
                }
              }
            ]
          }).count({}, function(err, count) {
            livecounter.bromfiets = count.toString();
            res.send(livecounter);
          })
        })
      })
    })
  })

})

router.get('/fueldata', function(req, res) {
  var fuel = {};
  datamodel.find({
    $and: [{
        brandstof: "elektrisch"
      },
      {
        date: {
          $gte: new Date("2018-02-03"),
          $lt: new Date("2018-02-04")
        }
      }
    ]
  }).count({}, function(err, count) {
    console.log("Number of elektric cars:", count);
    fuel.elektrisch = count.toString();

    datamodel.find({
      $and: [{
          brandstof: "benzine"
        },
        {
          date: {
            $gte: new Date("2018-02-03"),
            $lt: new Date("2018-02-04")
          }
        }
      ]
    }).count({}, function(err, count) {
      console.log("Number of gasoline cars:", count);
      fuel.benzine = count.toString();
      //res.send(fuel);

      datamodel.find({
        $and: [{
            brandstof: "diesel"
          },
          {
            date: {
              $gte: new Date("2018-02-03"),
              $lt: new Date("2018-02-04")
            }
          }
        ]
      }).count({}, function(err, count) {
        console.log("Number of diesel cars:", count);
        fuel.diesel = count.toString();

        datamodel.find({
          $and: [{
              brandstof: "hybride"
            },
            {
              date: {
                $gte: new Date("2018-02-03"),
                $lt: new Date("2018-02-04")
              }
            }
          ]
        }).count({}, function(err, count) {
          console.log("Number of hybrid cars:", count);
          fuel.hybrid = count.toString();
          res.send(fuel);

        });
      });
    });
  });
});

module.exports = router;
