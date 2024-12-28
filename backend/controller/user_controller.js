const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const signup = async (req, res) => {
  const { name, age, email, password } = req.body;

  try {
    const user = await User.signup(name, age, email, password);

    const token = createToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong while creating a user",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong while getting a user",
    });
  }
};

module.exports = { signup, login };
