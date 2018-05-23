var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('forgot', {currentUser: req.user.username});
});


module.exports = router;