var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongodb = require("mongodb");
var app = express();

app.use(bodyParser.json({
    limit: "50mb"
}));

// app.use(bodyParser.urlencoded({
//     limit: "50mb"
// }));

app.use(express.static(path.join(__dirname, "./client")));

require("./server/config/mongoose.js");

require("./server/config/routes.js")(app);

app.listen(1234, function(){
    console.log("Your Mom Goes To College!");
});