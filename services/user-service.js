(function (undefined) {
  var Promise = require('promise');
  var Models = require('../models');
  var crypto = require('crypto');

  function login(email, password) {
    return Promise.denodeify(Models.UserModel.findOne.bind(Models.UserModel))({ email: email })
    .then(function (user) {
    
      if (!user)
        throw new Error('Invalid email.');  

      if (!password)
        throw new Error('Password required.');

      if (user.password !== hash(user.salt, password))
        throw new Error('Invalid password.');  
      
      return user;
    });
  }

  function create(data) {
    var hashResult = hashPassword(data.password);
    var user = new Models.UserModel({ 
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      password: hashResult.hash, 
      salt: hashResult.salt,
      phone:data.phone
    });

    return Promise.denodeify(user.save.bind(user))()
    .then(function (user) {
      return user;
    });
  }


function update(id, data) {
  return get(id)
    .then(function (user) {
        user.fname = data.fname,
        user.lname =data.lname,
        user.email = data.email,
        user.phone = data.phone,
        user.image = data.image
        return Promise.denodeify(user.save.bind(user))()
    })
    .then(function (user) {
      return user;
    });
} 

  function hashPassword(password) {
    var salt = createSalt();
    var hashResult = hash(salt, password);

    return {
      hash: hashResult,
      salt: salt
    };
  }

  function createSalt(length) {
    length = length ? length : 32;

    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var string = '';
  
    for (var i = 0; i < length; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      string += chars.substring(randomNumber, randomNumber + 1);
    }

    return string;
  }

  function hash(salt, data) {
    return crypto.createHmac('sha256', salt).update(data).digest('base64');
  }
  function get(id) {
    return Promise.denodeify(Models.UserModel.findById.bind(Models.UserModel))(id)
    .then(function (model) {
      return model;
    });
}

  module.exports = {
    login: login,
    create: create,
    update:update,
    get:get
  }
})()