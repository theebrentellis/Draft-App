const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const SECRET = "MY_SECRET";
const http = require("http");
const mongodb = require("mongodb");
const webpack = require('webpack');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
let mongoose = require("mongoose");

const app = express();

app.use(express.static(path.join(__dirname, "./client")));
app.use(cookieParser());
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
}));

app.use(passport.initialize());

require("./server/config/mongoose.js");
require("./server/config/passport.js")(passport);
require("./server/config/routes.js")(app, passport);

// app.listen(1234, function(){
//     console.log("Your Mom Goes To College!");
// });

const server = http.createServer(app).listen(1234, function(){
    console.log("Your Mom Goes To College!");
});

// //Chat Socket.io Settings
const io = require("socket.io").listen(server);

// Add your instrumentation key or use the APPLICATIONINSIGHTSKEY environment variable on your production machine to start collecting data.
// var ai = require('applicationinsights');
// ai.setup(process.env.APPLICATIONINSIGHTSKEY || 'your_instrumentation_key').start();

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

// let compiler = webpack({

// });
// compiler.run({

// }, function (err, stats) {
    
// });