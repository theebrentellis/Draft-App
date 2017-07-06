let mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
let bluebird = require('bluebird');
let MongoClient = require('mongodb').MongoClient;

let options = {
	useMongoClient: true,
	promiseLibrary: bluebird
};

mongoose.connect("mongodb://brentellis:DraftApp4$@ds153785.mlab.com:53785/draftapp", options).then((db) => {
	console.log("Hot Dog!");
});

mongoose.Promise = bluebird;

var models_path = __dirname + "/../models";

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') >= 0){
		require(models_path + '/' + file);
	}
});