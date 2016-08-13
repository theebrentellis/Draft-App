var mongoose = require("mongoose");
var fs = require("fs");
var path = require("path");

mongoose.connect("mongodb://brentellis:DraftApp1!@ds153785.mlab.com:53785/draftapp");

var models_path = __dirname + "/../models";

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') >= 0){
		require(models_path + '/' + file);
	}
});