var express = require('express');
var router = express.Router();
var flash = require('express-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var User = require('../models/user');
var randomstring = require("randomstring");

const {
    check,
    validationResult
} = require('express-validator/check');
const {
    matchedData,
    sanitize
} = require('express-validator/filter');


// Register
router.get('/register', function (req, res) {
    res.render('register', {
        layout: 'layoutempty'
    });
});
//register users
router.post('/register', function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var repassword = req.body.repassword;
    var township = req.body.township;
    var activeAccount = false;
    var confirmToken = randomstring.generate();

    //validation
    req.checkBody('username').notEmpty().withMessage('username is required');
    req.checkBody('email').notEmpty().withMessage('email is required');
    req.checkBody('email').isEmail().withMessage('email is not valid');
    req.checkBody('password').notEmpty().withMessage('password is required');
    req.checkBody('repassword').notEmpty().withMessage('password confirmation is required');
    req.checkBody('repassword', 'Passwords do not match').equals(req.body.password);
    req.checkBody('township').notEmpty().withMessage('township must be selected');

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        })

    } else {
        var newUser = new User({
            username: username,
            email: email,
            password: password,
            township: township,
            confirmEmailToken: confirmToken,
            activeUserAccount: activeAccount
        });
        User.createUser(newUser, function (err, user) {
            if (err) throw err;
            done(confirmToken)
            console.log(user);
        });

        function done(confirmToken, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'pulsehva@gmail.com',
                    pass: 'Pulse1234'
                }
            });
            var mailOptions = {
                to: req.body.email,
                from: 'pulsehva@gmail.com',
                subject: 'confirm your account',
                text: 'You are receiving this because you (or someone else) has requested to start a Pulse account.\n\n' +
                'your final step is to confirm your account so that we now it is you!\n\n' +
                'Please click on the following link, or paste it into your browser\n\n' +
                'http://' + req.headers.host + '/users/verify/' + confirmToken + '\n\n' +
                'next paste the following token into the required field\n' +
                'your confirmation token:' + confirmToken + '\n\n' +
                'If you did not request this, please ignore this email\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('success', 'An e-mail has been sent to ' + req.body.email + ' with further instructions.');
                done(err, 'done');
            });
        }

        req.flash('succes_msg', 'You are registered and can now login');

    }
    res.redirect('/users/login')
});

// check if the password is correct
passport.use(new LocalStrategy(
    function (username, password, done) {

        User.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                console.log("geen user");
                return done(null, false, {message: 'Unknown User'})
            }
            if (user.activeUserAccount === false) {
                return done(null, false, {message: 'test'});
            }
            if (user.activeUserAccount === true) {
                User.comparePassword(password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (!isMatch) {
                        console.log("tot hier 5");
                        return done(null, false, {message: 'invalid password'});
                    }
                    if (isMatch) {
                        return done(null, user);
                    }
                })
            }
        })
    }));


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
router.get('/verify/:confirmToken', function (req, res) {
    User.findOne({confirmEmailToken: req.params.confirmToken}, function (err, user) {
        if (!user) {
            req.flash('error', 'confirm token is not valid');
            return res.redirect('/homepage');
        }
        res.render('verify');
    });
});
router.post('/verify/:confirmToken', function (req, res) {
    async.waterfall([
            function (done) {
                User.findOne({confirmEmailToken: req.params.confirmToken}, function (err, user) {

                    if (!user) {
                        req.flash('error', 'Password reset token is invalid or has expired.');
                        return res.redirect('back');
                    }
                    if (req.body.confirmToken.trim() === user.confirmEmailToken) {
                        User.setConfirmStatus(true, user, function (err) {

                            user.confirmEmailToken = undefined;

                            user.save(function (err) {
                                req.logIn(user, function (err) {
                                    done(err, user);
                                });
                            });
                        })
                    } else {
                        req.flash("error", "token werkt niet.");
                        return res.redirect('back');

                    }

                });
            },
            function (user, done) {
                var smtpTransport = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'pulsehva@gmail.com',
                        pass: 'Pulse1234'
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'pulsehva@gmail.com',
                    subject: 'Your account is confirmed',
                    text: 'Hello,\n\n' +
                    'This is a confirmation that your Pulse account has been activated!! ' + '\n' +
                    'welcome!!' + '\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    req.flash('success', 'Success! Your account has been activated.');
                    done(err);
                });
            }
        ], function (err) {
            if (err) return next(err);
            res.redirect('/login');

        }
    );
});
//users
router.get('/login', function (req, res) {
    res.render('login', {
        layout: 'layoutempty'
    });
});

// login request
router.post('/login',
    passport.authenticate('local', {succesRedirect: '/', failureRedirect: '/users/login', failureFlash: true}),
    function (req, res) {

        res.redirect('/');
    });
