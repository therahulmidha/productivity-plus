const mongoose = require("mongoose");
const Joi = require('joi');

const roughPadSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  text: String,
});

const RoughPad = mongoose.model("roughpads", roughPadSchema);

const validateRoughPad = (req, res, next) => {
  const schema = Joi.object({
    text: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(403).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {RoughPad, validateRoughPad};
