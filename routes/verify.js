var express = require('express');
var router = express.Router();

/* GET forget page. */
router.get('/', function (req, res) {
    res.render('verify');
});
router.get('/:confirmToken', function (req, res) {

    res.render('reset');
});


module.exports = router;
