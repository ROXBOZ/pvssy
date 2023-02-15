import express from "express";
import { getAllTerms, getTermsByName } from "../controller/termController.js";

const router = express.Router();

router.get("/all", getAllTerms);
router.get("/relatedTerms", getTermsByName);

export default router;
