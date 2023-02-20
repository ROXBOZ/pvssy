import express from "express";
import {
  getAllTerms,
  getTermsByPain,
  addTerm,
} from "../controller/termController.js";

const router = express.Router();

router.get("/all", getAllTerms);
router.get("/byPain", getTermsByPain);
router.post("/all", addTerm);

export default router;
