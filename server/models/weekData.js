const mongoose = require("mongoose");
const Joi = require("joi");

const weekDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  color: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const WeekData = mongoose.model("weekdata", weekDataSchema);

const validateWeekData = (req, res, next) => {
  const schema = Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      text: Joi.string().allow(""),
    })
  );
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(403).json({ error: error.details[0].message });
  }
  next();
};
module.exports = { WeekData, validateWeekData };
