var express = require("express");
var app = express();
var path = require("path");
var session = require("express-session");
var bodyParser = require("body-parser");
var expressJwt = require("express-jwt");

var mongodb = require("mongodb");

app.use(bodyParser.json({
    limit: "50mb"
}));

app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
}));

app.use(express.static(path.join(__dirname, "./client")));

app.use("/api", expressJwt({secret: SECRET}).unless({path:["/api/users/authenticate", "/api/users/register"]}));

require("./server/config/mongoose.js");

require("./server/config/routes.js")(app);

app.listen(1234, function(){
    console.log("Your Mom Goes To College!");
});