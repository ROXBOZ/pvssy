import express from "express";
import { getAllPains, addPain } from "../controller/painController.js";

const router = express.Router();

router.get("/all", getAllPains);
router.post("/all", addPain);

export default router;
