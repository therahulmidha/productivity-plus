const express = require("express");
const { registerUser, loginUser } = require("../../controllers/authController");
const { validateUser } = require("../../models/user");

const router = express.Router();
router.post("/register", validateUser, registerUser);
router.post("/login", validateUser, loginUser);

module.exports = router;
