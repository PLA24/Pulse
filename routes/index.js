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

router.get('/graphdata01', function(req, res) {
  var graphdata01= {};
  datamodel.find({
    $and: [{
        voertuigcategorie: "Personenauto"
      },
      {
        date: {
          $gte: new Date("2018-02-03T00:00:00.000Z"),
          $lt: new Date("2018-02-03T03:00:00.000Z")
        }
      }
    ]
  }).count({}, function(err, count) {
    graphdata01.personenauto = count.toString();

    datamodel.find({
      $and: [{
          voertuigcategorie: "Bedrijfsauto"
        },
        {
          date: {
            $gte: new Date("2018-02-03T00:00:00.000Z"),
            $lt: new Date("2018-02-03T03:00:00.000Z")
          }
        }
      ]
    }).count({}, function(err, count) {
      graphdata01.bedrijfsauto = count.toString();

      datamodel.find({
        $and: [{
            voertuigcategorie: "Aanhangwagen"
          },
          {
            date: {
              $gte: new Date("2018-02-03T00:00:00.000Z"),
              $lt: new Date("2018-02-03T03:00:00.000Z")
            }
          }
        ]
      }).count({}, function(err, count) {
        graphdata01.aanhangwagen = count.toString();

        datamodel.find({
          $and: [{
              voertuigcategorie: "Motorfiets"
            },
            {
              date: {
                $gte: new Date("2018-02-03T00:00:00.000Z"),
                $lt: new Date("2018-02-03T03:00:00.000Z")
              }
            }
          ]
        }).count({}, function(err, count) {
          graphdata01.motorfiets = count.toString();

          datamodel.find({
            $and: [{
                voertuigcategorie: "Bromfiets"
              },
              {
                date: {
                  $gte: new Date("2018-02-03T00:00:00.000Z"),
                  $lt: new Date("2018-02-03T03:00:00.000Z")
                }
              }
            ]
          }).count({}, function(err, count) {
            graphdata01.bromfiets = count.toString();
            res.send(graphdata01);
          })
        })
      })
    })
  })

})

router.get('/graphdata02', function(req, res) {
  var graphdata02= {};
  datamodel.find({
    $and: [{
        voertuigcategorie: "Personenauto"
      },
      {
        date: {
          $gte: new Date("2018-02-03T03:00:00.000Z"),
          $lt: new Date("2018-02-03T07:00:00.000Z")
        }
      }
    ]
  }).count({}, function(err, count) {
    graphdata02.personenauto = count.toString();

    datamodel.find({
      $and: [{
          voertuigcategorie: "Bedrijfsauto"
        },
        {
          date: {
            $gte: new Date("2018-02-03T03:00:00.000Z"),
            $lt: new Date("2018-02-03T07:00:00.000Z")
          }
        }
      ]
    }).count({}, function(err, count) {
      graphdata02.bedrijfsauto = count.toString();

      datamodel.find({
        $and: [{
            voertuigcategorie: "Aanhangwagen"
          },
          {
            date: {
              $gte: new Date("2018-02-03T03:00:00.000Z"),
              $lt: new Date("2018-02-03T07:00:00.000Z")
            }
          }
        ]
      }).count({}, function(err, count) {
        graphdata02.aanhangwagen = count.toString();

        datamodel.find({
          $and: [{
              voertuigcategorie: "Motorfiets"
            },
            {
              date: {
                $gte: new Date("2018-02-03T03:00:00.000Z"),
                $lt: new Date("2018-02-03T07:00:00.000Z")
              }
            }
          ]
        }).count({}, function(err, count) {
          graphdata02.motorfiets = count.toString();

          datamodel.find({
            $and: [{
                voertuigcategorie: "Bromfiets"
              },
              {
                date: {
                  $gte: new Date("2018-02-03T03:00:00.000Z"),
                  $lt: new Date("2018-02-03T07:00:00.000Z")
                }
              }
            ]
          }).count({}, function(err, count) {
            graphdata02.bromfiets = count.toString();
            res.send(graphdata02);
          })
        })
      })
    })
  })

})

