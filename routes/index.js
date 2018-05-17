var express = require('express');

var router = express.Router();
/* GET home page. */
router.get('/', ensureAuthenticated,  function(req, res) {
  res.render('index', {title: "Pulse", currentUser: req.user.username});
});

function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()){
      return next();
  } else {
      req.flash('error_msg', 'You are not logged in');
      res.redirect('/homepage');
  }
}

router.get('/mapdata', function(req, res){
  testnaam = "verbeterd!";
  console.log(testnaam);
});

module.exports = router;
