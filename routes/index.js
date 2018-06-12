var express = require('express');
var mongoose = require('mongoose');
var datamodel = require('../models/map_data');
var datamodel2 = require('../models/map_data_pi');
var router = express.Router();

/* GET index page. */
router.get('/', ensureAuthenticated, function (req, res) {
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

// current dates for the queries
var today = new Date();
var todayplus = new Date();
var lastweek = new Date();
var lastmonth = new Date();
todayplus.setDate(todayplus.getDate() + 1);
lastweek.setDate(lastweek.getDate() - 7);
lastmonth.setDate(lastmonth.getDate() - 30);

var curday = today.getDate();
var curmonth = today.getMonth() + 1;
var curyear = today.getFullYear();

var curday2 = todayplus.getDate();
var curmonth2 = todayplus.getMonth() + 1;
var curyear2 = todayplus.getFullYear();

var lastweekday = lastweek.getDate();
var lastweekmonth = lastweek.getMonth() + 1;
var lastweekyear = lastweek.getFullYear();

var lastmonthday = lastmonth.getDate();
var lastmonthmonth = lastmonth.getMonth() + 1;
var lastmonthyear = lastmonth.getFullYear();

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

if (lastweekday < 10) {
    lastweekday = '0' + lastweekday
}
if (lastweekmonth < 10) {
    lastweekmonth = '0' + lastweekmonth
}

if (lastmonthday < 10) {
    lastmonthday = '0' + lastmonthday
}
if (lastmonthmonth < 10) {
    lastmonthmonth = '0' + lastmonthmonth
}
// set the proper format
today = curyear + '-' + curmonth + '-' + curday;
todayplus = curyear2 + '-' + curmonth2 + '-' + curday2;
lastweek = lastweekyear + '-' + lastweekmonth + '-' + lastweekday;
lastmonth = lastmonthyear + '-' + lastmonthmonth + '-' + lastmonthday;
// print dates
console.log(today);
console.log(todayplus);
console.log(lastweek);
console.log(lastmonth);

//get request for graphdata from database
router.get('/graphdata01', function (req, res) {
    var graphdata01 = {};
    datamodel2.find({
        $and: [{
            vehicletype: "Persoonsauto"
        },
            {
                timeSpotted: {
                    $gte: new Date(today + "T00:00:00.000"),
                    $lt: new Date(today + "T04:00:00.000")
                }
            }
        ]
    }).count({}, function (err, count) {
        graphdata01.personenauto = count.toString();

        datamodel2.find({
            $and: [{
                vehicletype: "Bedrijfsauto"
            },
                {
                    timeSpotted: {
                        $gte: new Date(today + "T00:00:00.000"),
                        $lt: new Date(today + "T04:00:00.000")
                    }
                }
            ]
        }).count({}, function (err, count) {
            graphdata01.bedrijfsauto = count.toString();

            datamodel2.find({
                $and: [{
                    vehicletype: "Aanhangwagen"
                },
                    {
                        timeSpotted: {
                            $gte: new Date(today + "T00:00:00.000"),
                            $lt: new Date(today + "T04:00:00.000")
                        }
                    }
                ]
            }).count({}, function (err, count) {
                graphdata01.aanhangwagen = count.toString();

                datamodel2.find({
                    $and: [{
                        vehicletype: "Motorfiets"
                    },
                        {
                            timeSpotted: {
                                $gte: new Date(today + "T00:00:00.000"),
                                $lt: new Date(today + "T04:00:00.000")
                            }
                        }
                    ]
                }).count({}, function (err, count) {
                    graphdata01.motorfiets = count.toString();

                    datamodel2.find({
                        $and: [{
                            vehicletype: "Bromfiets"
                        },
                            {
                                timeSpotted: {
                                    $gte: new Date(today + "T00:00:00.000"),
                                    $lt: new Date(today + "T04:00:00.000")
                                }
                            }
                        ]
                    }).count({}, function (err, count) {
                        graphdata01.bromfiets = count.toString();
                        res.send(graphdata01);
                    })
                })
            })
        })
    })

})

router.get('/graphdata02', function (req, res) {
    var graphdata02 = {};
    datamodel2.find({
        $and: [{
            vehicletype: "Persoonsauto"
        },
            {
                timeSpotted: {
                    $gte: new Date(today + "T04:00:00.000"),
                    $lt: new Date(today + "T08:00:00.000")
                }
            }
        ]
    }).count({}, function (err, count) {
        graphdata02.personenauto = count.toString();

        datamodel2.find({
            $and: [{
                vehicletype: "Bedrijfsauto"
            },
                {
                    timeSpotted: {
                        $gte: new Date(today + "T04:00:00.000"),
                        $lt: new Date(today + "T08:00:00.000")
                    }
                }
            ]
        }).count({}, function (err, count) {
            graphdata02.bedrijfsauto = count.toString();

            datamodel2.find({
                $and: [{
                    vehicletype: "Aanhangwagen"
                },
                    {
                        timeSpotted: {
                            $gte: new Date(today + "T04:00:00.000"),
                            $lt: new Date(today + "T08:00:00.000")
                        }
                    }
                ]
            }).count({}, function (err, count) {
                graphdata02.aanhangwagen = count.toString();

                datamodel2.find({
                    $and: [{
                        vehicletype: "Motorfiets"
                    },
                        {
                            timeSpotted: {
                                $gte: new Date(today + "T04:00:00.000"),
                                $lt: new Date(today + "T08:00:00.000")
                            }
                        }
                    ]
                }).count({}, function (err, count) {
                    graphdata02.motorfiets = count.toString();

                    datamodel2.find({
                        $and: [{
                            vehicletype: "Bromfiets"
                        },
                            {
                                timeSpotted: {
                                    $gte: new Date(today + "T04:00:00.000"),
                                    $lt: new Date(today + "T08:00:00.000")
                                }
                            }
                        ]
                    }).count({}, function (err, count) {
                        graphdata02.bromfiets = count.toString();
                        res.send(graphdata02);
                    })
                })
            })
        })
    })

})

router.get('/graphdata03', function (req, res) {
    var graphdata03 = {};
    datamodel2.find({
        $and: [{
            vehicletype: "Persoonsauto"
        },
            {
                timeSpotted: {
                    $gte: new Date(today + "T08:00:00.000"),
                    $lt: new Date(today + "T12:00:00.000")
                }
            }
        ]
    }).count({}, function (err, count) {
        graphdata03.personenauto = count.toString();

        datamodel2.find({
            $and: [{
                vehicletype: "Bedrijfsauto"
            },
                {
                    timeSpotted: {
                        $gte: new Date(today + "T08:00:00.000"),
                        $lt: new Date(today + "T12:00:00.000")
                    }
                }
            ]
        }).count({}, function (err, count) {
            graphdata03.bedrijfsauto = count.toString();

            datamodel2.find({
                $and: [{
                    vehicletype: "Aanhangwagen"
                },
                    {
                        timeSpotted: {
                            $gte: new Date(today + "T08:00:00.000"),
                            $lt: new Date(today + "T12:00:00.000")
                        }
                    }
                ]
            }).count({}, function (err, count) {
                graphdata03.aanhangwagen = count.toString();

                datamodel2.find({
                    $and: [{
                        vehicletype: "Motorfiets"
                    },
                        {
                            timeSpotted: {
                                $gte: new Date(today + "T08:00:00.000"),
                                $lt: new Date(today + "T12:00:00.000")
                            }
                        }
                    ]
                }).count({}, function (err, count) {
                    graphdata03.motorfiets = count.toString();

                    datamodel2.find({
                        $and: [{
                            vehicletype: "Bromfiets"
                        },
                            {
                                timeSpotted: {
                                    $gte: new Date(today + "T08:00:00.000"),
                                    $lt: new Date(today + "T12:00:00.000")
                                }
                            }
                        ]
                    }).count({}, function (err, count) {
                        graphdata03.bromfiets = count.toString();
                        res.send(graphdata03);
                    })
                })
            })
        })
    })

})

router.get('/graphdata04', function (req, res) {
    var graphdata04 = {};
    datamodel2.find({
        $and: [{
            vehicletype: "Persoonsauto"
        },
            {
                vehicletype: {
                    $gte: new Date(today + "T12:00:00.000"),
                    $lt: new Date(today + "T16:00:00.000")
                }
            }
        ]
    }).count({}, function (err, count) {
        graphdata04.personenauto = count.toString();

        datamodel2.find({
            $and: [{
                vehicletype: "Bedrijfsauto"
            },
                {
                    timeSpotted: {
                        $gte: new Date(today + "T12:00:00.000"),
                        $lt: new Date(today + "T16:00:00.000")
                    }
                }
            ]
        }).count({}, function (err, count) {
            graphdata04.bedrijfsauto = count.toString();

            datamodel2.find({
                $and: [{
                    vehicletype: "Aanhangwagen"
                },
                    {
                        timeSpotted: {
                            $gte: new Date(today + "T12:00:00.000"),
                            $lt: new Date(today + "T16:00:00.000")
                        }
                    }
                ]
            }).count({}, function (err, count) {
                graphdata04.aanhangwagen = count.toString();

                datamodel2.find({
                    $and: [{
                        vehicletype: "Motorfiets"
                    },
                        {
                            timeSpotted: {
                                $gte: new Date(today + "T12:00:00.000"),
                                $lt: new Date(today + "T16:00:00.000")
                            }
                        }
                    ]
                }).count({}, function (err, count) {
                    graphdata04.motorfiets = count.toString();

                    datamodel2.find({
                        $and: [{
                            vehicletype: "Bromfiets"
                        },
                            {
                                timeSpotted: {
                                    $gte: new Date(today + "T12:00:00.000"),
                                    $lt: new Date(today + "T16:00:00.000")
                                }
                            }
                        ]
                    }).count({}, function (err, count) {
                        graphdata04.bromfiets = count.toString();
                        res.send(graphdata04);
                    })
                })
            })
        })
    })

})

router.get('/graphdata05', function (req, res) {
    var graphdata05 = {};
    datamodel2.find({
        $and: [{
            vehicletype: "Persoonsauto"
        },
            {
                timeSpotted: {
                    $gte: new Date(today + "T16:00:00.000"),
                    $lt: new Date(today + "T20:00:00.000")
                }
            }
        ]
    }).count({}, function (err, count) {
        graphdata05.personenauto = count.toString();

        datamodel2.find({
            $and: [{
                vehicletype: "Bedrijfsauto"
            },
                {
                    timeSpotted: {
                        $gte: new Date(today + "T16:00:00.000"),
                        $lt: new Date(today + "T20:00:00.000")
                    }
                }
            ]
        }).count({}, function (err, count) {
            graphdata05.bedrijfsauto = count.toString();

            datamodel2.find({
                $and: [{
                    vehicletype: "Aanhangwagen"
                },
                    {
                        timeSpotted: {
                            $gte: new Date(today + "T16:00:00.000"),
                            $lt: new Date(today + "T20:00:00.000")
                        }
                    }
                ]
            }).count({}, function (err, count) {
                graphdata05.aanhangwagen = count.toString();

                datamodel2.find({
                    $and: [{
                        vehicletype: "Motorfiets"
                    },
                        {
                            timeSpotted: {
                                $gte: new Date(today + "T16:00:00.000"),
                                $lt: new Date(today + "T20:00:00.000")
                            }
                        }
                    ]
                }).count({}, function (err, count) {
                    graphdata05.motorfiets = count.toString();

                    datamodel2.find({
                        $and: [{
                            vehicletype: "Bromfiets"
                        },
                            {
                                timeSpotted: {
                                    $gte: new Date(today + "T16:00:00.000"),
                                    $lt: new Date(today + "T20:00:00.000")
                                }
                            }
                        ]
                    }).count({}, function (err, count) {
                        graphdata05.bromfiets = count.toString();
                        res.send(graphdata05);
                    })
                })
            })
        })
    })

})

router.get('/graphdata06', function (req, res) {
    var graphdata06 = {};
    datamodel2.find({
        $and: [{
            vehicletype: "Persoonsauto"
        },
            {
                timeSpotted: {
                    $gte: new Date(today + "T20:00:00.000"),
                    $lt: new Date(today + "T24:00:00.000")
                }
            }
        ]
    }).count({}, function (err, count) {
        graphdata06.personenauto = count.toString();

        datamodel2.find({
            $and: [{
                vehicletype: "Bedrijfsauto"
            },
                {
                    timeSpotted: {
                        $gte: new Date(today + "T20:00:00.000"),
                        $lt: new Date(today + "T24:00:00.000")
                    }
                }
            ]
        }).count({}, function (err, count) {
            graphdata06.bedrijfsauto = count.toString();

            datamodel2.find({
                $and: [{
                    vehicletype: "Aanhangwagen"
                },
                    {
                        timeSpotted: {
                            $gte: new Date(today + "T20:00:00.000"),
                            $lt: new Date(today + "T24:00:00.000")
                        }
                    }
                ]
            }).count({}, function (err, count) {
                graphdata06.aanhangwagen = count.toString();

                datamodel2.find({
                    $and: [{
                        vehicletype: "Motorfiets"
                    },
                        {
                            timeSpotted: {
                                $gte: new Date(today + "T20:00:00.000"),
                                $lt: new Date(today + "T24:00:00.000")
                            }
                        }
                    ]
                }).count({}, function (err, count) {
                    graphdata06.motorfiets = count.toString();

                    datamodel2.find({
                        $and: [{
                            vehicletype: "Bromfiets"
                        },
                            {
                                timeSpotted: {
                                    $gte: new Date(today + "T20:00:00.000"),
                                    $lt: new Date(today + "T24:00:00.000")
                                }
                            }
                        ]
                    }).count({}, function (err, count) {
                        graphdata06.bromfiets = count.toString();
                        res.send(graphdata06);
                    })
                })
            })
        })
    })

})


//get request for livecount bar from database
router.get('/livecountday', function (req, res) {
    var livecounter = {};
    datamodel2.find({
        $and: [{
            vehicletype: "Persoonsauto"
        },
            {
                timeSpotted: {
                    $gte: new Date(today),
                    $lt: new Date(todayplus)
                }
            }
        ]
    }).count({}, function (err, count) {
        livecounter.personenauto = count.toString();

        datamodel2.find({
            $and: [{
                vehicletype: "Bedrijfsauto"
            },
                {
                    timeSpotted: {
                        $gte: new Date(today),
                        $lt: new Date(todayplus)
                    }
                }
            ]
        }).count({}, function (err, count) {
            livecounter.bedrijfsauto = count.toString();

            datamodel2.find({
                $and: [{
                    vehicletype: "Aanhangwagen"
                },
                    {
                        date: {
                            $gte: new Date(today),
                            $lt: new Date(todayplus)
                        }
                    }
                ]
            }).count({}, function (err, count) {
                livecounter.aanhangwagen = count.toString();

                datamodel2.find({
                    $and: [{
                        vehicletype: "Motorfiets"
                    },
                        {
                            timeSpotted: {
                                $gte: new Date(today),
                                $lt: new Date(todayplus)
                            }
                        }
                    ]
                }).count({}, function (err, count) {
                    livecounter.motorfiets = count.toString();

                    datamodel2.find({
                        $and: [{
                            vehicletype: "Bromfiets"
                        },
                            {
                                timeSpotted: {
                                    $gte: new Date(today),
                                    $lt: new Date(todayplus)
                                }
                            }
                        ]
                    }).count({}, function (err, count) {
                        livecounter.bromfiets = count.toString();
                        res.send(livecounter);
                    })
                })
            })
        })
    })

})

router.get('/livecountweek', function (req, res) {
    var livecounter = {};
    datamodel2.find({
        $and: [{
            vehicletype: "Persoonsauto"
        },
            {
                timeSpotted: {
                    $gte: new Date(lastweek),
                    $lt: new Date(todayplus)
                }
            }
        ]
    }).count({}, function (err, count) {
        livecounter.personenauto = count.toString();

        datamodel2.find({
            $and: [{
                vehicletype: "Bedrijfsauto"
            },
                {
                    timeSpotted: {
                        $gte: new Date(lastweek),
                        $lt: new Date(todayplus)
                    }
                }
            ]
        }).count({}, function (err, count) {
            livecounter.bedrijfsauto = count.toString();

            datamodel2.find({
                $and: [{
                    vehicletype: "Aanhangwagen"
                },
                    {
                        timeSpotted: {
                            $gte: new Date(lastweek),
                            $lt: new Date(todayplus)
                        }
                    }
                ]
            }).count({}, function (err, count) {
                livecounter.aanhangwagen = count.toString();

                datamodel2.find({
                    $and: [{
                        vehicletype: "Motorfiets"
                    },
                        {
                            timeSpotted: {
                                $gte: new Date(lastweek),
                                $lt: new Date(todayplus)
                            }
                        }
                    ]
                }).count({}, function (err, count) {
                    livecounter.motorfiets = count.toString();

                    datamodel2.find({
                        $and: [{
                            vehicletype: "Bromfiets"
                        },
                            {
                                timeSpotted: {
                                    $gte: new Date(lastweek),
                                    $lt: new Date(todayplus)
                                }
                            }
                        ]
                    }).count({}, function (err, count) {
                        livecounter.bromfiets = count.toString();
                        res.send(livecounter);
                    })
                })
            })
        })
    })

});

router.get('/livecountmonth', function (req, res) {
    var livecounter = {};
    datamodel2.find({
        $and: [{
            vehicletype: "Persoonsauto"
        },
            {
                timeSpotted: {
                    $gte: new Date(lastmonth),
                    $lt: new Date(todayplus)
                }
            }
        ]
    }).count({}, function (err, count) {
        livecounter.personenauto = count.toString();

        datamodel2.find({
            $and: [{
                vehicletype: "Bedrijfsauto"
            },
                {
                    timeSpotted: {
                        $gte: new Date(lastmonth),
                        $lt: new Date(todayplus)
                    }
                }
            ]
        }).count({}, function (err, count) {
            livecounter.bedrijfsauto = count.toString();

            datamodel2.find({
                $and: [{
                    vehicletype: "Aanhangwagen"
                },
                    {
                        timeSpotted: {
                            $gte: new Date(lastmonth),
                            $lt: new Date(todayplus)
                        }
                    }
                ]
            }).count({}, function (err, count) {
                livecounter.aanhangwagen = count.toString();

                datamodel2.find({
                    $and: [{
                        vehicletype: "Motorfiets"
                    },
                        {
                            timeSpotted: {
                                $gte: new Date(lastmonth),
                                $lt: new Date(todayplus)
                            }
                        }
                    ]
                }).count({}, function (err, count) {
                    livecounter.motorfiets = count.toString();

                    datamodel2.find({
                        $and: [{
                            vehicletype: "Bromfiets"
                        },
                            {
                                timeSpotted: {
                                    $gte: new Date(lastmonth),
                                    $lt: new Date(todayplus)
                                }
                            }
                        ]
                    }).count({}, function (err, count) {
                        livecounter.bromfiets = count.toString();
                        res.send(livecounter);
                    })
                })
            })
        })
    })

});

router.get('/fueldata', function (req, res) {
    var fuel = {};
    datamodel2.find({
        $and: [{
            brand: "VOLKSWAGEN"
        },
            {
                timeSpotted: {
                    $gte: new Date(today),
                    $lt: new Date(todayplus)
                }
            }
        ]
    }).count({}, function (err, count) {
        console.log("Number of elektric cars:", count);
        fuel.elektrisch = count.toString();

        datamodel2.find({
            $and: [{
                brand: "RENAULT"
            },
                {
                    timeSpotted: {
                        $gte: new Date(today),
                        $lt: new Date(todayplus)
                    }
                }
            ]
        }).count({}, function (err, count) {
            console.log("Number of gasoline cars:", count);
            fuel.benzine = count.toString();
            //res.send(fuel);

            datamodel2.find({
                $and: [{
                    brand: "OPEL"
                },
                    {
                        timeSpotted: {
                            $gte: new Date(today),
                            $lt: new Date(todayplus)
                        }
                    }
                ]
            }).count({}, function (err, count) {
                console.log("Number of diesel cars:", count);
                fuel.diesel = count.toString();

                datamodel2.find({
                    $and: [{
                        brand: "PEUGEOT"
                    },
                        {
                            timeSpotted: {
                                $gte: new Date(today),
                                $lt: new Date(todayplus)
                            }
                        }
                    ]
                }).count({}, function (err, count) {
                    console.log("Number of hybrid cars:", count);
                    fuel.hybrid = count.toString();

                    datamodel2.find({
                        $and: [{
                            brand: "AUDI"
                        },
                            {
                                timeSpotted: {
                                    $gte: new Date(today),
                                    $lt: new Date(todayplus)
                                }
                            }
                        ]
                    }).count({}, function (err, count) {
                        console.log("Number of audi cars:", count);
                        fuel.audi = count.toString();
                        datamodel2.find({
                            $and: [{
                                brand: "FERRARI"
                            },
                                {
                                    timeSpotted: {
                                        $gte: new Date(today),
                                        $lt: new Date(todayplus)
                                    }
                                }
                            ]
                        }).count({}, function (err, count) {
                            console.log("Number of ferrari cars:", count);
                            fuel.ferrari = count.toString();

                            datamodel2.find({
                                $and: [{
                                    brand: "BMW"
                                },
                                    {
                                        timeSpotted: {
                                            $gte: new Date(today),
                                            $lt: new Date(todayplus)
                                        }
                                    }
                                ]
                            }).count({}, function (err, count) {
                                console.log("Number of BMW cars:", count);
                                fuel.bmw = count.toString();

                                datamodel2.find({
                                    $and: [{
                                        brand: "CITROEN"
                                    },
                                        {
                                            timeSpotted: {
                                                $gte: new Date(today),
                                                $lt: new Date(todayplus)
                                            }
                                        }
                                    ]
                                }).count({}, function (err, count) {
                                    console.log("Number of cintroen cars:", count);
                                    fuel.citroen = count.toString();


                                    res.send(fuel);

                                });

//res.send(fuel);

                            });

                            //res.send(fuel);

                        });


                        //res.send(fuel);

                    });

                    //res.send(fuel);

                });
            });
        });
    });
});

router.get('/economylabeldata', function (req, res) {
    var economy = {};
    datamodel2.find({
        $and: [{
            economylabel: "A"
        },
            {
                timeSpotted: {
                    $gte: new Date(today),
                    $lt: new Date(todayplus)
                }
            }
        ]
    }).count({}, function (err, count) {
        console.log("Number of elektric cars:", count);
        economy.labelA = count.toString();

        datamodel2.find({
            $and: [{
                economylabel: "B"
            },
                {
                    timeSpotted: {
                        $gte: new Date(today),
                        $lt: new Date(todayplus)
                    }
                }
            ]
        }).count({}, function (err, count) {
            console.log("Number of gasoline cars:", count);
            economy.labelB = count.toString();
            //res.send(fuel);

            datamodel2.find({
                $and: [{
                    economylabel: "C"
                },
                    {
                        timeSpotted: {
                            $gte: new Date(today),
                            $lt: new Date(todayplus)
                        }
                    }
                ]
            }).count({}, function (err, count) {
                console.log("Number of diesel cars:", count);
                economy.labelC = count.toString();

                datamodel2.find({
                    $and: [{
                        economylabel: "D"
                    },
                        {
                            timeSpotted: {
                                $gte: new Date(today),
                                $lt: new Date(todayplus)
                            }
                        }
                    ]
                }).count({}, function (err, count) {
                    console.log("Number of diesel cars:", count);
                    economy.labelD = count.toString();

                    datamodel2.find({
                        $and: [{
                            economylabel: "E"
                        },
                            {
                                timeSpotted: {
                                    $gte: new Date(today),
                                    $lt: new Date(todayplus)
                                }
                            }
                        ]
                    }).count({}, function (err, count) {
                        console.log("Number of diesel cars:", count);
                        economy.labelE = count.toString();

                        datamodel2.find({
                            $and: [{
                                economylabel: "F"
                            },
                                {
                                    timeSpotted: {
                                        $gte: new Date(today),
                                        $lt: new Date(todayplus)
                                    }
                                }
                            ]
                        }).count({}, function (err, count) {
                            console.log("Number of diesel cars:", count);
                            economy.labelF = count.toString();

                            datamodel2.find({
                                $and: [{
                                    economylabel: "G"
                                },
                                    {
                                        timeSpotted: {
                                            $gte: new Date(today),
                                            $lt: new Date(todayplus)
                                        }
                                    }
                                ]
                            }).count({}, function (err, count) {
                                console.log("Number of hybrid cars:", count);
                                economy.labelG = count.toString();
                                res.send(economy);

                            });
                        });
                    });
                });
            });
        });
    });
});

module.exports = router;
