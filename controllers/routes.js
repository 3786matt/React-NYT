var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var Article = require("../models/article.js");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

//finds articles in my db and sorts them.
app.get("/api/saved", function(req, res) {

  Article.find().sort({date: -1})
  .exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// saves nyt articles to my db
app.post("/api/saved", function(req, res) {
  Article.create({
    title: "Sample Data",
    date: Date.now(),
    url: "www.nytimes.com"
  }, 

  function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Search saved to database!");
    }
  });
});

// deletes existing articles in db 
app.delete("/api/saved/:id", function(req, res) {
  Article.findByIdAndRemove(req.params.id, function (err, action) {  
    if (err) {
      console.log(err);
    } 
    else {
      //indicated successful deletion
      res.sendStatus(200);
      console.log('Article deleted from database.')
    }
  })
});

module.exports = app;

