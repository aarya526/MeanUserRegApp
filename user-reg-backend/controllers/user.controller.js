const mongoose = require("mongoose");
const passport = require("passport");
const User = mongoose.model("User");
const _ = require("lodash");
module.exports.register = (req, res, next) => {
  var user = new User();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((err, docs) => {
    if (!err) {
      console.log(docs);
      res.send(docs);
    } else {
      var valErrors = [];
      if (err.name == "ValidationError") {
        Object.keys(err.errors).forEach((key) =>
          valErrors.push(err.errors[key].message)
        );
        res.status(422).send(valErrors);
      } else if (err.code == 11000) {
        valErrors.push("Duplicate Email Address");
        res.status(422).send(valErrors);
      }
    }
  });
};

module.exports.authenticate = (req, res, next) => {
  //call for passport authentication

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(400).json(err);
    } else if (user) {
      return res.status(200).json({ token: user.generateJwt() });
    } else {
      return res.status(404).json(info);
    }
  })(req, res);
};
module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User Record Not Found!" });
    } else {
      return res
        .status(200)
        .json({ status: true, user: _.pick(user, ["fullName", "email"]) });
    }
  });
};
