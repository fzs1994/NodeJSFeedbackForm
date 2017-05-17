// Requirements
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to mongoose database: online mLab database
mongoose.connect('mongodb://objsonresume:ob1jsonresume@ds139761.mlab.com:39761/feedbackform');

//Creating a schema that contains fields of Other types of Feedbacks
var feedSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  feedType: String,
  description: String
})

//Creating a schema that contains fields of General Feedback
var genFeedSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  feedType: String,
  genFeed: Object
})

// Required bodyparser url object
var urlencodedParser = bodyParser.urlencoded({extended:false});

//creating a model for other type of feedback
var Feedback = mongoose.model("Feedback", feedSchema);

//creating a model for General type of feedback
var GenFeedback = mongoose.model("GenFeedback", genFeedSchema);

// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    // app.get('/', function(req, res) {
    //     res.render('model/feedbackform.html'); // load the index.ejs file
    // });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/getAll', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/getAll', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    // app.get('/getAll', isLoggedIn, function(req, res) {
    //     res.render('showAll.ejs', {
    //         user : req.user // get the user out of session and pass to template
    //     });
    // });

    // Saving other feedback in remote MongoDB. Called using AJAX.
  	app.post('/feedback', urlencodedParser, function(req, res){
  	   	//Get data from the view and pass it to the mongoose schema to store it.
  	    var newFeedBack = Feedback(req.body).save(function(err, data){
  	       if(err) throw err;
  	       res.json(data);
  	    });
  	});

    // Saving general feedback in remote MongoDB. Called using AJAX.
  	app.post('/genfeedback', urlencodedParser, function(req, res){
  	   	//Get data from the view and pass it to the mongoose schema to store it.
  	   	var genFeedData = {
  	   		"fullName": req.body.name,
  	   		"email": req.body.email,
  	   		"feedType": req.body.type,
  	   		"genFeed": {
  	   			"recommend": req.body.recommend,
  	   			"satisfied": req.body.satisfied,
  	   			"outcome": req.body.outcome,
  	   			"service": req.body.service,
  	   			"time": req.body.time,
  	   		}
  	   	}
  	    var newFeedBack = GenFeedback(genFeedData).save(function(err, data){
  	       if(err) throw err;
  	       res.json(data);
  	    });
  	});

    // API to get all Other Feedbacks
    app.get('/api/getAll', urlencodedParser, function(req, res){
  	   	//Get all ther Other Feedbacks from MongoDB and return JSON data.
  	    var commFeedBack = Feedback.find(function(err, data){
  	       if(err) throw err;
  	       res.json(data);
  	    });
  	});

    // API to get all General Feedbacks
  	app.get('/api/getGenAll', urlencodedParser, function(req, res){
  	   	//Get all ther General Feedbacks from MongoDB and return JSON data.
  	    var commFeedBack = GenFeedback.find(function(err, data){
  	       if(err) throw err;
  	       res.json(data);
  	    });
  	});

    //Get particular feedback from database using email address.
  	app.get('/api/getAll/:email', urlencodedParser, function(req, res){
  	  Feedback.find({ "email" : req.params.email }, function(err, data) {
        if(err) throw err;
        res.json(data);
      });
    });

    //Get particular general feedback from database using email address.
  	app.get('/api/getgenAll/:email', urlencodedParser, function(req, res){
  	  GenFeedback.find({ "email" : req.params.email }, function(err, data) {
        if(err) throw err;
        res.json(data);
      });
    });

    // Rendering Other Feedbacks data into view table
  	app.get('/getAll', isLoggedIn, function(req, res){
  	   	//Get all ther Other Feedbacks from MongoDB and return data to view.
  	    var commFeedBack = Feedback.find(function(err, data){
  	       if(err) throw err;
  	       res.render('showAll', {feedbacks: data})
  	    });
  	});

    // Rendering General Feedbacks data into view table
  	app.get('/getGenAll', isLoggedIn, function(req, res){
  	   	//Get all the General Feedbacks from MongoDB and return data to view.
  	    var commFeedBack = GenFeedback.find(function(err, data){
  	       if(err) throw err;
  	       res.render('showGenAll', {feedbacks: data})
  	    });
  	});

    //Delete particular other feedback from database using feedback ID usin API call.
    app.delete('/api/getAll/:id', isLoggedIn, function(req, res){
  	  Feedback.remove({ "_id" : req.params.id }, function(err, data) {
        if(err) throw err;
        res.json({ "message": "Successfully Deleted!" });
      });
    });

    //Delete particular general feedback from database using feedback ID usin API call.
    app.delete('/api/getgenAll/:id', isLoggedIn, function(req, res){
  	  GenFeedback.remove({ "_id" : req.params.id }, function(err, data) {
        if(err) throw err;
        res.json({ "message": "Successfully Deleted!" });
      });
    });

    //Delete particular other feedback from database using feedback ID.
    app.delete('/getAll/:id', isLoggedIn, function(req, res){
  	  Feedback.remove({ "_id" : req.params.id }, function(err, data) {
        if(err) throw err;
        res.json({ "message": "Successfully Deleted!" });
      });
    });

    //Delete particular general feedback from database using feedback ID.
    app.delete('/getgenAll/:id', isLoggedIn, function(req, res){
  	  GenFeedback.remove({ "_id" : req.params.id }, function(err, data) {
        if(err) throw err;
        res.json({ "message": "Successfully Deleted!" });
      });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
