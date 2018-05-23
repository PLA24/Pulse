var express = require('express');
var router = express.Router();

/* GET support page. */
router.get('/', function(req, res) {
    res.render('support', { title: 'Pulse', layout: 'layout_homepage'});
});

module.exports = router;
