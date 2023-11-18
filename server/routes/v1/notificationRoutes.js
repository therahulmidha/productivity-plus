const express = require("express");
const {
  updateOrCreateNotification,
  getNotification,
} = require("../../controllers/notificationController");
const validateToken = require("../../middleware/authorize");
const { validateNotification } = require("../../models/notification");

const router = express.Router();

router.put(
  "/",
  validateToken,
  validateNotification,
  updateOrCreateNotification
);

router.get("/", validateToken, getNotification);

module.exports = router;
