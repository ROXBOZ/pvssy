import express from "express";
import {
  getAllSources,
  getSourcesByPain,
  addSource,
} from "../controller/sourceController.js";

const router = express.Router();

router.get("/all", getAllSources);
router.get("/byPain", getSourcesByPain);
router.post("/all", addSource);
export default router;
