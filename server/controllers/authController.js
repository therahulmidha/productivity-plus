const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const ONE_DAY = 24 * 60 * 60 * 1000;
function createUserToken(user, expiresIn) {
  return jwt.sign(
    {
      user: {
        email: user.email,
        id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn }
  );
}

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are mandatory." });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already registered." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      token: createUserToken(user, "1y"),
      email: email,
      userId: user._id,
      refreshToken: createUserToken(user, "2y"),
      expiresIn: ONE_DAY,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Registration failed" });
  }
});

// @route POST /api/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are mandatory." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        token: createUserToken(user, "1y"),
        email: email,
        userId: user._id,
        refreshToken: createUserToken(user, "2y"),
        expiresIn: ONE_DAY,
      });
    } else {
      return res.status(401).json({ message: "Email or Password is invalid." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Login failed" });
  }
});

module.exports = { registerUser, loginUser };
