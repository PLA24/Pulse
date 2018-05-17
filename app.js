var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSesion = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var passport = require('passport');
var index = require('./routes/index');
var settings = require('./routes/settings');
var users = require('./routes/users');
var map = require('./routes/map');
var solution = require('./routes/solution');
var learn = require('./routes/learn');
var about = require('./routes/about');
var support = require('./routes/support');
var pricing = require('./routes/pricing');
var login = require('./routes/login');
var register = require('./routes/register');
var homepage = require('./routes/homepage');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(expressSesion({secret: 'max', saveUnitilialized: false, resave: false}));

//session
app.use(session({
  secret: 'secret',
  saveUnitilialized: true,
  resave: true

}));

app.use(passport.initialize());
app.use(passport.session());


//connect flash
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
var api = express.Router();
// var expressValidator = require('express-validator');
// api.use(expressValidator());
//const expressValidator = require('express-validator');
//app.use(expressValidator(middlewareOptions));


app.use('/', index);
app.use('/users', users);
app.use('/map', map);
app.use('/homepage', homepage);
app.use('/solution', solution);
app.use('/learn', learn);
app.use('/about', about);
app.use('/support', support);
app.use('/pricing', pricing);
app.use('/login', login);
app.use('/register', register);
app.use('/settings', settings)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
    //res.local.user = req.user || null;
});










module.exports = app;
