var mongoose = require("mongoose");

var Chat = mongoose.model("Chat");

var io = require("socket.io");

module.exports = (function(){
    return {
        postMessage: function(req, res){
            var chat = new Chat();
            chat.message = req.body.message;
            chat.userName = req.body.userName;

            chat.save(function(err, results){
                if(err){
                    return res.json({
                        message: "Error Saving to Database"
                    });
                }
                else{
                    res.json(results);
                }
                
                
            });
        },

        getAllMessages: function(req, res){
            console.log("Get All Messages");

            Chat.find(function(err, results){
                if(err){
                    return res.json({
                        message: "Error Getting All Messages"
                    });
                }
                else{
                    return res.json(results);
                }
            });
        },

        deleteAllChat: function(req, res){
            Chat.remove({}, function(err, results){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(results);
                }
            });
        },
    };
})();