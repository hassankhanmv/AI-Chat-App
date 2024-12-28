const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { login, signup } = require("../controller/user_controller");

// Post Route all users
router.post("/login", login);
router.post("/signup", signup);

router.post("/users", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Create a new user
    const newUser = new User({
      name,
      email,
      age,
    });

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Something went wrong while creating a user",
    });
  }
});

// Get Route all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong while getting all users",
    });
  }
});

// Get Route single user
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const getUser = await User.findById(id);
    if (!getUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User found",
      user: getUser,
      id,
      status: 200,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong while getting a user",
    });
  }
});

// Delete Route single user
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deleteUser });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong while getting a user",
    });
  }
});

// Update Route single user
router.patch("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updateUser });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong while getting a user",
    });
  }
});

module.exports = router;
