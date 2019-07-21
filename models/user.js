let mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let userSchema = mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
    required: true
  },
  last_name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: {
    type: String,
    require: false
  }
}, {timestamps: true});

let User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserByUsername = function(email, callback){
	var query = {email};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}