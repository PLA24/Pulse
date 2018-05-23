var express = require('express');
var router = express.Router();

/* GET forget page. */
router.get('/', function(req, res) {
    res.render('forgot', {currentUser: req.user.username});
});


module.exports = router;
