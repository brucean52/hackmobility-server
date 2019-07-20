const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const middleware = require('./middleware/index');
const cors = require('cors');
const keys = require('./config/keys');

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


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
