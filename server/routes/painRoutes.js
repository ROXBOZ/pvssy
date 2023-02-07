import express from "express";
import { getAllPains } from "../controller/painController.js";

const router = express.Router();

router.get("/all", getAllPains);

export default router;
