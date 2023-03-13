import express from "express";
import {
  getAllExercises,
  getExercisesByPain,
} from "../controller/exerciseController.js";

const router = express.Router();

router.get("/all", getAllExercises);
router.get("/byPain", getExercisesByPain);

export default router;
