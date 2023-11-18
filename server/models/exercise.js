const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    unique: true,
  },
  duration: {
    type: String,
  },
  break: {
    type: Number,
  },
});

const Exercise = mongoose.model("exercise", exerciseSchema);

const validateExercise = (req, res, next) => {
  const schema = Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      duration: Joi.string().required(),
      break: Joi.number().integer().required(),
    })
  );
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(403).json({ error: error.details[0].message });
  }
  next();
};
module.exports = { Exercise, validateExercise };