router.get('/graphdata03', function(req, res) {
  var graphdata03= {};
  datamodel.find({
    $and: [{
        voertuigcategorie: "Personenauto"
      },
      {
        date: {
          $gte: new Date("2018-02-03T07:00:00.000Z"),
          $lt: new Date("2018-02-03T11:00:00.000Z")
        }
      }
    ]
  }).count({}, function(err, count) {
    graphdata03.personenauto = count.toString();

    datamodel.find({
      $and: [{
          voertuigcategorie: "Bedrijfsauto"
        },
        {
          date: {
            $gte: new Date("2018-02-03T07:00:00.000Z"),
            $lt: new Date("2018-02-03T11:00:00.000Z")
          }
        }
      ]
    }).count({}, function(err, count) {
      graphdata03.bedrijfsauto = count.toString();

      datamodel.find({
        $and: [{
            voertuigcategorie: "Aanhangwagen"
          },
          {
            date: {
              $gte: new Date("2018-02-03T07:00:00.000Z"),
              $lt: new Date("2018-02-03T11:00:00.000Z")
            }
          }
        ]
      }).count({}, function(err, count) {
        graphdata03.aanhangwagen = count.toString();

        datamodel.find({
          $and: [{
              voertuigcategorie: "Motorfiets"
            },
            {
              date: {
                $gte: new Date("2018-02-03T07:00:00.000Z"),
                $lt: new Date("2018-02-03T11:00:00.000Z")
              }
            }
          ]
        }).count({}, function(err, count) {
          graphdata03.motorfiets = count.toString();

          datamodel.find({
            $and: [{
                voertuigcategorie: "Bromfiets"
              },
              {
                date: {
                  $gte: new Date("2018-02-03T07:00:00.000Z"),
                  $lt: new Date("2018-02-03T11:00:00.000Z")
                }
              }
            ]
          }).count({}, function(err, count) {
            graphdata03.bromfiets = count.toString();
            res.send(graphdata03);
          })
        })
      })
    })
  })

})

router.get('/graphdata04', function(req, res) {
  var graphdata04= {};
  datamodel.find({
    $and: [{
        voertuigcategorie: "Personenauto"
      },
      {
        date: {
          $gte: new Date("2018-02-03T11:00:00.000Z"),
          $lt: new Date("2018-02-03T15:00:00.000Z")
        }
      }
    ]
  }).count({}, function(err, count) {
    graphdata04.personenauto = count.toString();

    datamodel.find({
      $and: [{
          voertuigcategorie: "Bedrijfsauto"
        },
        {
          date: {
            $gte: new Date("2018-02-03T11:00:00.000Z"),
            $lt: new Date("2018-02-03T15:00:00.000Z")
          }
        }
      ]
    }).count({}, function(err, count) {
      graphdata04.bedrijfsauto = count.toString();

      datamodel.find({
        $and: [{
            voertuigcategorie: "Aanhangwagen"
          },
          {
            date: {
              $gte: new Date("2018-02-03T11:00:00.000Z"),
              $lt: new Date("2018-02-03T15:00:00.000Z")
            }
          }
        ]
      }).count({}, function(err, count) {
        graphdata04.aanhangwagen = count.toString();

        datamodel.find({
          $and: [{
              voertuigcategorie: "Motorfiets"
            },
            {
              date: {
                $gte: new Date("2018-02-03T11:00:00.000Z"),
                $lt: new Date("2018-02-03T15:00:00.000Z")
              }
            }
          ]
        }).count({}, function(err, count) {
          graphdata04.motorfiets = count.toString();

          datamodel.find({
            $and: [{
                voertuigcategorie: "Bromfiets"
              },
              {
                date: {
                  $gte: new Date("2018-02-03T11:00:00.000Z"),
                  $lt: new Date("2018-02-03T15:00:00.000Z")
                }
              }
            ]
          }).count({}, function(err, count) {
            graphdata04.bromfiets = count.toString();
            res.send(graphdata04);
          })
        })
      })
    })
  })

})

