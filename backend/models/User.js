const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.statics.signup = async function (name, email, password) {
  const exist = await this.findOne({ email });

  if (exist) {
    throw new Error("User already exists");
  }
  if (!name || !email || !password) {
    throw new Error("Please fill all required fields");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is invalid");
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    })
  ) {
    throw Error("Password not Strong enough");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
  });

  return user;
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
