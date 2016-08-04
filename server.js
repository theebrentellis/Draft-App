var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongodb = require("mongodb");
var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./client")));

require("./server/config/mongoose.js");

require("./server/config/routes.js");

app.listen(1234, function(){
    console.log("Your Mom Goes To College!");
});