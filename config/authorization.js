
var Services 	= require('../services');
var expressJwt 	= require('express-jwt');
var jwt 		= require('jsonwebtoken');
var secret 		= 'ecommerce app';


module.exports.requiresLogin = expressJwt({secret:secret});


exports.todo = {
    userIsAuthorizedById: function(req, res, next) {
      Services.Todo.get(req.params.id)
      .then(function (todo) {
        if (todo.user != req.user._id) {
          return res.send(403, 'Not authorized to access this Todo.');
        }
      });

      next();
    },
    userIsAuthorizedByTodo: function(req, res, next) {
      if (req.body.user != req.user._id) {
        return res.send(403, 'Not authorized to for this User.');
      }
      
      next();
    }
};  