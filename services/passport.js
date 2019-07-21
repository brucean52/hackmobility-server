const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('User');

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=> {
    User.findById(id).then(user => {
            done(null, user);
        });
});

passport.use(new LocalStrategy(
  function(email, password, done) {
	  console.log("inside passport");
    User.getUserByUsername(email, function(err, user){
   	  if(err) throw err;
   	  if(!user){
   		   return done(null, false, {message: 'Unknown User'});
   	  }

     	User.comparePassword(password, user.password, function(err, isMatch){
     		if(err) throw err;
     		if(isMatch){
     			return done(null, user);
     		} else {
     			return done(null, false, {message: 'Invalid password'});
     		}
     	});
   });
  }
));
