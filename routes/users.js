var express = require('express');
var router = express.Router();
var flash = require('express-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var User = require('../models/user');

const {
  check,
  validationResult
} = require('express-validator/check');
const {
  matchedData,
  sanitize
} = require('express-validator/filter');


// Register
router.get('/register', function(req, res) {
  res.render('register', {
    layout: 'layoutempty'
  });


});
//users
router.get('/login', function(req, res) {
  res.render('login', {
    layout: 'layoutempty'
  });
});




//register users
router.post('/register', function(req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var repassword = req.body.repassword;
  var township = req.body.township;
  console.log(username);
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
    console.log("foutmelding");
    res.render('register', {
      errors: errors
    })

  } else {
    console.log('geen foutmelding');
      var newUser = new User({
        username: username,
        email: email,
        password: password,
        township: township

      });

      User.createUser(newUser, function(err, user){
        if(err) throw err;
        console.log(user);
      });

      req.flash('succes_msg', 'You are registered and can now login');

      res.redirect('/users/login')
  }


});

passport.use(new LocalStrategy(
  function(username, password, done) {
  User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
        return done(null, false, {message: 'Unknown User'})
    }

    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) throw err;
      if(isMatch){
        return done(null, user);
      } else{
        return done(null, false, {message: 'Invalid password'});
      }
    });
  });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


router.post('/login',
  passport.authenticate('local', {succesRedirect: '/', failureRedirect: '/users/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res,){
    req.logout();

    req.flash('succes_msg', 'you are logged out');

    res.redirect('/homepage')
});
//
//
// forgot password
router.get("/", function(req, res) {
    res.render('forgot');
});

router.post('/forgot', function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            user.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
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
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                console.log('mail sent');
                req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
});

router.get('/reset/:token', function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
        }
         res.render('reset');
    });
});

router.post('/reset/:token', function(req, res) {
    async.waterfall([
        function(done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if(req.body.password === req.body.confirm) {
                    user.setPassword(req.body.password, function(err) {
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(function(err) {
                            req.logIn(user, function(err) {
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
        function(user, done) {
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
            smtpTransport.sendMail(mailOptions, function(err) {
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');

        }
    );

});
//
//
//


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});





module.exports = router;
