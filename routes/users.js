var express = require('express');
var router = express.Router();


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
  //  req.checkBody('township').notEmpty().withMessage('township must be selected');
  //console.log(township);


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
        township: 'amsterdamwest'

      });

      User.createUser(newUser, function(err, user){
        if(err) throw err;
        console.log(user);
      });

      //req.flash('succes_msg', 'You are registered and can now login');

      res.redirect('/users/login');
  }


})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
