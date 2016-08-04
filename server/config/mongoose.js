var mongoose = require("mongoose");
var fs = require("fs");
var path = require("path");

mongoose.connect("mongodb://localhost/DraftApp");

var models_path = __dirname + "/../models";

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') >= 0){
		require(models_path + '/' + file);
	}
});