// General Requirements
var express = require ('express');
var feedbackController = require('./controllers/feedbackController');
var app = express();

var port         = process.env.PORT || 8080;
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({ secret: 'officebeaconofficebeacon' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

//setting template engine
app.set('view engine','ejs');

//setting assets/static files
app.use(express.static('./public'));

//Firing controllers
// feedbackController(app);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

//listen to port
// app.listen(3000);
// console.log("Server started at port number: 3000");

// Setting Home page view
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/app/model/feedbackform.html')
})

app.use(function (req, res) {
    res.render('error');
});
