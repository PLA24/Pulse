var express = require('express');
var router = express.Router();

/* GET pricing page. */
router.get('/', function(req, res) {
    res.render('pricing', { title: 'Pulse', layout: 'layout_homepage'});
});

module.exports = router;
