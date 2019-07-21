let mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let carSchema = mongoose.Schema({
  ownerId: {
    type: String,
    required: true
  },
  carName: {
    type: String,
    trim: true,
    required: true
  },
  make: {
    type: String,
    trim: true,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  location: {
    address: String,
    lat: Number,
    lng: Number
  }
}, {timestamps: true});

let Car = module.exports = mongoose.model('Car', carSchema);

module.exports.getCarByOwnerId = function(ownerId, callback){
    var query = {ownerId};
    console.log("inside getCarByOwnerId", query);
	Car.findOne(query, callback);
}

// module.exports.getUserById = function(id, callback){
// 	User.findById(id, callback);
// }
