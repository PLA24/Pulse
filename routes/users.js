var express = require('express');
var router = express.Router();

// Register
router.get('/register', function(req, res) {
  res.render('register');


});
//users
router.get('/login', function(req, res){
  res.render('login');
});



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
