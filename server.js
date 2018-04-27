// Dependencies
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// Set Handlebars
var exphbs = require("express-handlebars");
//require route file
require("./config/routes")(router);
//set up port
var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//use body parser
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(router);

//mongDB
var db = process.env.MONGODB_URI || "mongodb://localhost/week18";


// Make public a static dir
app.use(express.static("public"));


// Database configuration with mongoose
mongoose.connect(db, function(error){
	if (error){
		console.log(error);
	} else{
		console.log("mongoose connection is successful!");
	}
});


// Listen on port 8080
app.listen(PORT, function() {
  console.log("App running on port" + PORT);
});
