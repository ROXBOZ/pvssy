import express from "express";
import {
  addExercise,
  getAllExercises,
  getExercisesByPain,
} from "../controller/exerciseController.js";

const router = express.Router();

router.get("/all", getAllExercises);
router.get("/byPain", getExercisesByPain);
router.post("/all", addExercise);

export default router;
