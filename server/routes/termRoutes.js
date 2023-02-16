import express from "express";
import { getAllTerms, getTermsByPain } from "../controller/termController.js";

const router = express.Router();

router.get("/all", getAllTerms);
router.get("/byPain", getTermsByPain);

export default router;