router.get('/graphdata05', function(req, res) {
  var graphdata05= {};
  datamodel.find({
    $and: [{
        voertuigcategorie: "Personenauto"
      },
      {
        date: {
          $gte: new Date("2018-02-03T15:00:00.000Z"),
          $lt: new Date("2018-02-03T19:00:00.000Z")
        }
      }
    ]
  }).count({}, function(err, count) {
    graphdata05.personenauto = count.toString();

    datamodel.find({
      $and: [{
          voertuigcategorie: "Bedrijfsauto"
        },
        {
          date: {
            $gte: new Date("2018-02-03T15:00:00.000Z"),
            $lt: new Date("2018-02-03T19:00:00.000Z")
          }
        }
      ]
    }).count({}, function(err, count) {
      graphdata05.bedrijfsauto = count.toString();

      datamodel.find({
        $and: [{
            voertuigcategorie: "Aanhangwagen"
          },
          {
            date: {
              $gte: new Date("2018-02-03T15:00:00.000Z"),
              $lt: new Date("2018-02-03T19:00:00.000Z")
            }
          }
        ]
      }).count({}, function(err, count) {
        graphdata05.aanhangwagen = count.toString();

        datamodel.find({
          $and: [{
              voertuigcategorie: "Motorfiets"
            },
            {
              date: {
                $gte: new Date("2018-02-03T15:00:00.000Z"),
                $lt: new Date("2018-02-03T19:00:00.000Z")
              }
            }
          ]
        }).count({}, function(err, count) {
          graphdata05.motorfiets = count.toString();

          datamodel.find({
            $and: [{
                voertuigcategorie: "Bromfiets"
              },
              {
                date: {
                  $gte: new Date("2018-02-03T15:00:00.000Z"),
                  $lt: new Date("2018-02-03T19:00:00.000Z")
                }
              }
            ]
          }).count({}, function(err, count) {
            graphdata05.bromfiets = count.toString();
            res.send(graphdata05);
          })
        })
      })
    })
  })

})

router.get('/graphdata06', function(req, res) {
  var graphdata06= {};
  datamodel.find({
    $and: [{
        voertuigcategorie: "Personenauto"
      },
      {
        date: {
          $gte: new Date("2018-02-03T19:00:00.000Z"),
          $lt: new Date("2018-02-03T24:00:00.000Z")
        }
      }
    ]
  }).count({}, function(err, count) {
    graphdata06.personenauto = count.toString();

    datamodel.find({
      $and: [{
          voertuigcategorie: "Bedrijfsauto"
        },
        {
          date: {
            $gte: new Date("2018-02-03T19:00:00.000Z"),
            $lt: new Date("2018-02-03T24:00:00.000Z")
          }
        }
      ]
    }).count({}, function(err, count) {
      graphdata06.bedrijfsauto = count.toString();

      datamodel.find({
        $and: [{
            voertuigcategorie: "Aanhangwagen"
          },
          {
            date: {
              $gte: new Date("2018-02-03T19:00:00.000Z"),
              $lt: new Date("2018-02-03T24:00:00.000Z")
            }
          }
        ]
      }).count({}, function(err, count) {
        graphdata06.aanhangwagen = count.toString();

        datamodel.find({
          $and: [{
              voertuigcategorie: "Motorfiets"
            },
            {
              date: {
                $gte: new Date("2018-02-03T19:00:00.000Z"),
                $lt: new Date("2018-02-03T24:00:00.000Z")
              }
            }
          ]
        }).count({}, function(err, count) {
          graphdata06.motorfiets = count.toString();

          datamodel.find({
            $and: [{
                voertuigcategorie: "Bromfiets"
              },
              {
                date: {
                  $gte: new Date("2018-02-03T19:00:00.000Z"),
                  $lt: new Date("2018-02-03T24:00:00.000Z")
                }
              }
            ]
          }).count({}, function(err, count) {
            graphdata06.bromfiets = count.toString();
            res.send(graphdata06);
          })
        })
      })
    })
  })

})

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

});

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
