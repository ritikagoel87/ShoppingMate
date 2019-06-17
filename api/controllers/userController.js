const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.listAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if ( err ) {
      res.send( err );
    }
    res.json(users);
  });
};

exports.createUser = (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

exports.getUser = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

exports.checkLogin = (req, res) => {
  User.find({ email: req.params.email, password: req.params.password }, (err, user) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    // console.log(user);
    res.json(user);
  });
};

exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    {_id: req.params.id}, // id
    req.body, //new values
    (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    }
  );
};

exports.deleteUser = (req, res) => {
  User.deleteOne(
    {_id: req.params.id},
    (err) => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'User successfully deleted',
        _id: req.params.id
      });
    }
  );
};
