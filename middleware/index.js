function isLoggedIn(req, res, next) {
  if (req.user){
      req.login = true;
      
  } else {
      req.login = false;
  }
  return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  //res.redirect('/');
}

module.exports.isLoggedIn = isLoggedIn;