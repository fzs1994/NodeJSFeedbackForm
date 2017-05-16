// General Requirements
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

// Setting Home page view
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/app/model/feedbackform.html')
})
