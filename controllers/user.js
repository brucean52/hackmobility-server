const User = require('../models/user');
const Route = require('../models/route')
const bcrypt = require('bcrypt');

var userController = {};

userController.login = (req, res) => {
  let userInfo = {}
  userInfo.email = req.user.email
  userInfo.first_name = req.user.first_name
  userInfo.last_name = req.user.last_name
  userInfo.id = req.user._id
  userInfo.isAuthenticated = true;

  res.send(userInfo)
}

userController.logout = (req, res) => {
  req.logout();
  res.redirect("/");
}

userController.checkLogin = (req, res) => {
  if (req.user) {
    let userInfo = {}
    userInfo.email = req.user.email
    userInfo.first_name = req.user.first_name
    userInfo.last_name = req.user.last_name
    res.json({ user: userInfo })
  } else {
    res.json({ user: null })
  }
}

userController.profile = (req, res) => {
  res.send({
    isauthenticated: req.isAuthenticated(),
    profile: 'profile'
  });
}

userController.getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    var userMap = {};

    users.forEach(user => {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });
}

userController.register = (req, res) => {
  res.send({
    register: 'register!'
  });
}

userController.addUser = async (req, res) => {
  const password = req.body.password;
  const password_confirm = req.body.password_confirm;

  if (password === password_confirm){
    let newUser = new User();

    newUser.first_name = req.body.first_name;
    newUser.last_name = req.body.last_name;
    newUser.email = req.body.email;
    newUser.password = bcrypt.hashSync(req.body.password, 10);


    newUser.save();
    res.status(201).send({
      status: 201,
      message: "User Created Sucessful"
    })
// =======
//     const savedUser = await newUser.save();
//     res.json(savedUser);
// >>>>>>> master
  } else{
    res.status(500).send("{ errors: \"Passwords don't match\" }").end()
  }
}

userController.editUser = (req, res) => {
  User.update({_id: req.user.id}, {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }, function (err, results) {
    if (err) console.log(err);

    res.json({ success: true })
  });
}

userController.getRoutes = (req, res) => {
  Routes.find({}, (err, routes) => {
    var routeMap = {};

    routes.forEach(route => {
      routeMap[route._id] = route;
    });

    res.send(userMap);
  });
}

userController.addRoute = async (req, res) => {
    let newRoute = new Route();
    const startObj = {
      address: req.body.startAddress,
      lat: req.body.startLat,
      lng: req.body.startLng
    }
    const finishObj = {
      address: req.body.finishAddress,
      lat: req.body.finishLat,
      lng: req.body.finishLng
    }
    newRoute.driverId = req.body.driverId;
    newRoute.startObj = startObj;
    newRoute.finishObj = finishObj;

    const savedRoute = await newRoute.save();
    res.json(savedRoute)
}

userController.updateRoute = async (req, res) => {
  // let newRoute = new Route();
  // const startObj = {
  //   address: req.body.startAddress,
  //   lat: req.body.startLat,
  //   lng: req.body.startLng
  // }
  // const finishObj = {
  //   address: req.body.finishAddress,
  //   lat: req.body.finishLat,
  //   lng: req.body.finishLng
  // }
  // newRoute.driverId = req.body.driverId;
  // newRoute.startObj = startObj;
  // newRoute.finishObj = finishObj;

  // const savedRoute = await newRoute.save();
  // res.json(savedRoute)
}

module.exports = userController;