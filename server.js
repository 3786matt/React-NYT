var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var app = express();
//set port to 3000 for listner at bottom.
var PORT = process.env.PORT || 3000;

//sets up logger(morgan)
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

//will need to change below line to 
// mongoose.connect("mongodb://localhost:3000/React-NYT");
mongoose.connect("mongodb://localhost/React-NYT");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

var routes = require('./controllers/routes.js');
app.use('/', routes);

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});