var express = require('express');
var router = express.Router();

/* GET solution page. */
router.get('/', function (req, res) {
    res.render('solution', {title: 'Solution', layout: 'layout_homepage'});
});

module.exports = router;
