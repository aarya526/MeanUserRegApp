const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "Full Name cant be empty",
  },
  email: {
    type: String,
    required: "Email cant be empty",
    unique: true,
  },
  password: {
    type: String,
    required: "Password cant be empty",
    minLength: [4, "Password must be atleast 4 character long"],
  },
  saltSecret: String,
});
userSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

//Methods
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};
mongoose.model("User", userSchema);
