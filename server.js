
// const express = require('express');
// const bodyParser= require('body-parser');
// var mongoose = require('mongoose');
// const app = express();

// //Connect to mongoose database: online mLab database
// mongoose.connect('mongodb://objsonresume:ob1jsonresume@ds139761.mlab.com:39761/feedbackform');

// //Creating a schema that contains only 1 field as datatype string
// var feedSchema = new mongoose.Schema({
//   fullName: String,
//   email: String,
//   feedType: String,
//   description: String
// })

// //creating a model for todo
// var Feedback = mongoose.model("Feedback", feedSchema);

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static('public'));



// app.listen(3000, function() {
//   console.log('listening on 3000')
// })

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/app/model/feedbackform.html')
// })

// app.post('/feedback', (req, res) => {
//   //Get data from the view and pass it to the mongoose schema to store it.
//      var newFeedback = Feedback(req.body).save(function(err, data){
//        if(err) throw err;
//        res.json(data);
//      });

//   //These two lines are commented because now mongoose is used to save the data instead a static data object  //array.
//     //  data.push(req.body);
//     //  req.json(data);
// })

var express = require ('express');
var feedbackController = require('./controllers/feedbackController');
var app = express();

//setting template engine
app.set('view engine','ejs');

//setting assets/static files
app.use(express.static('./public'));

//Firing controllers
feedbackController(app);

//listen to port
app.listen(3000);
console.log("Server started at port number: 3000");

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/app/model/feedbackform.html')
})