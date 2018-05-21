var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('reset');
});

router.get('/:token', function(req, res) {

        res.render('reset');
});


module.exports = router;