const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const jwtSecret = process.env.JWT_SECRET;
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("password can not include the string password");
      }
      if (value.length < 4) {
        throw new Error("password must be more then or equal to 8 characters");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
userSchema.statics.findByCredentials = async (email, password) => {
  console.log("email is ", email, "password is ", password);
  const user = await User.findOne({ email });
  console.log("user in find credentials", user);
  if (!user) {
    throw new Error("invalid user email");
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  console.log("ismatch in find credentials", isMatch);
  if (!isMatch) {
    throw new Error("password does not match");
  }
  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  //the secret will come from server enviornment variables
  const token = await jwt.sign({ _id: user._id.toString() }, jwtSecret);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcryptjs.hash(user.password, 8);
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
