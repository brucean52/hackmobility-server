const express = require('express');
const userController = require('../controllers/user');
const carController = require('../controllers/car');
// const middleware = require('../middleware/index');
const passport = require('passport');

let router = express.Router();

router.get('/user/profile', userController.profile);
router.get('/user/logout', userController.logout);
router.get('/user/all', userController.getAllUsers)
router.get('/user/id/:uid', userController.getUserById)



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
router.get('/user/userroutes/:uid', userController.getUserRoutes);
router.post('/user/addroute', userController.addRoute);
router.post('/user/addpassenger', userController.addPassenger);
router.post('/user/removepassenger', userController.removePassenger);
router.post('/user/deleteroute', userController.deleteRoute);


// Car Routes
router.post('/cars', carController.addCar);
router.get('/cars/owner/:ownerId', carController.findCarByOwnerId);
router.get('/cars/smart_car_url', carController.getSmartCarOauthURL);
router.get('/cars/smart_car_cb', carController.handleSmartCarCB);
router.get('/cars/smart_car_token', carController.getAccessToken);
router.get('/cars/smart_car/vihecles', carController.get_sm_vehicles);
module.exports = router;