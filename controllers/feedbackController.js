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

//creating a model for other type of feedback
var Feedback = mongoose.model("Feedback", feedSchema);

//creating a model for General type of feedback
var GenFeedback = mongoose.model("GenFeedback", genFeedSchema);

// Required bodyparser url object
var urlencodedParser = bodyParser.urlencoded({extended:false});

// Exporting objects to server.js
module.exports = function (app){

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

  // Rendering Other Feedbacks data into view table
	app.get('/getAll', urlencodedParser, function(req, res){
	   	//Get all ther Other Feedbacks from MongoDB and return data to view.
	    var commFeedBack = Feedback.find(function(err, data){
	       if(err) throw err;
	       res.render('showAll', {feedbacks: data})
	    });
	});

  // Rendering General Feedbacks data into view table
	app.get('/getGenAll', urlencodedParser, function(req, res){
	   	//Get all the General Feedbacks from MongoDB and return data to view.
	    var commFeedBack = GenFeedback.find(function(err, data){
	       if(err) throw err;
	       res.render('showGenAll', {feedbacks: data})
	    });
	});

  // Rendering General Feedbacks data into view table
	app.get('/login', urlencodedParser, function(req, res){
	   	//Render login view on /login redirect.
	    res.render('login')
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

  //Get particular general feedback from database using email address.
  app.delete('/api/getAll/:id', urlencodedParser, function(req, res){
	  Feedback.remove({ "_id" : req.params.id }, function(err, data) {
      if(err) throw err;
      res.json({ "message": "Successfully Deleted!" });
    });
  });

  //Get particular general feedback from database using email address.
  app.delete('/api/getgenAll/:email', urlencodedParser, function(req, res){
	  GenFeedback.remove({ "email" : req.params.email }, function(err, data) {
      if(err) throw err;
      res.json({ "message": "Successfully Deleted!" });
    });
  });


};
