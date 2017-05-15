var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to mongoose database: online mLab database
mongoose.connect('mongodb://objsonresume:ob1jsonresume@ds139761.mlab.com:39761/feedbackform');

//Creating a schema that contains only 1 field as datatype string
var feedSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  feedType: String,
  description: String
})

var genFeedSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  feedType: String,
  genFeed: [{}]
})

//creating a model for todo
var Feedback = mongoose.model("Feedback", feedSchema);

var GenFeedback = mongoose.model("GenFeedback", genFeedSchema);

var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function (app){

	app.post('/feedback', urlencodedParser, function(req, res){

	   	//Get data from the view and pass it to the mongoose schema to store it.
	    var newFeedBack = Feedback(req.body).save(function(err, data){
	       if(err) throw err;
	       res.json(data);
	    });
	});

	app.post('/genfeedback', urlencodedParser, function(req, res){
		console.log(req.body.userFeedback);
	   	//Get data from the view and pass it to the mongoose schema to store it.
	    var newFeedBack = GenFeedback(req.body).save(function(err, data){
	       if(err) throw err;
	       res.json(data);
	    });
	});

	app.get('/getAll', urlencodedParser, function(req, res){
		console.log(req.body.userFeedback);
	   	//Get data from the view and pass it to the mongoose schema to store it.
	    var newFeedBack = Feedback.find(function(err, data){
	       if(err) throw err;
	       res.json(data);
	    });
	});
	
};
