var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  //may add a foreign key later if we decide to build a users_links join table...
  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      bcrypt.genSalt(10, function(err, salt) {
        //the bcrypt.hash method takes in a password, salts it, and then uses a callback function to ultimately update
        //the database with the new salted password
        bcrypt.hash(model.get('password'), salt, function(err, hash) {
          // Store hash in your password DB. 
          model.set('password', hash);
        });
      }); 
    });
  }
});

module.exports = User;