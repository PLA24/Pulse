var express = require('express');
var router = express.Router();

// Register
router.get('/register', function(req, res) {
  res.render('register');


});
//users
router.get('/login', function(req, res) {
  res.render('login');
});

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


//register users
router.post('/register', function(req, res) {
  var username = req.body.username;
  var emailadress = req.body.email;
  var password = req.body.password;
  var repassword = req.body.repassword;
  var township = req.body.Township;

  //validation
  //check('username').exists();
  //req.checkBody('emailadress', 'Emailadress is required').notEmpty();
  req.check('emailadress').isEmail().withMessage('must be an email');
  //req.checkBody('password', 'Password is required').notEmpty();
  //req.checkBody('repassword', 'Password verification is required').notEmpty();
  //req.checkBody('repassword', 'Passwords do not match').equals(req.body.password);
  //req.checkBody('township', 'Township is required').notEmpty();



  //var errors = req.validationErrors();

  // if (errors) {
  //   res.render('register', {
  //     errors:errors
  //   })
  //
  // } else {
  //   console.log('NO');
  //
  // }


})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
