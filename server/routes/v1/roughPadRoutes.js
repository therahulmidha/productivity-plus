const express = require("express");
const {
  updateOrCreateText,
  getRoughPadText,
} = require("../../controllers/roughPadController");
const validateToken = require("../../middleware/authorize");
const { validateRoughPad } = require("../../models/roughPad");

const router = express.Router();
router.put("/", validateToken, validateRoughPad, updateOrCreateText);
router.get("/", validateToken, getRoughPadText);

module.exports = router;
