var express = require("express");
var router = express.Router();
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('settings', { UserName: req.user.username, currentUser: req.user.username, Township: req.user.township, Password: req.user.password, Email: req.user.email});
});

module.exports = router;