//logout
router.get('/logout', function (req, res,) {
    req.logout();

    req.flash('succes_msg', 'you are logged out');

    res.redirect('/homepage')
});
// forgot password
router.get("/", function (req, res) {
    res.render('forgot');
});
//forgot password
router.post('/forgot', function (req, res, next) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({email: req.body.email}, function (err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'pulsehva@gmail.com',
                    pass: 'Pulse1234'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'pulsehva@gmail.com',
                subject: ' Pulse Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
});
// reset password
router.get('/reset/:token', function (req, res) {
    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, function (err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
        }
        res.render('reset');
    });
});
//reset password
router.post('/reset/:token', function (req, res) {
    async.waterfall([
            function (done) {
                User.findOne({
                    resetPasswordToken: req.params.token,
                    resetPasswordExpires: {$gt: Date.now()}
                }, function (err, user) {
                    if (!user) {
                        req.flash('error', 'Password reset token is invalid or has expired.');
                        return res.redirect('back');
                    }
                    if (req.body.password === req.body.confirm) {
                        User.setPassword(req.body.password, user, function (err) {
                            user.resetPasswordToken = undefined;
                            user.resetPasswordExpires = undefined;

                            user.save(function (err) {
                                req.logIn(user, function (err) {
                                    done(err, user);
                                });
                            });
                        })
                    } else {
                        req.flash("error", "Passwords do not match.");
                        return res.redirect('back');
                    }
                });
            },
            function (user, done) {
                var smtpTransport = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'pulsehva@gmail.com',
                        pass: 'Pulse1234'
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'pulsehva@gmail.com',
                    subject: 'Your password has been changed',
                    text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    req.flash('success', 'Success! Your password has been changed.');
                    done(err);
                });
            }
        ], function (err) {
            if (err) return next(err);
            res.redirect('/homepage');

        }
    );

});
// email reset settings screen
router.post('/settings/email', function (req, res) {
    // making user id
    var _id = req.user._id;
    async.waterfall([
            function (done) {
                //user id use
                User.findOne({_id: req.user._id}, function (err, user) {
                    if (!user) {
                        req.flash('error', 'how were you able to get here??');
                        return res.redirect('back');
                    }
                    if (!req.body.email) {
                        req.flash('error', 'no data');
                        return res.redirect('back');
                    }
                    // check if value given is not the same as it was
                    if (req.body.email !== req.user.email) {
                        // sets email found on User.js
                        User.setEmail(req.body.email, user, function (err) {
                            user.save(function (err) {
                                req.logIn(user, function (err) {
                                    done(err, user);
                                });
                            });
                        })
                    } else {
                        req.flash("error", "same email.");
                        return res.redirect('back');
                    }
                });
            },

        ], function (err) {
            if (err) return next(err);
            res.redirect('/settings');

        }
    );

});
// township reset settings screen
router.post('/settings/township', function (req, res) {
    // making user id
    var _id = req.user._id;
    async.waterfall([
            function (done) {
                //user id use
                User.findOne({_id: req.user._id}, function (err, user) {
                    if (!user) {
                        req.flash('error', 'how were you able to get here??');
                        return res.redirect('back');
                    }
                    if (!req.body.township) {
                        req.flash('error', 'no data');
                        return res.redirect('back');
                    }
                    // check if value given is not the same as it was
                    if (req.body.township !== req.user.township) {
                        // sets township found on User.js
                        User.setTownship(req.body.township, user, function (err) {
                            user.save(function (err) {
                                req.logIn(user, function (err) {
                                    done(err, user);
                                });
                            });
                        })
                    } else {
                        req.flash("error", "same township.");
                        return res.redirect('back');
                    }
                });
            },

        ], function (err) {
            if (err) return next(err);
            res.redirect('/settings');

        }
    );

});
// username reset settings screen
router.post('/settings/username', function (req, res) {
    // making user id
    var _id = req.user._id;
    async.waterfall([
            function (done) {
                //user id use
                User.findOne({_id: req.user._id}, function (err, user) {
                    if (!user) {
                        req.flash('error', 'how were you able to get here??');
                        return res.redirect('back');
                    }
                    if (!req.body.username) {
                        req.flash('error', 'no data');
                        return res.redirect('back');
                    }
                    // check if value given is not the same as it was
                    if (req.body.username !== req.user.username) {
                        // sets username can be found on user.js
                        User.setUsername(req.body.username, user, function (err) {
                            user.save(function (err) {
                                req.logIn(user, function (err) {
                                    done(err, user);
                                });
                            });
                        })
                    } else {
                        req.flash("error", "same username.");
                        return res.redirect('back');
                    }
                });
            },

        ], function (err) {
            if (err) return next(err);
            res.redirect('/settings');

        }
    );

});
// password reset settings screen
router.post('/settings/password', function (req, res) {
    // making user id
    var _id = req.user._id;
    async.waterfall([
            function (done) {
                //user id use
                User.findOne({_id: req.user._id}, function (err, user) {
                    if (!user) {
                        req.flash('error', 'how were you able to get here??');
                        return res.redirect('back');
                    }
                    if (!req.body.password) {
                        req.flash('error', 'no data');
                        return res.redirect('back');
                    }
                    // check if value given is not the same as it was
                    if (req.body.password !== req.user.password) {
                        User.setPassword(req.body.password, user, function (err) {
                            // sets password can be found on user.js
                            user.save(function (err) {
                                req.logIn(user, function (err) {
                                    done(err, user);
                                });
                            });
                        })
                    } else {
                        req.flash("error", "same password.");
                        return res.redirect('back');
                    }
                });
            },

        ], function (err) {
            if (err) return next(err);
            res.redirect('/settings');

        }
    );

});


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
