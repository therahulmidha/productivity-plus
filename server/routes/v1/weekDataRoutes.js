const express = require("express");
const router = express.Router();
const weekDataController = require("../../controllers/weekDataController");
const validateToken = require("../../middleware/authorize");
const { validateWeekData } = require("../../models/weekData");

router.get("/", validateToken, weekDataController.getWeekData);
router.put(
  "/",
  validateToken,
  validateWeekData,
  weekDataController.updateWeekData
);

module.exports = router;
