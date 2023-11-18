const mongoose = require("mongoose");
const Joi = require('joi');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  heading: {
    type: String,
  },
  text: {
    type: String,
  },
  interval: {
    type: Number,
  },
});

const Notification = mongoose.model("notifications", notificationSchema);

const validateNotification = (req, res, next) => {
  const schema = Joi.object({
    heading: Joi.string().required(),
    text: Joi.string().required(),
    interval: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(403).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { Notification, validateNotification };
