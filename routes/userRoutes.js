const express = require('express');
const userController = require('../controllers/user');
// const middleware = require('../middleware/index');
const passport = require('passport');

let router = express.Router();

router.get('/user/profile', userController.profile);
router.get('/user/logout', userController.logout);



router.post('/user/new', userController.addUser);
router.post('/user/login', passport.authenticate('local'), userController.login);


router.post('/user/tester',
  function(req, res, next) {
    passport.authenticate('local', function(err, user) {
      if (err) { return next(err) }

      // make passportjs setup the user object, serialize the user, ...
      req.login(user, {}, function(err) {
        if (err) { return next(err) };
        return res.send({success: true});
      });
    })(req, res, next);
    return;
  }
);

router.post('/user/edit', userController.editUser);

// Routes
router.get('/user/routes', userController.getRoutes);
router.get('/user/addroute', userController.addRoute);

module.exports = router;