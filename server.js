var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var passport = require("passport");
var SECRET = "MY_SECRET";
var http = require("http");
var mongodb = require("mongodb");

var mongoose = require("mongoose");

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

// app.listen(1234, function(){
//     console.log("Your Mom Goes To College!");
// });

var server = http.createServer(app).listen(1234, function(){
    console.log("Your Mom Goes To College!");
});

// //Chat Socket.io Settings
var io = require("socket.io").listen(server);

var Chat = mongoose.model("Chat");

io.on("connection", function(socket){
    console.log("I Love Lamp!");

    Chat.find(function(err, allMessages){
        if(err){
            return console.log(err);
        }
        else{
            io.emit("pastMessages", allMessages);
        }
    });

    socket.on("receiveMessage", function(data){
        io.emit("receiveMessage", data);
    });

});