var express = require("express");

var path = require("path");
var bodyParser = require("body-parser");
var passport = require("passport");
var SECRET = "MY_SECRET";

var mongodb = require("mongodb");

var app = express();

app.use(bodyParser.json({
    limit: "50mb"
}));

app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
}));

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, "./client")));

require("./server/config/mongoose.js");
require("./server/config/passport.js");
require("./server/config/routes.js")(app);

app.listen(1234, function(){
    console.log("Your Mom Goes To College!");
});