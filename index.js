const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const middleware = require('./middleware/index');
const smartcar = require('smartcar');
const cors = require('cors');
const keys = require('./config/keys');
const routes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Init MongoDB connection
mongoose.connect(keys.mongoURI);
let db = mongoose.connection;

// check db connection
db.once('open', () => {
  console.log("MongoDB Connection: Successful");
});

// check for db connection errors
db.on('error', (err) => {
  console.log("MongoDB Connection: " + err);
});

require("./models/user");
require('./services/passport');

app.use(session({
  secret: 'needToSetAProperSecret',
  resave: false,
  saveUninitialized: false,
  maxAge: (3600000 * 24 * 30)
}));
app.use(passport.initialize());
app.use(passport.session());


// const client = new smartcar.AuthClient({
//   clientId: keys.smartcarClientId,
//   clientSecret: keys.smartcarClientSecret,
//   redirectUri: keys.redirectURI,
//   scope: ['read_vehicle_info'],
//   testMode: true, // launch Smartcar Connect in test mode
// });

// // Redirect to Smartcar Connect
// app.get('/login', function(req, res) {
//   const link = client.getAuthUrl();

//   // redirect to the link
//   res.redirect(link);
// });

// app.get('/exchange', function(req, res) {
//   const code = req.query.code;
//   console.log('code', code);
//   return client.exchangeCode(code)
//     .then(function(_access) {
//       // in a production app you'll want to store this in some kind of persistent storage
//       access = _access;

//       res.sendStatus(200);
//     });
// });


// // Handle Smartcar callback with auth code
// app.get('/callback', function(req, res, next) {
//   let access;

//   if (req.query.error) {
//     // the user denied your requested permissions
//     return next(new Error(req.query.error));
//   }

//   // exchange auth code for access token
//   return client
//     .exchangeCode(req.query.code)
//     .then(function(_access) {
//       // in a production app you'll want to store this in some kind of persistent storage
//       access = _access;
//       // get the user's vehicles
//       return smartcar.getVehicleIds(access.accessToken);
//     })
//     .then(function(res) {
//       // instantiate first vehicle in vehicle list
//       const vehicle = new smartcar.Vehicle(res.vehicles[0], access.accessToken);
//       // get identifying information about a vehicle
//       return vehicle.info();
//     })
//     .then(function(data) {
//       console.log(data);
//       // {
//       //   "id": "36ab27d0-fd9d-4455-823a-ce30af709ffc",
//       //   "make": "TESLA",
//       //   "model": "Model S",
//       //   "year": 2014
//       // }

//       // json response will be sent to the user
//       res.json(data);
//     });
// });



app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
