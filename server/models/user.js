const mongoose = require("mongoose");
const Joi = require('joi');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(403).json({ error: error.details[0].message });
  }
  next();
};
module.exports = { User, validateUser };
