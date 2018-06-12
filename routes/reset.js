var express = require('express');
var router = express.Router();

/* GET reset page. */
router.get('/', function (req, res) {
    res.render('reset');
});
// get token request for use with the reset process
router.get('/:token', function (req, res) {

    res.render('reset');
});


module.exports = router;
