var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://stijn:klopper@ds155299.mlab.com:55299/pulse')

var db = mongoose.connection;

//user data
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true

  },
  password: {
    type: String

  },
  email: {
    type: String

  },
  township: {
    type: String

  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: String
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
});
}

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.comparePassword = function(canidatePassword, hash, callback){
  bcrypt.compare(canidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.setPassword = function(newPassword, user, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newPassword, salt, function(err, hash) {
            user.password = hash;
            user.save(callback);
        });
    });
}
module.exports.setEmail = function(newEmail, user, callback,) {
    user.email = newEmail;
    user.save(callback);
}
module.exports.setTownship = function(newTownship, user, callback,) {
    user.township = newTownship;
    user.save(callback);
}
module.exports.setUsername = function(newUsername, user, callback,) {
    user.username = newUsername;
    user.save(callback);
}
