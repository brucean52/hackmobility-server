let mongoose = require('mongoose');

let routeSchema = mongoose.Schema({
  startObj: {
    address: String,
    lat: Number,
    lng: Number
  },
  finishObj: {
    address: String,
    lat: Number,
    lng: Number
  },
  driverId: {
    type: String,
    required: true
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  passengerIds: [{
    type: String
  }]
}, {timestamps: true});

module.exports = mongoose.model('Route', routeSchema);