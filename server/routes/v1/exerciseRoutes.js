const express = require("express");
const {
  addExercises,
  updateExercise,
  deleteExercise,
  getExercises,
} = require("../../controllers/exerciseController");
const validateToken = require("../../middleware/authorize");
const router = express.Router();

router.post("/", validateToken, addExercises);
router.put("/:id", validateToken, updateExercise);
router.delete("/:id", validateToken, deleteExercise);
router.get("/", validateToken, getExercises);

module.exports = router;
