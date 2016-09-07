var passport = require("passport");
var mongoose = require("mongoose");

var UserController = require("./UserController.js");

module.exports = (function () {
    return{
        authenticatUser: function(req, res){
            UserController.authenticate(req.body.userName, req.body.password).success(function(token){
                if(token){
                    res.send({token: token});
                }
                else{
                    res.status(401).send("Username or password is incorrect");
                }
            })
            .error(function(err){
                res.status(400).send(err);
            });
        },

        registerUser: function(req, res){
            UserController.create(req.body).success(function(){
                res.sendStatus(200);
            })
            .error(function(err){
                res.status(400).send(err);
            });
        },

        getCurrentUser: function(req, res){
            UserController.getById(req.user.sub).success(function(user){
                if(user){
                    res.send(user);
                }
                else{
                    res.sendStatus(404);
                }
            })
            .error(function(err){
                res.status(400).send(err);
            })
        },

        updateUser: function(req, res){
            var userId = req.user.sub;
            if(req.params._id != userId){
                return res.status(401).send("You Can Only Update Your Own Account!");
            }
            UserController.update(userId, req.body).success(function(){
                res.sendStatus(200);
            })
            .error(function(err){
                res.status(400).send(err);
            });
        },

        deleteUser: function(req, res){
            var userId = res.user.sub;

            if(req.params._id !== userId){
                return res.status(401).send("You can only delete your own account!");
            }
            UserController.remove(userId).success(function(){
                res.sendStatus(200);
            })
            .error(function(err){
                res.status(400).send(err);
            });
        }
    };
})();