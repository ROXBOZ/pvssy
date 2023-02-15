import express from "express";
import { getAllTerms } from "../controller/termController.js";

const router = express.Router();

router.get("/all", getAllTerms);

export default router;
