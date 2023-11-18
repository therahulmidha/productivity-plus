const {Exercise} = require("../models/exercise");
const Joi = require("joi");

exports.addExercises = async (req, res) => {
  const { name, duration } = req.body;

  try {
    const addedExercises = await Exercise.create({
      user: req.user.id,
      name,
      duration,
      break: req.body.break,
    });
    res.status(201).json({
      id: addedExercises._id,
      name: addedExercises.name,
      duration: addedExercises.duration,
      break: addedExercises.break,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add exercises or same exercise name exist.",
    });
  }
};

exports.updateExercise = async (req, res) => {
  try {
    await Exercise.findByIdAndUpdate(req.params.id, req.body);
    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update exercises",
    });
  }
}

exports.deleteExercise = async (req, res) => {
  const exerciseId = req.params.id;

  try {
    const deletedExercise = await Exercise.findByIdAndDelete(exerciseId);
    if (!deletedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete exercise" });
  }
};

exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({ user: req.user.id });
    res.json(
      exercises.map((ex) => ({
        id: ex._id,
        name: ex.name,
        duration: ex.duration,
        break: ex.break,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve exercises" });
  }
};
