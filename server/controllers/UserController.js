var mongoose = require('mongoose');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var User = mongoose.model('User');

module.exports = (function () {
  return {
    authenticate: function (userName, password) {
      var deferred = Q.defer();

      User.findOne({userName: userName}, function (err, user) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message)
        }
        if (user && bcrypt.compareSync(password, user.hash)) {
          deferred.resolve(jwt.sign({sub: user._id}, SECRET));
        }else {
          deferred.resolve();
        }
      });

      return deferred.promise;
    },

    getById: function (_id) {
      var deferred = Q.defer();

      User.findById(_id, function (err, user) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message)
        }
        if (user) {
          deferred.resolve(_.omit(user, 'hash'))
        }else {
          deferred.resolve();
        }
      });

      return deferred.promise;
    },

    create: function (userParam) {
      var deferred = Q.defer();

      User.findOne({userName: userParam.userName}, function (err, user) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message);
        }
        if (user) {
          deferred.reject("Username '" + userParam.userName + "' is already taken");
        }else {
          createUser();
        }
      });
      function createUser () {
        var user = _.omit(userParam, 'password');

        user.hash = bcrypt.hashSync(userParam.password, 10);

        User.insert(user, function (err, doc) {
          if (err) {
            deferred.reject(err.name + ': ' + err.message);
            deferred.resolve();
          }
        });
      }
      return deferred.promise;
    },

    update: function (_id, userParam) {
      var deferred = Q.defer();

      User.findById(_id, function (err, user) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message);
        }
        if (User.userName != userParam.userName) {
          User.findOne({userName: userParam.userName}, function (err, user) {
            if (err) {
              deferred.reject(err.name + ': ' + err.message);
            }
            if (usr) {
              deferred.reject("Username '" + req.body.userName + "' is already taken!");
            }else {
              updateUser();
            }
          });
        }else {
          updateUser();
        }
      });

      function updateUser () {
        var set = {
          firstName: userParam.firstName,
          userName: userParam.userName
        };

        if (userParam.password) {
          set.hash = bcrypt.hashSync(userParam.password, 10);
        }
        User.update({_id: mongo.helper.toObject(_id)}, {$set: set}, function (err, doc) {
          if (err) {
            deferred.reject(err.name + ': ' + err.message);
            deferred.resolve();
          }
        });
      }
      return deferred.promise;
    },

    remove: function(_id){
        var deferred = Q.defer();

        User.remove({_id: mongo.helper.toObjectId(_id)}, function(err){
            if(err){
                deferred.reject(err.name + ": " + err.message);
                deferred.resolve();
            }
        });
        return deferred.promise;
    }
    // login: function(req, res){

    // },

  // registerNew: function(req, res){
  //     console.log(req.body)
  //     var user = new User({userName: req.body.username, password: req.body.password})
  //     console.log(user)
  //     // user.save(function(err, results){
  //     //     if(err){
  //     //         console.log("Error: "+err)
  //     //     }
  //     //     else{
  //     //         res.json(results)
  //     //     }
  //     // })
  // },
  };
})();
