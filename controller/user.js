const User = require('../models/user');
const bcrypt = require('bcrypt');

var userController = {};

userController.login = (req, res) => {
  let userInfo = {}
  userInfo.email = req.user.email
  userInfo.first_name = req.user.first_name
  userInfo.last_name = req.user.last_name


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

userController.addUser = (req, res) => {
  const password = req.body.password;
  const password_confirm = req.body.password_confirm;

  if (password === password_confirm){
    let newUser = new User();

    newUser.first_name = req.body.first_name;
    newUser.last_name = req.body.last_name;
    newUser.email = req.body.email;
    newUser.password = bcrypt.hashSync(req.body.password, 10);

    newUser.save();
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

module.exports = userController;