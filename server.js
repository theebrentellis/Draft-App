const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const SECRET = "MY_SECRET";
const http = require("http");
const webpack = require('webpack');

const app = express();

app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true
}));

app.use(passport.initialize());

const server = http.createServer(app).listen(process.env.PORT || 1234, function(){
    console.log("Your Mom Goes To College!");
});

require("./server/config/mongoose.js");
require("./server/config/passport.js")(passport);
require("./server/config/routes.js")(app, passport);
require("./server/config/sockets.js")(server);


// Add your instrumentation key or use the APPLICATIONINSIGHTSKEY environment variable on your production machine to start collecting data.
// var ai = require('applicationinsights');
// ai.setup(process.env.APPLICATIONINSIGHTSKEY || 'your_instrumentation_key').start();
