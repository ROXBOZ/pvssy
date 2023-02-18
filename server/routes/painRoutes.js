import express from "express";
import {
  getAllPains,
  addPain,
  getOnePain,
} from "../controller/painController.js";

const router = express.Router();

router.get("/all", getAllPains);
router.get("/spec/:name", getOnePain);
router.post("/all", addPain);

export default router;
